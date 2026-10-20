import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; tw: number };
type Sat = { a: number; b: number; speed: number; t: number; tilt: number; trail: { x: number; y: number }[] };

const LINK_DIST = 140;

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const root = rootRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let sats: Sat[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(90, (w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.1 + 0.4,
        tw: Math.random() * Math.PI * 2,
      }));

      const base = Math.max(w, h);
      sats = [
        { a: base * 0.62, b: base * 0.2, speed: 0.00022, t: Math.random() * 6, tilt: -0.28, trail: [] },
        { a: base * 0.48, b: base * 0.3, speed: -0.00016, t: Math.random() * 6, tilt: 0.42, trail: [] },
      ];
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // satellite orbits
      const cx = w * 0.5;
      const cy = h * 0.55;
      for (const s of sats) {
        s.t += s.speed * dt;
        const ex = Math.cos(s.t) * s.a;
        const ey = Math.sin(s.t) * s.b;
        const x = cx + ex * Math.cos(s.tilt) - ey * Math.sin(s.tilt);
        const y = cy + ex * Math.sin(s.tilt) + ey * Math.cos(s.tilt);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(s.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, s.a, s.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139, 148, 158, 0.045)";
        ctx.setLineDash([2, 6]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]);

        s.trail.push({ x, y });
        if (s.trail.length > 70) s.trail.shift();
        for (let i = 1; i < s.trail.length; i++) {
          const p0 = s.trail[i - 1];
          const p1 = s.trail[i];
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(201, 209, 217, ${(i / s.trail.length) * 0.22})`;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 237, 243, 0.85)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 237, 243, 0.06)";
        ctx.fill();
      }

      // constellation
      for (const n of nodes) {
        n.x += n.vx * dt * 0.15;
        n.y += n.vy * dt * 0.15;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        n.tw += dt * 0.0012;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 260);
          const alpha = (1 - d / LINK_DIST) * (0.07 + near * 0.28);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139, 148, 158, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const mx = n.x - mouse.x;
        const my = n.y - mouse.y;
        const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 220);
        const alpha = 0.25 + Math.sin(n.tw) * 0.15 + near * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 209, 217, ${alpha})`;
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="bg" ref={rootRef} aria-hidden="true">
      <div className="bg-glow bg-glow--a" />
      <div className="bg-glow bg-glow--b" />
      <div className="bg-glow bg-glow--c" />
      <div className="bg-grid" />
      <div className="bg-grid bg-grid--spot" />
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="bg-scan" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  );
}
