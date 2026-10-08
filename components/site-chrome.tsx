import Image from "next/image";
import Link from "next/link";

const links = [
  ["How it works", "/how-it-works"],
  ["Demo", "/demo"],
  ["Team", "/team"],
  ["References", "/references"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="BHU-DRISHTI home">
          <span className="brand-mark"><Image src="/brand-logo.png" width={112} height={39} alt="" priority /></span>
          <span><strong>BHU-DRISHTI</strong><small>Mine monitoring prototype</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="button button-small" href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link className="footer-brand" href="/">BHU-DRISHTI</Link>
        <p>Mine subsidence monitoring prototype · Informational website</p>
        <nav aria-label="Footer navigation">
          <Link href="/references">References</Link><Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
