import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal";

export const metadata: Metadata = { title: "Demo" };

export default function DemoPage() {
  return <><RevealObserver /><section className="page-hero"><div className="container"><span className="eyebrow">PROJECT DEMONSTRATION</span><h1>A prototype flow, shown honestly.</h1><p>The demo will explain the path from sensor readings through the gateway to the internal dashboard.</p></div></section><section className="page-body"><div className="container demo-page-grid"><div className="demo-placeholder demo-page-placeholder" role="img" aria-label="Placeholder for approved prototype demo media"><span className="play-mark" aria-hidden="true">▶</span><span className="placeholder-label">MEDIA TO BE ADDED</span><strong>Prototype video or photo</strong><small>TODO: add an approved asset or YouTube link from the project team.</small></div><div className="info-card demo-page-copy"><span className="eyebrow">WHAT THE DEMO COVERS</span><h2>Sensor → Gateway → Dashboard</h2><p>The current software demo can use clearly labelled mock readings. These values are illustrative and do not represent real mine measurements.</p><p>No public per-node readings, named locations, or operational risk states are displayed on this site.</p><p className="todo-note">TODO: add the final demo video, attribution, and QR code after they are supplied and approved.</p></div></div></section></>;
}
