import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Send, X } from "lucide-react";
import { waLink } from "@/lib/data/branches";
import { greeting, replyTo, type BotMsg } from "@/lib/cs/replies";

function MicroscopeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g className="origin-[32px_40px] animate-scope">
        <rect x="28" y="8" width="8" height="18" rx="2" fill="currentColor" />
        <circle cx="32" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="3" className="animate-lens" />
        <circle cx="32" cy="8" r="2.5" fill="currentColor" opacity="0.4" />
      </g>
      <path d="M22 36c0-6 4.5-10 10-10s10 4 10 10v2H22v-2z" fill="currentColor" />
      <rect x="18" y="38" width="28" height="6" rx="2" fill="currentColor" />
      <path d="M20 44h24l4 12H16l4-12z" fill="currentColor" />
      <rect x="12" y="54" width="40" height="5" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function CsChat() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(true);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<BotMsg[]>([greeting()]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 6000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function pushUser(text: string) {
    const t = text.trim();
    if (!t) return;
    const bot = replyTo(t);
    setMsgs((m) => [...m, { from: "user", text: t }, bot]);
    setInput("");
    if (bot.wa) {
      window.setTimeout(() => {
        window.open(waLink("Halo BIOMED, saya butuh bantuan customer service."), "_blank", "noopener");
      }, 400);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    pushUser(input);
  }

  return (
    <div className="pointer-events-none fixed bottom-16 right-3 z-40 flex flex-col items-end gap-3 sm:bottom-20 sm:right-5">
      {open ? (
        <section className="pointer-events-auto flex h-[min(32rem,70dvh)] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
          <header className="flex items-center gap-3 bg-blue-deep px-4 py-3 text-chalk">
            <span className="grid size-10 place-items-center rounded-full bg-red text-chalk">
              <MicroscopeMark className="size-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-tight">CS BIOMED</p>
              <p className="text-xs text-chalk">Asisten laboratorium · daring</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-full hover:bg-chalk/10"
              aria-label="Tutup chat"
            >
              <X className="size-5" />
            </button>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-paper p-4">
            {msgs.map((m, i) => (
              <div key={`${i}-${m.from}`} className={m.from === "user" ? "flex justify-end" : "block"}>
                <div
                  className={
                    m.from === "user"
                      ? "ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-red px-3 py-2 text-sm text-chalk"
                      : "max-w-[85%] rounded-xl rounded-bl-sm border border-line bg-surface px-3 py-2 text-sm whitespace-pre-line text-ink"
                  }
                >
                  {m.text}
                </div>
                {m.link ? (
                  m.link.kind === "artikel" && m.link.slug ? (
                    <Link
                      to="/artikel/$slug"
                      params={{ slug: m.link.slug }}
                      className="mt-1 inline-block text-xs font-semibold text-blue"
                    >
                      {m.link.label}
                    </Link>
                  ) : m.link.kind === "berita" && m.link.slug ? (
                    <Link
                      to="/berita/$slug"
                      params={{ slug: m.link.slug }}
                      className="mt-1 inline-block text-xs font-semibold text-blue"
                    >
                      {m.link.label}
                    </Link>
                  ) : m.link.kind === "harga" ? (
                    <Link to="/harga" className="mt-1 inline-block text-xs font-semibold text-blue">
                      {m.link.label}
                    </Link>
                  ) : (
                    <Link to="/reservasi" className="mt-1 inline-block text-xs font-semibold text-blue">
                      {m.link.label}
                    </Link>
                  )
                ) : null}
              </div>
            ))}
            {msgs[msgs.length - 1]?.chips ? (
              <div className="flex flex-wrap gap-2">
                {msgs[msgs.length - 1].chips!.map((c) =>
                  c === "Fasilitas" ? (
                    <Link
                      key={c}
                      to="/fasilitas"
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
                    >
                      {c}
                    </Link>
                  ) : (
                    <button
                      key={c}
                      type="button"
                      onClick={() => pushUser(c)}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
                    >
                      {c}
                    </button>
                  ),
                )}
              </div>
            ) : null}
            <div ref={end} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line bg-surface p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan…"
              className="h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-sm"
            />
            <button
              type="submit"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-red text-chalk"
              aria-label="Kirim"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      ) : null}

      <div className="pointer-events-auto flex items-end gap-2">
        {!open && hint ? (
          <p className="mb-2 max-w-40 rounded-xl rounded-br-sm border border-line bg-surface px-3 py-2 text-xs text-ink shadow-sm">
            Tanya CS BIOMED
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setHint(false);
          }}
          className="relative grid size-16 place-items-center rounded-full bg-red text-chalk shadow-lg"
          aria-label={open ? "Tutup customer service" : "Buka customer service"}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-red opacity-20" />
          <MicroscopeMark className="relative size-9 animate-bob" />
        </button>
      </div>
    </div>
  );
}
