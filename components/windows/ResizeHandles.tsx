"use client";

import React, { useCallback, useRef } from "react";

export type ResizeDirection = 
  | "n" | "s" | "e" | "w" 
  | "ne" | "nw" | "se" | "sw";

interface ResizeHandlesProps {
  onResizeStart: (direction: ResizeDirection, e: React.PointerEvent) => void;
  onResizeMove: (e: React.PointerEvent) => void;
  onResizeEnd: (e: React.PointerEvent) => void;
  disabled?: boolean;
}

const HANDLE_SIZE = 8; // 手柄热区大小

// 光标映射
const cursorMap: Record<ResizeDirection, string> = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

export function ResizeHandles({ 
  onResizeStart, 
  onResizeMove, 
  onResizeEnd,
  disabled = false 
}: ResizeHandlesProps) {
  const activeDirection = useRef<ResizeDirection | null>(null);

  const handlePointerDown = useCallback((direction: ResizeDirection, e: React.PointerEvent) => {
    if (disabled) return;
    e.stopPropagation();
    e.preventDefault();
    activeDirection.current = direction;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onResizeStart(direction, e);
  }, [disabled, onResizeStart]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!activeDirection.current) return;
    onResizeMove(e);
  }, [onResizeMove]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!activeDirection.current) return;
    activeDirection.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    onResizeEnd(e);
  }, [onResizeEnd]);

  if (disabled) return null;

  // 边缘手柄样式
  const edgeStyle = "absolute bg-transparent hover:bg-blue-500/20 transition-colors";
  // 角落手柄样式
  const cornerStyle = "absolute bg-transparent hover:bg-blue-500/30 transition-colors z-10";

  return (
    <>
      {/* 上边 */}
      <div
        className={edgeStyle}
        style={{
          top: -HANDLE_SIZE / 2,
          left: HANDLE_SIZE,
          right: HANDLE_SIZE,
          height: HANDLE_SIZE,
          cursor: cursorMap.n,
        }}
        onPointerDown={(e) => handlePointerDown("n", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 下边 */}
      <div
        className={edgeStyle}
        style={{
          bottom: -HANDLE_SIZE / 2,
          left: HANDLE_SIZE,
          right: HANDLE_SIZE,
          height: HANDLE_SIZE,
          cursor: cursorMap.s,
        }}
        onPointerDown={(e) => handlePointerDown("s", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 左边 */}
      <div
        className={edgeStyle}
        style={{
          left: -HANDLE_SIZE / 2,
          top: HANDLE_SIZE,
          bottom: HANDLE_SIZE,
          width: HANDLE_SIZE,
          cursor: cursorMap.w,
        }}
        onPointerDown={(e) => handlePointerDown("w", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 右边 */}
      <div
        className={edgeStyle}
        style={{
          right: -HANDLE_SIZE / 2,
          top: HANDLE_SIZE,
          bottom: HANDLE_SIZE,
          width: HANDLE_SIZE,
          cursor: cursorMap.e,
        }}
        onPointerDown={(e) => handlePointerDown("e", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 左上角 */}
      <div
        className={cornerStyle}
        style={{
          top: -HANDLE_SIZE / 2,
          left: -HANDLE_SIZE / 2,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
          cursor: cursorMap.nw,
        }}
        onPointerDown={(e) => handlePointerDown("nw", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 右上角 */}
      <div
        className={cornerStyle}
        style={{
          top: -HANDLE_SIZE / 2,
          right: -HANDLE_SIZE / 2,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
          cursor: cursorMap.ne,
        }}
        onPointerDown={(e) => handlePointerDown("ne", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 左下角 */}
      <div
        className={cornerStyle}
        style={{
          bottom: -HANDLE_SIZE / 2,
          left: -HANDLE_SIZE / 2,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
          cursor: cursorMap.sw,
        }}
        onPointerDown={(e) => handlePointerDown("sw", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* 右下角 */}
      <div
        className={cornerStyle}
        style={{
          bottom: -HANDLE_SIZE / 2,
          right: -HANDLE_SIZE / 2,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
          cursor: cursorMap.se,
        }}
        onPointerDown={(e) => handlePointerDown("se", e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </>
  );
}
