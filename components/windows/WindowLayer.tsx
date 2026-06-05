"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/lib/stores/window-store";
import { WindowFrame } from "./WindowFrame";

export function WindowLayer() {
  const { windows } = useWindowStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {windows
          .filter((window) => !window.isMinimized)
          .map((window) => (
            <WindowFrame key={window.id} window={window} />
          ))}
      </AnimatePresence>
    </div>
  );
}
