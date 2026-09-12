import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { articles, news, type Story } from "@/lib/data/stories";

type Slide = Story & { kind: "Berita" | "Artikel" };

const slides: Slide[] = [
  ...news.map((s) => ({ ...s, kind: "Berita" as const })),
  ...articles.map((s) => ({ ...s, kind: "Artikel" as const })),
];

export function StorySlider() {
  const scroller = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  function cardWidth() {
    const el = scroller.current;
    if (!el) return 320;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    if (!card) return 320;
    return card.getBoundingClientRect().width + 16;
  }

  function go(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const one = cardWidth();
    const visible = Math.max(1, Math.round(el.clientWidth / one));
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    let next = el.scrollLeft + dir * one * visible;
    if (next > max - 8) next = 0;
    if (next < 0) next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }

  useEffect(() => {
    const t = window.setInterval(() => {
      if (!hover.current) go(1);
    }, 5000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="relative z-0 w-full border-b border-line bg-paper py-16">
      <div className="flex w-full items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Bacaan terbaru</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Artikel & kabar laboratorium</h2>
          <p className="mt-2 text-sm text-muted">Empat sampai lima kartu per layar — geser untuk naskah berikutnya.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface"
            aria-label="Berikutnya"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        onMouseEnter={() => {
          hover.current = true;
        }}
        onMouseLeave={() => {
          hover.current = false;
        }}
        className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 scrollbar-none sm:px-6 lg:px-8"
      >
        {slides.map((s) => {
          const photo = s.images?.[0] ?? "/arsip/cover-usg.jpg";
          const inner = (
            <>
              <img src={photo} alt="" className="h-48 w-full shrink-0 object-cover" />
              <div className="flex min-w-0 flex-1 flex-col p-5">
                <p className="text-xs uppercase tracking-widest text-red">
                  {s.kind} · {s.date}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug">{s.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{s.summary}</p>
                <span className="mt-4 text-sm font-semibold text-blue">Baca selengkapnya</span>
              </div>
            </>
          );
          const cls =
            "story-card flex snap-start flex-col overflow-hidden rounded-xl border border-line bg-surface";
          return s.kind === "Berita" ? (
            <Link key={s.slug} to="/berita/$slug" params={{ slug: s.slug }} className={cls} data-slide>
              {inner}
            </Link>
          ) : (
            <Link key={s.slug} to="/artikel/$slug" params={{ slug: s.slug }} className={cls} data-slide>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
