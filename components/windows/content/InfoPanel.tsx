"use client";

import React from "react";
import { Project } from "@/lib/types/project";

interface InfoPanelProps {
  project: Project;
}

export function InfoPanel({ project }: InfoPanelProps) {
  return (
    <div className="h-full overflow-auto p-4">
      {/* 标题 */}
      <h1 className="text-xl font-semibold text-white mb-4">
        {project.title}
      </h1>
      
      {/* 元信息 */}
      <div className="space-y-3 mb-6">
        <InfoRow label="Year" value={project.year.toString()} />
        {project.client && (
          <InfoRow label="Client" value={project.client} />
        )}
      </div>
      
      {/* 标签 */}
      {project.tags.length > 0 && (
        <div className="mb-6">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* 描述/摘要 */}
      <div className="mb-6">
        <div className="text-white/40 text-xs uppercase tracking-wider mb-2">
          Description
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          {project.excerpt}
        </p>
      </div>
      
      {/* 图片数量 */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{project.images.length} images</span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/40 text-sm">{label}</span>
      <span className="text-white/80 text-sm">{value}</span>
    </div>
  );
}
