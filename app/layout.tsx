import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BHU-DRISHTI | Mine Subsidence Monitoring",
    template: "%s | BHU-DRISHTI",
  },
  description: "A prototype mine subsidence monitoring system using sensor nodes, a local gateway, and a cloud dashboard.",
  applicationName: "BHU-DRISHTI",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
