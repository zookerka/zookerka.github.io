import { profile } from "../data/profile";
import { trackPointer } from "../hooks/useReveal";
import { ResearchVisual } from "./ResearchVisual";

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-head reveal">
      <span className="section-label">
        {index} <span className="sep">/</span> {label}
      </span>
      <h2>{title}</h2>
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="about">
      <SectionHead index="01" label="about" title="A bit about me" />
      <div className="about">
        <div className="about-text">
          {profile.about.map((p, i) => (
            <p key={i} className="reveal" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              {p}
            </p>
          ))}
        </div>
        <ul className="exp">
          {profile.experience.map((e, i) => (
            <li
              key={e.title}
              className="card exp-item reveal"
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              onPointerMove={trackPointer}
            >
              <span className="exp-idx">0{i + 1}</span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Stack() {
  const r = profile.research;
  return (
    <section className="section" id="stack">
      <SectionHead index="02" label="stack" title="What I know, what I'm learning" />

      <div className="stack">
        <div className="card stack-table reveal" onPointerMove={trackPointer}>
          {profile.stack.map((g) => (
            <div className="stack-row" key={g.label}>
              <span className="stack-label">{g.label}</span>
              <ul className="chips">
                {g.items.map((t) => (
                  <li className="chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="stack-row">
            <span className="stack-label stack-label--now">learning</span>
            <ul className="chips">
              {profile.learning.map((t) => (
                <li className="chip chip--learning" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article className="card research reveal" style={{ "--d": "120ms" } as React.CSSProperties} onPointerMove={trackPointer}>
          <ResearchVisual />
          <div className="research-body">
            <span className="badge">
              <span className="pulse" aria-hidden="true" /> research · in progress
            </span>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
            <ul className="chips chips--small">
              {r.tags.map((t) => (
                <li className="chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead index="03" label="projects" title="Selected projects" />
      <div className="projects">
        {profile.projects.map((p, i) => (
          <article
            key={p.name}
            className={`card project reveal${i % 2 ? " project--flip" : ""}`}
            onPointerMove={trackPointer}
          >
            <div className="project-shot">
              <div className="shot-frame">
                <div className="shot-bar" aria-hidden="true">
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="shot-url">{p.name.toLowerCase()}.app</span>
                </div>
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
              </div>
            </div>
            <div className="project-body">
              <div className="project-meta">
                <span>{p.year}</span>
                <span className="sep">/</span>
                <span>{p.kicker}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <ul className="project-points">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="chips chips--small">
                {p.tags.map((t) => (
                  <li className="chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
              {p.links.length > 0 && (
                <div className="project-links">
                  {p.links.map((l) => (
                    <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const links = profile.links;
  return (
    <section className="section" id="contact">
      <SectionHead index="04" label="contact" title="Get in touch" />
      <div className="card contact reveal" onPointerMove={trackPointer}>
        <p className="contact-lead">
          Interesting problem, weird bug, or just want to argue about architecture? Reach out.
          <span className="muted"> I reply faster than CI fails.</span>
        </p>
        {links.length > 0 ? (
          <ul className="contact-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  className="contact-link"
                  href={l.href}
                  {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  <span className="contact-label">{l.label}</span>
                  <span className="contact-handle">{l.handle ?? l.href.replace(/^https?:\/\//, "")}</span>
                  <span className="contact-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="contact-empty">
            <span className="caret caret--inline" aria-hidden="true" />
            links coming soon
          </p>
        )}
      </div>
    </section>
  );
}
