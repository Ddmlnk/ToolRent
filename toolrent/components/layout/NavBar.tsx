"use client";

import { Bell, Link, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/how-it-works", label: "Як це працює" },
  { href: "/bookings", label: "Мої бронювання" },
  { href: "/reviews", label: "Відгуки" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className=" glass sticky top-4 z-50 mx-auto flex max-w-300 items-center justify-between rounded-full p-2 pl-3">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
          <Wrench size={20} />
        </span>
        <span className="text-xl font-semibold tracking-tight text-ink">
          ToolRent
        </span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/60 text-ink"
                  : "text-ink/60 hover:bg-white/40 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-2">
        <button
          aria-label="Сповіщення"
          className="flex size-11 items-center justify-center rounded-full bg-white/60 text-ink transition-colors hover:bg-white/80"
        >
          <Bell size={20} />
        </button>
        <Link
          href="/login"
          className="rounded-full bg-brand px-5 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgb(255_107_26/0.35)] transition hover:brightness-105"
        >
          Увійти
        </Link>
      </div>
    </header>
  );
}
