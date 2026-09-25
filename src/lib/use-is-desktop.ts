"use client";

import { useEffect, useState } from "react";

/**
 * true em telas grandes com mouse. O cursor customizado só aparece nesse caso.
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

/**
 * Capacidade gráfica do aparelho.
 * - webgl: null até checar no navegador, depois true/false
 * - lite: celulares e tablets, que recebem menos partículas
 */
export function useGraphics() {
  const [state, setState] = useState<{ webgl: boolean | null; lite: boolean }>(
    { webgl: null, lite: false }
  );

  useEffect(() => {
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const lite =
      window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches;
    setState({ webgl, lite });
  }, []);

  return state;
}
