"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/lib/stores/window-store";
import type { Project } from "@/lib/types/project";

export function SlideshowWindow() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { open } = useWindowStore();

  // 加载 featured 项目
  useEffect(() => {
    fetch("/data/projects.index.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.projects.filter((p: Project) => p.featured);
        setFeaturedProjects(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 导航函数
  const goNext = useCallback(() => {
    if (featuredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  }, [featuredProjects.length]);

  const goPrev = useCallback(() => {
    if (featuredProjects.length === 0) return;
    setCurrentIndex((prev) => 
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  }, [featuredProjects.length]);

  // 打开项目详情
  const openProject = useCallback(() => {
    const project = featuredProjects[currentIndex];
    if (project) {
      open("project", { 
        title: project.title,
        slug: project.slug, 
        project,
      });
    }
  }, [featuredProjects, currentIndex, open]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">加载中...</div>
      </div>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">暂无精选项目</div>
      </div>
    );
  }

  const current = featuredProjects[currentIndex];

  return (
    <div className="w-full h-full flex flex-col bg-black/20">
      {/* 主展示区 */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* 封面图 */}
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${current.cover})`,
                backgroundColor: "#1a1a2e",
              }}
            >
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 导航按钮 */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 项目信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            key={current.slug + "-info"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">{current.title}</h2>
            <p className="text-white/60 text-sm mb-1">{current.client} · {current.year}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {current.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-white/10 rounded text-white/70">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={openProject}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors"
            >
              查看项目 →
            </button>
          </motion.div>
        </div>
      </div>

      {/* 底部指示器 */}
      <div className="h-12 flex items-center justify-center gap-2 bg-black/30">
        {featuredProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? "bg-white w-6" 
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
        <span className="ml-4 text-white/50 text-sm">
          {currentIndex + 1} / {featuredProjects.length}
        </span>
      </div>
    </div>
  );
}
