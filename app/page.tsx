import Image from "next/image";
import Link from "next/link";
import { Architecture } from "@/components/architecture";
import { CountUp } from "@/components/count-up";
import { RevealObserver } from "@/components/reveal";
import { fetchPublicStats } from "@/lib/fetch-public-stats";

export default async function HomePage() {
  const stats = await fetchPublicStats();
  return (
    <>
      <RevealObserver />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> A mine subsidence monitoring prototype</span>
            <h1>See ground movement sooner.<br /><em>Respond with context.</em></h1>
            <p>BHU-DRISHTI brings sensor readings, local alerts, and an internal monitoring dashboard into one prototype system for mine subsidence observation.</p>
            <div className="hero-actions"><Link className="button" href="/demo">Explore the demo <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/how-it-works">How it works <span aria-hidden="true">→</span></Link></div>
            <p className="hero-disclaimer">Prototype only · Not a certified mine-safety or evacuation system</p>
          </div>
          <div className="hero-visual" role="img" aria-label="Illustration of the sensor, gateway, and cloud monitoring layers">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-center"><Image src="/brand-logo.png" width={160} height={56} alt="" priority /></div>
            <div className="visual-tag tag-sensor"><span className="tag-mark" />Sensor node <small>Field layer</small></div>
            <div className="visual-tag tag-gateway"><span className="tag-mark" />Local gateway <small>Edge layer</small></div>
            <div className="visual-tag tag-cloud"><span className="tag-mark" />Cloud dashboard <small>Internal layer</small></div>
            <span className="visual-caption">SYSTEM OVERVIEW · PROTOTYPE</span>
          </div>
        </div>
        <div className="container hero-foot"><span>Designed for mine monitoring research</span><span>Sensor → LoRa → Gateway → Cloud</span></div>
      </section>

      <section className="section section-problem" data-reveal>
        <div className="container split-heading"><div><span className="eyebrow">THE CHALLENGE</span><h2>Small changes deserve a clearer view.</h2></div><p>Mine subsidence can develop over time. BHU-DRISHTI explores how low-cost sensor nodes and a local gateway could help teams collect ground-movement signals and review them centrally.</p></div>
      </section>

      <section className="section section-how" id="how-it-works">
        <div className="container"><div className="section-heading" data-reveal><span className="eyebrow">HOW IT WORKS</span><h2>Four layers. One monitoring flow.</h2><p>Explore the prototype architecture and what each layer is intended to do.</p></div><Architecture /><div className="section-link-row"><Link className="text-link" href="/how-it-works">See the full system overview <span aria-hidden="true">→</span></Link></div></div>
      </section>

      <section className="section section-stats" data-reveal>
        <div className="container"><div className="section-heading"><span className="eyebrow">PROJECT SNAPSHOT</span><h2>Built as a practical prototype.</h2><p>Early project figures only. They do not describe a deployed or safety-certified network.</p></div>
          <div className="stats-grid">
            <article className="stat-card"><span className="stat-label">PUBLIC NODE COUNT</span><strong className="stat-number"><CountUp value={stats?.nodes_monitoring ?? null} /></strong><span className="stat-caption">{stats ? "Nodes reported by the public aggregate API" : "Public count unavailable"}</span></article>
            <article className="stat-card"><span className="stat-label">ESTIMATED NODE COST</span><strong className="stat-number">~₹900</strong><span className="stat-caption">Approximate project estimate per node; BOM verification pending.</span></article>
            <article className="stat-card"><span className="stat-label">PILOT REGIONS</span><strong className="stat-number stat-tbd">To be confirmed</strong><span className="stat-caption">TODO: add approved deployment regions when confirmed.</span></article>
          </div>
        </div>
      </section>

      <section className="section section-demo" id="demo" data-reveal>
        <div className="container demo-grid"><div className="demo-copy"><span className="eyebrow">SEE THE PROTOTYPE</span><h2>From sensor node to operator view.</h2><p>The demo will show how readings move through the prototype and appear in the internal dashboard. No public per-site readings are shown here.</p><Link className="button button-dark" href="/demo">View demo details <span aria-hidden="true">→</span></Link></div>
          <Link className="demo-placeholder" href="/demo" aria-label="Open demo details"><span className="play-mark" aria-hidden="true">▶</span><span className="placeholder-label">DEMO MEDIA</span><strong>Prototype video or photo</strong><small>TODO: add an approved project demo asset.</small></Link>
        </div>
      </section>

      <section className="section section-team" id="team" data-reveal>
        <div className="container team-row"><div><span className="eyebrow">THE TEAM</span><h2>Built by Veyronix.</h2><p>Project team details will be added when approved for publication.</p></div><Link className="text-link" href="/team">Meet the team <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section section-contact" data-reveal>
        <div className="container contact-cta"><div><span className="eyebrow">PILOTS & PARTNERSHIPS</span><h2>Interested in the project?</h2><p>Get in touch about research collaboration, demonstrations, or a potential pilot.</p></div><Link className="button" href="/contact">Contact the team <span aria-hidden="true">→</span></Link></div>
      </section>
    </>
  );
}
