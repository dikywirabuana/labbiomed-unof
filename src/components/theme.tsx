import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "siang" | "malam";

const KEY = "biomed-theme";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "siang",
  toggle: () => {},
});

export const themeBootScript = `(function(){try{if(localStorage.getItem("${KEY}")==="malam")document.documentElement.setAttribute("data-theme","malam")}catch(e){}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("siang");

  useEffect(() => {
    const next = localStorage.getItem(KEY) === "malam" ? "malam" : "siang";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  function toggle() {
    const next: Theme = theme === "malam" ? "siang" : "malam";
    setTheme(next);
    localStorage.setItem(KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const malam = theme === "malam";
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-11 place-items-center rounded-full border border-line text-ink"
      aria-label={malam ? "Mode siang" : "Mode malam"}
      title={malam ? "Mode siang" : "Mode malam"}
    >
      {malam ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
