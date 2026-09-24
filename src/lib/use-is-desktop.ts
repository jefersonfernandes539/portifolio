"use client";

import { useEffect, useState } from "react";

/**
 * true em telas grandes com mouse. Os efeitos WebGL e o cursor customizado
 * só rodam nesse caso: no celular não há hover e economiza bateria.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
