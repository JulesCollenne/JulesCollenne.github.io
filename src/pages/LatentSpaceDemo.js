"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
export default function LatentSpaceDemo() {
    const [points, setPoints] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);
    const [patient, setPatient] = useState("");
    const plotRef = useRef(null);
    // Load data
    useEffect(() => {
        fetch("/demos/latent_space/points.json")
            .then((r) => r.json())
            .then((data) => {
            setPoints(data);
            if (data.length) {
                const unique = Array.from(new Set(data.map((p) => p.patient || "unknown")));
                setPatient(unique[0]);
            }
        })
            .catch((err) => console.error("Failed to load points:", err));
    }, []);
    if (!points.length)
        return _jsx("p", { className: "text-center mt-10", children: "Loading\u2026" });
    if (!patient)
        return null;
    // Extract patient list
    const patients = Array.from(new Set(points.map((p) => p.patient || "unknown")));
    const filtered = points.filter((p) => p.patient === patient);
    // Compute extremes
    const minScore = Math.min(...filtered.map((p) => p.score));
    const maxScore = Math.max(...filtered.map((p) => p.score));
    const mostNormal = filtered.find((p) => p.score === minScore);
    const mostAbnormal = filtered.find((p) => p.score === maxScore);
    // Coordinates
    const x = filtered.map((p) => p.x);
    const y = filtered.map((p) => p.y);
    const color = filtered.map((p) => p.score);
    const ids = filtered.map((p) => p.id);
    // Color scale
    const colorscale = [
        [0, "rgb(0,200,50)"],
        [0.5, "rgb(255,230,0)"],
        [1, "rgb(220,0,0)"],
    ];
    return (_jsxs("div", { className: "relative space-y-4 bg-white rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm text-neutral-700 dark:text-neutral-300", children: "Select patient:" }), _jsx("select", { value: patient, onChange: (e) => setPatient(e.target.value), className: "text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg p-1 bg-transparent", children: patients.map((p) => (_jsx("option", { value: p, children: p }, p))) })] }), _jsx(Plot, { ref: plotRef, data: [
                    {
                        x,
                        y,
                        text: ids,
                        mode: "markers",
                        marker: {
                            color,
                            colorscale,
                            size: 8,
                            opacity: 0.85,
                            colorbar: {
                                title: "Anomaly score",
                                tickfont: { size: 10, color: "#555" },
                            },
                        },
                        hovertemplate: "%{text}<extra></extra>",
                    },
                    ...(mostNormal && mostAbnormal
                        ? [
                            {
                                x: [mostNormal.x],
                                y: [mostNormal.y],
                                text: [mostNormal.id],
                                mode: "markers+text",
                                textposition: "top center",
                                marker: { size: 12, color: "blue", symbol: "star" },
                            },
                            {
                                x: [mostAbnormal.x],
                                y: [mostAbnormal.y],
                                text: [mostAbnormal.id],
                                mode: "markers+text",
                                textposition: "top center",
                                marker: { size: 12, color: "red", symbol: "star" },
                            },
                        ]
                        : []),
                ], layout: {
                    autosize: true,
                    margin: { t: 20, l: 20, r: 20, b: 20 },
                    paper_bgcolor: "white",
                    plot_bgcolor: "white",
                    xaxis: { visible: false },
                    yaxis: { visible: false },
                }, style: { width: "100%", height: "500px" }, onHover: (e) => {
                    const id = e.points?.[0]?.text;
                    const found = filtered.find((p) => p.id === id) ||
                        filtered.find((p) => p.id === mostNormal?.id || p.id === mostAbnormal?.id) ||
                        null;
                    setHovered(found);
                }, onUnhover: () => setHovered(null), onClick: (e) => {
                    const id = e.points?.[0]?.text;
                    const found = filtered.find((p) => p.id === id) || null;
                    setSelected(found);
                }, config: { displayModeBar: false } }), hovered && (_jsxs("div", { className: "absolute bg-white border border-neutral-300 rounded-lg shadow-md p-2", style: {
                    top: "10px",
                    right: "10px",
                    width: "140px",
                    pointerEvents: "none",
                }, children: [_jsx("img", { src: hovered.img, alt: hovered.id, className: "w-full rounded-md object-cover" }), _jsxs("p", { className: "text-[11px] mt-1 text-neutral-600", children: [hovered.id, " ", _jsx("br", {}), "Score: ", hovered.score.toFixed(3)] })] })), selected && (_jsxs("div", { className: "absolute top-2 right-2 bg-white border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 max-w-xs shadow-lg", children: [_jsx("img", { src: selected.img, alt: selected.id, className: "w-full rounded-lg mb-2 object-cover" }), _jsxs("p", { className: "text-sm", children: [_jsx("strong", { children: "ID:" }), " ", selected.id] }), _jsxs("p", { className: "text-sm", children: [_jsx("strong", { children: "Score:" }), " ", selected.score.toFixed(3)] }), _jsxs("p", { className: "text-sm", children: [_jsx("strong", { children: "Patient:" }), " ", selected.patient] }), _jsx("button", { onClick: () => setSelected(null), className: "mt-2 text-xs underline text-neutral-500 hover:text-neutral-700", children: "Close" })] }))] }));
}
