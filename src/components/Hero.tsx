import { profile } from "../data/profile";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <div className="ident reveal">
          <span className="ident-mark" aria-hidden="true">
            {profile.name[0].toLowerCase()}_
          </span>
          <span className="ident-text">
            <span className="ident-name">{profile.name}</span>
            <span className="ident-role">
              {profile.role} <span className="sep">·</span> {profile.years} yrs
            </span>
          </span>
        </div>
        <h1 className="hero-title reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
          <span className="hero-title-strong">{profile.headline[0]}</span> {profile.headline[1]}
        </h1>
        <p className="hero-tagline reveal" style={{ "--d": "160ms" } as React.CSSProperties}>
          {profile.tagline}
        </p>
        <div className="hero-actions reveal" style={{ "--d": "240ms" } as React.CSSProperties}>
          <a className="btn btn--primary" href="#projects">
            See projects <span aria-hidden="true">↓</span>
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
          <span className="now">
            <span className="pulse" aria-hidden="true" />
            now: {profile.focus}
          </span>
        </div>
      </div>

      <figure className="code-card reveal" style={{ "--d": "320ms" } as React.CSSProperties} aria-label="A short summary of me, as a JSON file">
        <div className="code-bar">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="code-file">dmitrii.json</span>
        </div>
        <pre className="code">
          <code>
            <Line n={1}>{"{"}</Line>
            <Line n={2}>
              {"  "}<P>"name"</P>: <S>"{profile.name}"</S>,
            </Line>
            <Line n={3}>
              {"  "}<P>"role"</P>: <S>"{profile.role}"</S>,
            </Line>
            <Line n={4}>
              {"  "}<P>"experienceYears"</P>: <N>{profile.years}</N>,
            </Line>
            <Line n={5}>
              {"  "}<P>"speaks"</P>: [<S>"Python"</S>, <S>"C"</S>, <S>"C++"</S>, <S>"TypeScript"</S>],
            </Line>
            <Line n={6}>
              {"  "}<P>"cares"</P>: [<S>"architecture"</S>, <S>"p99"</S>, <S>"DX"</S>],
            </Line>
            <Line n={7}>
              {"  "}<P>"learning"</P>: <S>"ML / computer vision"</S>,
            </Line>
            <Line n={8}>
              {"  "}<P>"available"</P>: <K>true</K>
            </Line>
            <Line n={9}>{"}"}</Line>
          </code>
        </pre>
      </figure>
    </header>
  );
}

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="code-line" style={{ "--i": n } as React.CSSProperties}>
      <span className="ln" aria-hidden="true">
        {n}
      </span>
      {children}
      {"\n"}
    </span>
  );
}

const K = ({ children }: { children: React.ReactNode }) => <span className="tk-k">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="tk-p">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="tk-s">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="tk-n">{children}</span>;
