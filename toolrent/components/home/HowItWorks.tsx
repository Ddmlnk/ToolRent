const steps = [
  {
    title: "Обери інструмент",
    text: "Каталог з фото, тарифом і календарем вільних дат для кожної одиниці.",
  },
  {
    title: "Вкажи дати",
    text: "Вартість зі знижкою (−5% від 3 діб, −10% від 7) і заставу рахуємо одразу.",
  },
  {
    title: "Забери й поверни",
    text: "Отримай інструмент у пункті прокату, після повернення застава повертається.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-ink md:text-3xl">
        Як це працює
      </h2>
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {steps.map((step, i) => {
          const isAccent = i === 1;
          return (
            <div
              key={step.title}
              className="glass flex gap-3.5 rounded-[20px] p-4 md:flex-col md:gap-2.5 md:rounded-[28px] md:p-6"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full font-medium md:size-10 ${
                  isAccent ? "bg-brand text-white" : "bg-white/60 text-ink"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5 md:gap-2">
                <h3 className="font-medium text-ink md:text-xl md:font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/60">{step.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
