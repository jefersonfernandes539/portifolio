import { Color } from "three";

// Cores das partículas: maioria branca, com toques de azul, violeta, rosa e âmbar
const weighted: [string, number][] = [
  ["#ffffff", 0.5],
  ["#5ab4f0", 0.2],
  ["#a78bfa", 0.12],
  ["#f472b6", 0.08],
  ["#f5c46b", 0.1],
];

export function randomParticleColor(target: Color) {
  let r = Math.random();
  for (const [hex, weight] of weighted) {
    if ((r -= weight) <= 0) return target.set(hex);
  }
  return target.set(weighted[0][0]);
}
