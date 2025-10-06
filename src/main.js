import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/main.tsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AppShell from "./layouts/AppShell";
import BlogIndex from "./blog/BlogIndex";
import BlogPost from "./blog/BlogPost";
import DemoPage from "./pages/Demo";
import "./index.css"; // if you use it
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx("div", { className: "p-6", children: "Loading\u2026" }), children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(AppShell, {}), children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogIndex, {}) }), _jsx(Route, { path: "/blog/:slug", element: _jsx(BlogPost, {}) }), _jsx(Route, { path: "/demo", element: _jsx(DemoPage, {}) })] }) }) }) }) }));
