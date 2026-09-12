import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem("biomed-hide-install") === "1") return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setHidden(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios|android/i.test(navigator.userAgent);
    if (isIos && isSafari) setHidden(false);

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (hidden) return null;

  async function install() {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setHidden(true);
      setDeferred(null);
      return;
    }
    window.location.href = "/?install=1";
  }

  function dismiss() {
    localStorage.setItem("biomed-hide-install", "1");
    setHidden(true);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <Download className="size-5 shrink-0 text-red" />
        <p className="min-w-0 flex-1 text-sm text-ink">
          Pasang BIOMED di HP — reservasi dari layar utama, tanpa buka browser.
        </p>
        <button
          type="button"
          onClick={install}
          className="h-10 shrink-0 rounded-full bg-red px-4 text-sm font-semibold text-chalk"
        >
          Pasang
        </button>
        <button type="button" onClick={dismiss} className="grid size-10 place-items-center" aria-label="Tutup">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
