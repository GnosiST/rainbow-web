"use client";

import React, { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/stores/window-store";
import { Project, ProjectsIndex } from "@/lib/types/project";

export function ProjectsWindow() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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
