"use server";

import { updateTag } from "next/cache";
import type { ZodIssue } from "zod";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation/booking";
import { calcPrice, daysBetween } from "@/lib/pricing";
import { todayIso, isoToDbDate } from "@/lib/dates";
import { ACTIVE_STATUSES } from "@/lib/constants";
import type { BookingField, BookingFormState } from "@/types";

class BookingError extends Error {}

function toFieldErrors(issues: ZodIssue[]) {
  const errors: Partial<Record<BookingField, string>> = {};
  for (const issue of issues) {
    const field = issue.path[0] as BookingField;
    errors[field] ??= issue.message;
  }
  return errors;
}

export async function createBooking(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  // 1. Перевірка даних
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Перевір поля форми",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }

  const { toolId, dateFrom, dateTo, customerName, customerPhone } = parsed.data;

  if (dateFrom < todayIso()) {
    return {
      status: "error",
      message: "Перевір поля форми",
      fieldErrors: { dateFrom: "Не можна бронювати минулі дати" },
    };
  }

  const from = isoToDbDate(dateFrom);
  const to = isoToDbDate(dateTo);
  const days = daysBetween(from, to);

  try {
    // 2–4. Пошук вільної одиниці та запис — одна транзакція
    const booking = await prisma.$transaction(
      async (tx) => {
        const tool = await tx.tool.findUnique({ where: { id: toolId } });
        if (!tool) throw new BookingError("Інструмент не знайдено");

        const unit = await tx.toolUnit.findFirst({
          where: {
            toolId,
            bookings: {
              none: {
                status: { in: [...ACTIVE_STATUSES] },
                dateFrom: { lt: to },
                dateTo: { gt: from },
              },
            },
          },
        });
        if (!unit) throw new BookingError("На ці дати всі одиниці вже зайняті");

        const price = calcPrice(tool.dailyRate, tool.marketValue, days);

        return tx.booking.create({
          data: {
            unitId: unit.id,
            customerName,
            customerPhone,
            dateFrom: from,
            dateTo: to,
            days,
            total: price.total,
            deposit: price.deposit,
          },
        });
      },
      { isolationLevel: "Serializable" },
    );

    // 5. Скидаємо кеш — доступність оновиться
    updateTag("tools");

    return {
      status: "success",
      bookingId: booking.id,
      total: booking.total,
      deposit: booking.deposit,
    };
  } catch (error) {
    if (error instanceof BookingError) {
      return { status: "error", message: error.message };
    }
    console.error(error);
    return {
      status: "error",
      message: "Не вдалося створити бронювання. Спробуй ще раз.",
    };
  }
}
