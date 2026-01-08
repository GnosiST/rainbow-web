// 项目数据类型定义

export interface Project {
  slug: string;
  title: string;
  year: number;
  client: string;
  tags: string[];
  cover: string;
  images: string[];
  featured: boolean;
  order: number;
  excerpt: string;
}

export interface ProjectsIndex {
  generatedAt: string;
  count: number;
  projects: Project[];
}
