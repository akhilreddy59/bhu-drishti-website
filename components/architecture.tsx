"use client";

import { useState } from "react";

const layers = [
  { id: "sensing", title: "Sensing", number: "01", description: "Prototype nodes use an MPU6050 for tilt, a piezoelectric sensor for vibration, and linear potentiometers for displacement and crack-width measurements." },
  { id: "communication", title: "Communication", number: "02", description: "LoRa radio is the planned link between remote sensor nodes and the local gateway. Field range and packet behavior still need validation." },
  { id: "gateway", title: "Gateway", number: "03", description: "A local processing layer stores readings and evaluates configured alert thresholds. The Arduino Mega and physical LED/buzzer are not connected yet." },
  { id: "cloud", title: "Cloud", number: "04", description: "The cloud API and internal dashboard are designed for authenticated monitoring. The public website does not display per-site readings or risk." },
] as const;

export function Architecture() {
  const [active, setActive] = useState<(typeof layers)[number]["id"]>("sensing");
  const selected = layers.find((layer) => layer.id === active)!;
  return (
    <div className="architecture" data-reveal>
      <div className="architecture-flow" role="group" aria-label="System architecture layers">
        {layers.map((layer, index) => (
          <div className="architecture-step" key={layer.id}>
            <button type="button" className={`architecture-card${active === layer.id ? " selected" : ""}`} aria-pressed={active === layer.id} aria-controls="architecture-detail" id={`tab-${layer.id}`} onMouseEnter={() => setActive(layer.id)} onFocus={() => setActive(layer.id)} onClick={() => setActive(layer.id)}>
              <span className="step-number">{layer.number}</span><strong>{layer.title}</strong>
              <span className="step-hint">{active === layer.id ? "Selected" : "Explore layer"}</span>
            </button>
            {index < layers.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <section className="architecture-detail" id="architecture-detail" role="region" aria-labelledby={`tab-${selected.id}`}>
        <span className="eyebrow">LAYER {selected.number}</span><h3>{selected.title}</h3><p>{selected.description}</p>
      </section>
      <p className="prototype-note">Prototype architecture; components and field behavior are subject to hardware validation.</p>
    </div>
  );
}
