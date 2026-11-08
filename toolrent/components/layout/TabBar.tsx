"use client";

import Link from "next/link";

import { ClipboardList, House, LayoutGrid, User } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Головна", icon: House },
  { href: "/catalog", label: "Каталог", icon: LayoutGrid },
  { href: "/bookings", label: "Оренди", icon: ClipboardList },
  { href: "/profile", label: "Профіль", icon: User },
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <nav>
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-xs font-medium transition-colors ${
              isActive ? "bg-brand/15 text-brand" : "text-ink/60"
            }`}
          >
            <Icon size={22} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
