import { useState } from "react";
import type { RefObject } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export const useSticky = <T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>, top: number) => {
  const [isSticky, setIsSticky] = useState(false);

  useScrollPosition(
    ({ currPos }) => {
      const sticky = currPos.y > top;
      if (sticky !== isSticky) setIsSticky(sticky);
    },
    [isSticky],
    ref,
    true
  );

  return { isSticky };
};
