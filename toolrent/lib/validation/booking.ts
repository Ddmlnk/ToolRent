import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Обери дату");

export const bookingSchema = z
  .object({
    toolId: z.string().min(1),
    dateFrom: isoDate,
    dateTo: isoDate,
    customerName: z.string().trim().min(2, "Вкажи ім'я"),
    customerPhone: z
      .string()
      .transform((value) => value.replace(/[\s()-]/g, ""))
      .pipe(
        z
          .string()
          .regex(/^\+?380\d{9}$/, "Телефон у форматі +380 XX XXX XX XX"),
      ),
  })
  .refine((data) => data.dateTo > data.dateFrom, {
    message: "Дата повернення має бути пізніше за дату початку",
    path: ["dateTo"],
  });
