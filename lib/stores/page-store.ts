import { create } from "zustand";
import { nanoid } from "nanoid";

// 页面类型
export type PageType = "about" | "projects" | "project" | "photos" | "settings";

// 主导航页面（底部 Tab 对应的页面）
const ROOT_PAGES: PageType[] = ["about", "projects", "photos", "settings"];

// 页面标题映射
const PAGE_TITLES: Record<PageType, string> = {
  about: "About",
  projects: "Projects",
  project: "Project",
  photos: "Photos",
  settings: "Settings",
};

// 页面状态
export interface PageState {
  id: string;
  type: PageType;
  title: string;
  data?: Record<string, unknown>;
}

interface PageStore {
  stack: PageState[];
  currentPage: PageState | null;

  push: (type: PageType, data?: Record<string, unknown>) => void;
  pop: () => void;
  popToRoot: () => void;
  replace: (type: PageType, data?: Record<string, unknown>) => void;
  setTitle: (title: string) => void;
}

// 创建页面状态
function createPage(type: PageType, data?: Record<string, unknown>): PageState {
  return {
    id: nanoid(),
    type,
    title: (data?.title as string) || PAGE_TITLES[type],
    data,
  };
}

export const usePageStore = create<PageStore>((set, get) => ({
  stack: [],
  currentPage: null,

  push: (type, data) => {
    const newPage = createPage(type, data);
    const { stack } = get();

    // 如果是主导航页面，清空堆栈并设为根页面
    if (ROOT_PAGES.includes(type)) {
      set({
        stack: [newPage],
        currentPage: newPage,
      });
    } else {
      // 子页面（如 project 详情）推入堆栈
      set({
        stack: [...stack, newPage],
        currentPage: newPage,
      });
    }
  },

  pop: () => {
    const { stack } = get();
    if (stack.length <= 1) return; // 保留至少一个页面

    const newStack = stack.slice(0, -1);
    set({
      stack: newStack,
      currentPage: newStack[newStack.length - 1] || null,
    });
  },

  popToRoot: () => {
    const { stack } = get();
    if (stack.length === 0) return;

    const rootPage = stack[0];
    set({
      stack: [rootPage],
      currentPage: rootPage,
    });
  },

  replace: (type, data) => {
    const newPage = createPage(type, data);

    // replace 总是清空堆栈，设为新的根页面
    set({
      stack: [newPage],
      currentPage: newPage,
    });
  },

  setTitle: (title) => {
    const { stack, currentPage } = get();
    if (!currentPage) return;

    const updatedPage = { ...currentPage, title };
    const newStack = stack.map((p) =>
      p.id === currentPage.id ? updatedPage : p
    );

    set({
      stack: newStack,
      currentPage: updatedPage,
    });
  },
}));
