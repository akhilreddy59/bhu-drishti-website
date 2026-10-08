import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return <><RevealObserver /><section className="page-hero"><div className="container"><span className="eyebrow">VEYRONIX</span><h1>A team working on safer ground monitoring.</h1><p>BHU-DRISHTI is a Veyronix project exploring a sensor-based mine subsidence monitoring prototype.</p></div></section><section className="page-body"><div className="container"><div className="team-placeholder" data-reveal><div className="team-monogram" aria-hidden="true">V</div><div><span className="eyebrow">PROJECT TEAM</span><h2>Veyronix</h2><p>TODO: add approved team-member names, roles, and biographies.</p></div></div><p className="todo-note" data-reveal>Team member information and photographs have not been supplied for publication.</p></div></section></>;
}
