"use client";
import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";

export default function LatentSpaceDemo() {
  const [points, setPoints] = useState<any[]>([]);
  const [hovered, setHovered] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [patient, setPatient] = useState<string>("");
  const plotRef = useRef<any>(null);

  // Load data
  useEffect(() => {
    fetch("/demos/latent_space/points.json")
      .then((r) => r.json())
      .then((data) => {
        setPoints(data);
        if (data.length) {
          const unique = Array.from(new Set(data.map((p: any) => p.patient || "unknown")));
          setPatient(unique[0]);
        }
      })
      .catch((err) => console.error("Failed to load points:", err));
  }, []);

  if (!points.length) return <p className="text-center mt-10">Loading…</p>;
  if (!patient) return null;

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
  const imgs = filtered.map((p) => p.img);

  const colorscale = [
    [0, "rgb(0,200,50)"],
    [0.5, "rgb(255,230,0)"],
    [1, "rgb(220,0,0)"],
  ];

  return (
    <div className="relative space-y-4 bg-white rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 shadow-sm">
      {/* Patient selector */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-neutral-700 dark:text-neutral-300">Select patient:</label>
        <select
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          className="text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg p-1 bg-transparent"
        >
          {patients.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Plotly chart */}
      <Plot
        ref={plotRef}
        data={[
          {
            x,
            y,
            text: ids,
            customdata: imgs,
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
                  text: ["Most normal"],
                  customdata: [mostNormal.img],
                  mode: "markers+text",
                  textposition: "top center",
                  marker: { size: 14, color: "blue", symbol: "star" },
                  hovertemplate: "Most normal<extra></extra>",
                },
                {
                  x: [mostAbnormal.x],
                  y: [mostAbnormal.y],
                  text: ["Most abnormal"],
                  customdata: [mostAbnormal.img],
                  mode: "markers+text",
                  textposition: "top center",
                  marker: { size: 14, color: "red", symbol: "star" },
                  hovertemplate: "Most abnormal<extra></extra>",
                },
              ]
            : []),
        ]}
        layout={{
          autosize: true,
          margin: { t: 20, l: 20, r: 20, b: 20 },
          paper_bgcolor: "white",
          plot_bgcolor: "white",
          xaxis: { visible: false },
          yaxis: { visible: false },
        }}
        style={{ width: "100%", height: "500px" }}
        onHover={(e) => {
          const point = e.points[0];
          const id = point.text;
          const img = point.customdata;
          const found = filtered.find((p) => p.id === id) || { id, img, score: 0 };
          setHovered(found);
        }}
        onUnhover={() => setHovered(null)}
        onClick={(e) => {
          const id = e.points[0].text;
          const found = filtered.find((p) => p.id === id);
          setSelected(found);
        }}
        config={{ displayModeBar: false }}
      />

      {/* Hover thumbnail */}
      {hovered && (
        <div
          className="absolute z-50 bg-white border border-neutral-300 rounded-lg shadow-md p-2"
          style={{
            top: "10px",
            right: "10px",
            width: "140px",
            pointerEvents: "none",
          }}
        >
          <img
            src={hovered.img}
            alt={hovered.id}
            className="w-full rounded-md object-cover"
          />
          <p className="text-[11px] mt-1 text-neutral-600">
            {hovered.id || "Lesion"} <br />
            {hovered.score ? `Score: ${hovered.score.toFixed(3)}` : ""}
          </p>
        </div>
      )}

      {/* Clicked lesion info */}
      {selected && (
        <div className="absolute top-2 right-2 bg-white border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 max-w-xs shadow-lg">
          <img
            src={selected.img}
            alt={selected.id}
            className="w-full rounded-lg mb-2 object-cover"
          />
          <p className="text-sm">
            <strong>ID:</strong> {selected.id}
          </p>
          <p className="text-sm">
            <strong>Score:</strong> {selected.score.toFixed(3)}
          </p>
          <p className="text-sm">
            <strong>Patient:</strong> {selected.patient}
          </p>
          <button
            onClick={() => setSelected(null)}
            className="mt-2 text-xs underline text-neutral-500 hover:text-neutral-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

