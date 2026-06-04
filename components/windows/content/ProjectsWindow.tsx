"use client";

import React, { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/stores/window-store";
import { Project, ProjectsIndex } from "@/lib/types/project";

interface ProjectGuideResponse {
  guide: string;
  source: "openai" | "fallback";
  error?: string;
}

export function ProjectsWindow() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState("");
  const [guideSource, setGuideSource] = useState<"openai" | "fallback" | null>(null);
  const [guideLoading, setGuideLoading] = useState(false);
  const [guideError, setGuideError] = useState("");
  const { open } = useWindowStore();

  useEffect(() => {
    fetch("/data/projects.index.json")
      .then((res) => res.json())
      .then((data: ProjectsIndex) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || projects.length === 0) return;

    let cancelled = false;
    setGuideLoading(true);

    fetch("/api/ai/project-guide")
      .then((res) => res.json())
      .then((data: ProjectGuideResponse) => {
        if (cancelled) return;
        setGuide(data.guide);
        setGuideSource(data.source);
        setGuideError(data.error || "");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load AI guide:", err);
        setGuideError("AI guide is temporarily unavailable.");
      })
      .finally(() => {
        if (!cancelled) {
          setGuideLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loading, projects.length]);

  const handleProjectClick = (project: Project) => {
    open("project", { 
      slug: project.slug, 
      title: project.title,
      project 
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <AIGuideCard
        guide={guide}
        source={guideSource}
        loading={guideLoading}
        error={guideError}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
}

interface AIGuideCardProps {
  guide: string;
  source: "openai" | "fallback" | null;
  loading: boolean;
  error: string;
}

function AIGuideCard({ guide, source, loading, error }: AIGuideCardProps) {
  return (
    <section className="mb-4 rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-blue-300/80">
            AI Guide
          </div>
          <h2 className="mt-1 text-sm font-medium text-white/90">
            Curated path through the portfolio
          </h2>
        </div>
        {source && (
          <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-xs text-white/50">
            {source === "openai" ? "Generated" : "Fallback"}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-white/70">
        {loading ? "Generating a project guide..." : guide || "Preparing guide..."}
      </p>

      {error && (
        <p className="mt-2 text-xs text-yellow-200/70">
          {error}
        </p>
      )}
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      {/* 封面图 */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
        {/* 文件夹风格装饰 */}
        <div className="absolute top-0 left-0 w-1/3 h-3 bg-white/10 rounded-br-lg" />
        
        {/* 占位图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl opacity-30">📁</div>
        </div>
        
        {/* Featured 标签 */}
        {project.featured && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/80 text-black text-xs font-medium rounded">
            Featured
          </div>
        )}
      </div>
      
      {/* 信息区 */}
      <div className="p-3">
        <h3 className="text-white/90 font-medium text-sm truncate group-hover:text-white">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/40 text-xs">{project.year}</span>
          {project.tags.length > 0 && (
            <>
              <span className="text-white/20">•</span>
              <span className="text-white/40 text-xs truncate">
                {project.tags[0]}
              </span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
