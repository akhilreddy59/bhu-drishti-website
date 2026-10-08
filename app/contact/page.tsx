import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { RevealObserver } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <><RevealObserver /><section className="page-hero"><div className="container"><span className="eyebrow">PILOTS & PARTNERSHIPS</span><h1>Start a conversation.</h1><p>Contact Veyronix about research collaboration, project demonstrations, or a potential pilot.</p></div></section><section className="page-body"><div className="container contact-layout"><aside className="contact-aside"><span className="eyebrow">CONTACT THE TEAM</span><h2>Tell us what you’re exploring.</h2><p>Use this form for project inquiries. Do not submit mine readings, safety incidents, or other sensitive operational information.</p><p className="todo-note">Submissions are saved to a website-local inbox file. Before launch, configure durable protected storage, retention, access controls, and a team review process.</p></aside><ContactForm /></div></section></>;
}
