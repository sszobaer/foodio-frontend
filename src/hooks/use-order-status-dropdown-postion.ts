"use client";

import { useEffect, useState } from "react";

interface Position {
  left: number;
  top: number;
  openUpward: boolean;
}

interface Params {
  open: boolean;
  triggerElement: HTMLButtonElement | null;
  menuHeight?: number;
  gap?: number;
}

export function useOrderStatusDropdownPosition({
  open,
  triggerElement,
  menuHeight = 138,
  gap = 6,
}: Params) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    top: 0,
    openUpward: false,
  });

  useEffect(() => {
    if (!open || !triggerElement) return;

    const updatePosition = () => {
      const rect = triggerElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldOpenUpward =
        spaceBelow < menuHeight + gap && rect.top > menuHeight + gap;

      setPosition({
        left: rect.left + window.scrollX,
        top: shouldOpenUpward
          ? rect.top + window.scrollY - gap
          : rect.bottom + window.scrollY + gap,
        openUpward: shouldOpenUpward,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, triggerElement, menuHeight, gap]);

  return position;
}