import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme";
import { nav } from "@/lib/data/company";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const primary = nav.filter((l) =>
    ["/", "/layanan", "/checkup", "/harga", "/cabang"].includes(l.to),
  );
  const more = nav.filter((l) => !primary.includes(l));

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Beranda BIOMED" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {primary.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium ${pathname === l.to ? "text-red" : "text-muted hover:text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
          <details className="relative">
            <summary className="cursor-pointer list-none text-sm font-medium text-muted hover:text-ink">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-line bg-surface p-2 shadow-md">
              {more.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex min-h-10 items-center rounded-md px-3 text-sm text-ink hover:bg-paper"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
          <ThemeToggle />
          <Link
            to="/reservasi"
            className="inline-flex h-10 items-center rounded-full bg-red px-4 text-sm font-semibold text-chalk"
          >
            Reservasi
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-surface px-4 py-4 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Menu</p>
          <div className="mt-2 flex flex-col">
            {nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex min-h-11 items-center border-b border-line/70 text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/reservasi"
              className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-red text-sm font-semibold text-chalk"
              onClick={() => setOpen(false)}
            >
              Reservasi dari HP
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
