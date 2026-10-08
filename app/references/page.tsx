import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal";

export const metadata: Metadata = { title: "References" };

export default function ReferencesPage() {
  return <><RevealObserver /><section className="page-hero"><div className="container"><span className="eyebrow">PROJECT SOURCES</span><h1>References behind the prototype.</h1><p>Technical claims and project material should link to their source so readers can review the underlying work.</p></div></section><section className="page-body"><div className="container"><article className="info-card references-placeholder" data-reveal><span className="eyebrow">CITATIONS</span><h2>Reference list pending.</h2><p>TODO: add the approved citations from the project presentation’s reference slide. No references were included in the available source material.</p></article></div></section></>;
}
