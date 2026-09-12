export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-red">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-muted">{lede}</p>
    </header>
  );
}
