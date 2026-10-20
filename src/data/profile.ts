// All site copy lives here. No need to touch the layout.

export type Link = { label: string; href: string; handle?: string };

export type Project = {
  name: string;
  kicker: string;
  year: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  links: Link[];
};

export const profile = {
  name: "Dmitrii",
  role: "Software Engineer",
  years: 6,
  // second part renders dimmed
  headline: ["I build systems that stay fast", "and stay out of the way."],
  tagline:
    "Six years of backends, frontends and everything in between. Lately, teaching models to make sense of the world from above.",
  focus: "computer vision · remote sensing",

  about: [
    "Generalist by design: Python, C, C++ and TypeScript, from the database schema to the last pixel of the UI.",
    "I'm most at home where architecture meets performance. The right index, a queue on SKIP LOCKED or a hot loop rewritten in C++ usually beats adopting yet another framework.",
    "These days most of my time goes into ML, specifically how models see the planet from orbit and from a few hundred metres up.",
  ],

  experience: [
    {
      title: "Backend",
      text: "Services and APIs in Python and TypeScript. FastAPI, asyncio, Node, queues, caches, outboxes: the boring reliability that doesn't page you at 3 a.m.",
    },
    {
      title: "Frontend",
      text: "React and TypeScript. Interfaces that don't lag, don't need a manual, and look like someone actually thought about them.",
    },
    {
      title: "Trading bots",
      text: "Low-latency crypto bots: WebSocket feeds, in-memory order books, uvloop, and a profiler instead of gut feeling.",
    },
    {
      title: "Automation",
      text: "Scripts and pipelines that eat routine work. The best automation is the kind everyone forgets exists, because it just works.",
    },
  ],

  research: {
    title: "CV for satellite and aerial imagery",
    text: "A research project at the intersection of computer vision and remote sensing: detecting and analysing objects in satellite scenes and UAV footage, from geodata preprocessing to models that hold up across altitude, season and lighting.",
    tags: ["PyTorch", "YOLO", "ViT", "SAM", "GDAL", "rasterio", "ONNX"],
  },

  stack: [
    { label: "languages", items: ["Python", "C", "C++", "TypeScript", "SQL", "Bash"] },
    { label: "backend", items: ["FastAPI", "asyncio", "Node.js", "PostgreSQL", "Redis", "SQLAlchemy", "WebSockets"] },
    { label: "frontend", items: ["React", "Vite", "Tailwind", "TanStack Query"] },
    { label: "infra", items: ["Docker", "Linux", "GitHub Actions", "Caddy", "Prometheus", "Grafana"] },
  ],
  learning: ["PyTorch", "Computer Vision", "Transformers", "Remote Sensing", "ONNX Runtime"],

  projects: [
    {
      name: "Driftwatch",
      kicker: "Self-hosted website and API monitoring",
      year: "2026",
      description:
        "Watches pages and APIs, pulls out the data you care about with CSS/XPath, JSONPath or a plain-English description for an LLM, and alerts you on Telegram, a signed webhook or a live dashboard when a rule fires, like “price dropped below 100”.",
      highlights: [
        "Job queue lives in PostgreSQL: SKIP LOCKED and leases, no Celery",
        "Transactional outbox, so no lost or phantom alerts",
        "Two-layer SSRF defence, including DNS rebinding",
        "450+ tests against real Postgres and Redis, 93% coverage",
      ],
      tags: ["Python 3.13", "FastAPI", "PostgreSQL", "Redis", "React 19", "aiogram", "Claude API", "Docker"],
      image: "projects/driftwatch.png",
      imageAlt: "Driftwatch dashboard: active watches and recent alerts",
      links: [{ label: "GitHub", href: "https://github.com/zookerka/driftwatch" }],
    },
    {
      name: "Verto",
      kicker: "Privacy-first posture monitor",
      year: "2026",
      description:
        "A desktop app that watches your posture through the webcam and gently nudges you to sit up. It calibrates to your own baseline instead of a textbook-perfect pose.",
      highlights: [
        "Computer vision runs fully on-device; raw frames are never uploaded or stored",
        "Delayed reminders react to sustained changes, not every fidget",
        "Sensitivity adapts to camera angle and desk height",
        "Site: Next.js App Router, Tailwind, Framer Motion, Cloudflare Workers",
      ],
      tags: ["Computer Vision", "On-device ML", "TypeScript", "React 19", "Next.js", "Zod"],
      image: "projects/verto.png",
      imageAlt: "Verto interface: posture quality, calibration and head-and-shoulders tracking",
      links: [{ label: "GitHub", href: "https://github.com/zookerka/Verto" }],
    },
  ] satisfies Project[],

  // Contacts. Example: { label: "Telegram", href: "https://t.me/username", handle: "@username" }
  links: [
    { label: "Email", href: "mailto:dmitriidevv@proton.me", handle: "dmitriidevv@proton.me" },
    { label: "Fiverr", href: "https://www.fiverr.com/dfurmaniuk/", handle: "fiverr.com/dfurmaniuk" },
  ] as Link[],
};
