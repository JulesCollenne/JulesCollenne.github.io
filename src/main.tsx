// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AppShell from "./layouts/AppShell";
import BlogIndex from "./pages/BlogIndex";
import PostPage from "./pages/PostPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<PostPage />} />
    </Route>
  </Routes>
</BrowserRouter>
  </React.StrictMode>
);

