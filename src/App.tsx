import { useEffect, useState } from "react";
import { Background } from "./components/Background";
import { Hero } from "./components/Hero";
import { About, Contact, Projects, Stack } from "./components/Sections";
import { profile } from "./data/profile";
import { useReveal } from "./hooks/useReveal";

const nav = [
  { href: "#about", label: "about" },
  { href: "#stack", label: "stack" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    console.log(
      "%c d_ %c If you're reading the console, we should probably talk.",
      "background:#e6edf3;color:#0d1117;font-family:monospace;padding:2px 4px;border-radius:3px",
      "color:#8b949e",
    );
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Background />
      <nav className={`topbar${scrolled ? " topbar--scrolled" : ""}`}>
        <div className="topbar-inner">
          <a href="#top" className="logo">
            {profile.name.toLowerCase()}
            <span className="logo-dot">.</span>
            <span className="logo-dim">dev</span>
          </a>
          <ul className="topbar-links">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="wrap">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>

      <footer className="footer wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="muted">React + Vite · no trackers, no cookies</span>
      </footer>
    </>
  );
}
