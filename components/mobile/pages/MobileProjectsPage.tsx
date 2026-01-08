"use client";

import { useState, useEffect } from "react";
import { MobileThemeConfig } from "@/lib/mobile-theme-config";
import { usePageStore } from "@/lib/stores/page-store";
import type { Project } from "@/lib/types/project";

interface MobileProjectsPageProps {
  config: MobileThemeConfig;
}

export function MobileProjectsPage({ config }: MobileProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { push } = usePageStore();

  useEffect(() => {
    fetch("/data/projects.index.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openProject = (project: Project) => {
    push("project", { title: project.title, project });
  };

  if (loading) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: config.page.bg }}
      >
        <div style={{ color: config.page.secondaryTextColor }}>加载中...</div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-auto p-4"
      style={{ background: config.page.bg }}
    >
      <div className="space-y-3">
        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => openProject(project)}
            className="w-full text-left overflow-hidden transition-transform active:scale-[0.98]"
            style={{
              background: config.page.cardBg,
              borderRadius: config.page.cardRadius,
            }}
          >
            {/* 封面图 */}
            <div
              className="w-full aspect-video bg-cover bg-center"
              style={{
                backgroundImage: `url(${project.cover})`,
                backgroundColor: config.page.bg,
              }}
            />
            {/* 信息 */}
            <div className="p-4">
              <h3
                className="font-semibold mb-1"
                style={{ color: config.page.textColor }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mb-2"
                style={{ color: config.page.secondaryTextColor }}
              >
                {project.client} · {project.year}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded"
                    style={{
                      background: config.navigation.activeColor + "20",
                      color: config.navigation.activeColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
