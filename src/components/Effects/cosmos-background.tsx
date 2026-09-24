"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { AdditiveBlending, Color } from "three";
import type { Group } from "three";
import { randomParticleColor } from "./palette";

const LAYERS = [
  { count: 1800, depth: [-30, -8], size: 0.07, speed: 0.004 },
  { count: 500, depth: [-8, -2], size: 0.045, speed: 0.01 },
];

function Layer({
  count,
  depth,
  size,
  speed,
}: (typeof LAYERS)[number]) {
  const group = useRef<Group>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new Color();
    for (let i = 0; i < count; i++) {
      const z = depth[0] + Math.random() * (depth[1] - depth[0]);
      // Espalha mais na horizontal, como uma faixa de galáxia
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = z;
      randomParticleColor(c).multiplyScalar(0.5 + Math.random() * 0.5);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count, depth]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * speed;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Câmera desce com o scroll e acompanha levemente o mouse (parallax). */
function Rig() {
  const target = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    const onScroll = () => {
      target.current.scroll = window.scrollY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(({ camera }) => {
    const { x, y, scroll } = target.current;
    camera.position.x += (x - camera.position.x) * 0.03;
    camera.position.y += (-y - scroll * 2.5 - camera.position.y) * 0.05;
  });

  return null;
}

export default function CosmosBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        {LAYERS.map((layer, i) => (
          <Layer key={i} {...layer} />
        ))}
        <Rig />
      </Canvas>
    </div>
  );
}
