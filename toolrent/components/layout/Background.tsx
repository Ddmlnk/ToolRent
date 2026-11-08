export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div className="absolute left-[-10%] top-[-10%] size-[55vw] rounded-full bg-orange-400/60 blur-[160px]" />
      <div className="absolute right-[-10%] top-[20%] size-[50vw] rounded-full bg-teal-400/50 blur-[160px]" />
      <div className="absolute bottom-[-15%] left-[10%] size-[45vw] rounded-full bg-amber-300/50 blur-[160px]" />
    </div>
  );
}
