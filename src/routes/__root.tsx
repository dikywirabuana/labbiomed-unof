import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InstallPrompt } from "@/components/install-prompt";
import { CsChat } from "@/components/cs-chat";
import { FrontOffice } from "@/components/front-office";
import { ThemeProvider, themeBootScript } from "@/components/theme";
import { company } from "@/lib/data/company";
import appCss from "../styles.css?url";

const APP_NAME = `${company.brand}`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "PT. Biomed Husada — Laboratorium BIOMED. Lab klinik Banten sejak 1991. Reservasi MCU, USG, rontgen, EKG dari HP. PWA.",
      },
      { name: "theme-color", content: "#4e6270" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "BIOMED" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="id" className="antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-paper font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeProvider>
            <SiteHeader />
            <Outlet />
            <SiteFooter />
            <InstallPrompt />
            <CsChat />
            <FrontOffice />
          </ThemeProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
