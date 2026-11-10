import {
  Calendar,
  Drill,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import SearchBar from "../tools/SearchBar";
import PriceCalc from "../tools/PriceCalc";
import { tools } from "@/lib/mock-data";

const trust = [
  { icon: ShieldCheck, label: "Застава повертається" },
  { icon: Calendar, label: "Від 1 доби" },
  { icon: MapPin, label: "3 пункти видачі" },
];

export default function Hero() {
  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
      <div className="flex flex-1 flex-col gap-5 md:gap-6">
        <span className="glass flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-ink">
          <Sparkles size={16} className="text-brand" />
          Прокат садових і будівельних інструментів
        </span>
        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-ink md:text-[56px] md:leading-[1.07]">
          Потрібний інструмент — без покупки
        </h1>
        <p className="max-w-130 text-ink/60">
          Бронюй перфоратори, газонокосарки та бетонозмішувачі на потрібні дати.
          Вартість зі знижкою й заставу рахуємо одразу — забираєш у найближчому
          пункті.
        </p>
        <SearchBar />
        <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 text-sm font-medium text-ink/60"
            >
              <Icon size={18} className="text-green" />
              {label}
            </li>
          ))}
        </ul>
        <div className="relative hidden h-[380px] shrink-0 overflow-hidden rounded-[40px] bg-gradient-to-br from-orange-300 to-orange-600 md:block lg:h-[520px] lg:w-[500px]">
          <div className="absolute -right-24 -top-28 size-90 rounded-full bg-white/30 blur-[60px]" />
          <Drill
            size={220}
            strokeWidth={1.2}
            className="absolute right-14 top-14 text-white"
          />

          <span className="glass absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-white/60 px-3.5 py-2 text-sm font-medium text-ink">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            4.9 · 32 відгуки
          </span>

          <PriceCalc
            tool={tools[0]}
            days={3}
            datesLabel="12 – 15 листопада"
            className="absolute bottom-6 left-6 w-[320px]"
          />
        </div>
      </div>
    </section>
  );
}
