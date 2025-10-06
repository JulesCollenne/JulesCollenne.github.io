"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
export default function BackgroundNet({ density = 0.00005, maxSpeed = 0.03, connectDist = 140, dotSize = 1.6, dark = false, }) {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        let raf = 0;
        let nodes = [];
        let last = performance.now();
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        let width = 0, height = 0;
        let paused = false;
        // Reduce motion
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        let reduced = m.matches;
        const onMotionChange = () => (reduced = m.matches);
        m.addEventListener?.("change", onMotionChange);
        // ✅ Colors derived from prop
        const lineStroke = dark ? "rgb(70, 140, 160)" : "rgb(60, 150, 170)"; // tweak as you like
        const dotFill = dark ? "rgba(120, 210, 220, 0.65)" : "rgba(90, 200, 220, 0.50)";
        function resize() {
            const rect = canvas.parentElement?.getBoundingClientRect() ?? { width: innerWidth, height: innerHeight };
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // rebuild nodes
            const target = Math.max(20, Math.floor(width * height * density));
            nodes = Array.from({ length: target }, () => {
                const speed = (Math.random() * 0.6 + 0.4) * maxSpeed;
                const a = Math.random() * Math.PI * 2;
                return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed };
            });
        }
        function step(now) {
            if (paused || reduced)
                return;
            const dt = Math.min(40, now - last);
            if (dt < 16) {
                raf = requestAnimationFrame(step);
                return;
            }
            last = now;
            // move
            for (const n of nodes) {
                n.x += n.vx * dt;
                n.y += n.vy * dt;
                if (n.x < 0 || n.x > width)
                    n.vx *= -1;
                if (n.y < 0 || n.y > height)
                    n.vy *= -1;
                n.x = Math.max(0, Math.min(width, n.x));
                n.y = Math.max(0, Math.min(height, n.y));
            }
            // draw
            ctx.clearRect(0, 0, width, height);
            // lines
            const cd2 = connectDist * connectDist;
            ctx.strokeStyle = lineStroke; // solid color once
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < cd2) {
                        const alpha = 0.35 * (1 - d2 / cd2);
                        ctx.globalAlpha = alpha; // fade with distance
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1; // reset
            // dots
            ctx.fillStyle = dotFill;
            const r = dotSize;
            for (const n of nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                ctx.fill();
            }
            raf = requestAnimationFrame(step);
        }
        function onVisibility() {
            paused = document.hidden;
            if (!paused && !reduced) {
                last = performance.now();
                raf = requestAnimationFrame(step);
            }
        }
        resize();
        onVisibility();
        addEventListener("resize", resize);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            m.removeEventListener?.("change", onMotionChange);
            removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", onVisibility);
            cancelAnimationFrame(raf);
        };
    }, [connectDist, density, dotSize, maxSpeed, dark]); // ✅ include dark
    return (_jsxs("div", { className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", "aria-hidden": "true", children: [_jsx("div", { className: "absolute inset-0", style: {
                    background: dark
                        ? "radial-gradient(1200px 600px at 80% 10%, rgba(5,150,105,0.12), transparent 60%), \
               radial-gradient(900px 500px at 10% 80%, rgba(16,185,129,0.07), transparent 60%)"
                        : "radial-gradient(1200px 600px at 80% 10%, rgba(34,197,94,0.10), transparent 60%), \
 radial-gradient(900px 500px at 10% 80%, rgba(0,0,0,0.06), transparent 60%)",
                } }), _jsx("canvas", { ref: ref, className: "absolute inset-0" })] }));
}
