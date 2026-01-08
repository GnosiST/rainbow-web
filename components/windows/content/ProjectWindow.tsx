"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/lib/types/project";
import { Gallery } from "./Gallery";
import { InfoPanel } from "./InfoPanel";

interface ProjectWindowProps {
  data?: {
    slug?: string;
    project?: Project;
  };
}

export function ProjectWindow({ data }: ProjectWindowProps) {
  const [project, setProject] = useState<Project | null>(data?.project || null);
  const [loading, setLoading] = useState(!data?.project);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 如果没有直接传入 project，从索引中加载
  useEffect(() => {
    if (!data?.project && data?.slug) {
      fetch("/data/projects.index.json")
        .then((res) => res.json())
        .then((index) => {
          const found = index.projects.find((p: Project) => p.slug === data.slug);
          if (found) {
            setProject(found);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [data?.slug, data?.project]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">Project not found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      {/* 画廊区域 - 左侧/上方 */}
      <div className="flex-1 min-h-0">
        <Gallery
          images={project.images}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      </div>
      
      {/* 信息面板 - 右侧/下方 */}
      <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/10">
        <InfoPanel project={project} />
      </div>
    </div>
  );
}
