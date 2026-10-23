import type { PointerEvent } from "react";
import { useRef } from "react";
import { SIDEBAR_DRAG_DISTANCE_PX } from "../../lib/layout";

interface SidebarResizeHandleProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

// An invisible strip on the sidebar border. Dragging it left collapses the sidebar and dragging it
// right expands it. There are only two states, so the width is never free.
// Keyboard users use the toggle button instead, so this strip is hidden from screen readers.
export function SidebarResizeHandle({ collapsed, onCollapsedChange }: SidebarResizeHandleProps) {
  const startX = useRef<number | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    startX.current = event.clientX;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (distance <= -SIDEBAR_DRAG_DISTANCE_PX && !collapsed) onCollapsedChange(true);
    if (distance >= SIDEBAR_DRAG_DISTANCE_PX && collapsed) onCollapsedChange(false);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    startX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      className="absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize touch-none hover:bg-accent-soft"
    />
  );
}
