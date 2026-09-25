"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView, useReducedMotion } from "motion/react";
import { AdditiveBlending, CanvasTexture, Color } from "three";
import type { BufferAttribute, Group, Points, PointsMaterial, Texture } from "three";

type Pointer = { x: number; y: number; active: boolean };

const LINES = ["JEFERSON", "FERNANDES"];
const LINE_HEIGHT = 150; // px no canvas de amostragem
const SAMPLE_STEP = 2; // px entre amostras; menor = mais partículas

// Linha do tempo da abertura (segundos)
const COMET_END = 1.1; // risco de luz cruzando a tela
const FORM_START = 2.2; // a nebulosa começa a se condensar no nome
const FORM_DURATION = 2.4;

// Física das letras
const SPRING = 0.03;
const DAMPING = 0.84;
const VORTEX_RADIUS = 0.9;
const VORTEX_FORCE = 0.045;

// Cores saturadas da nebulosa ao redor do nome
const NEBULA_COLORS = ["#ff3b5c", "#3b82f6", "#d946ef", "#f59e0b", "#8b5cf6", "#22d3ee"];

/** Textura de ponto redondo com borda suave (os pontos padrão são quadrados). */
function makeDotTexture(softness: number) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(softness, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/** Amostra gaussiana (Box-Muller), para a nebulosa ser densa no centro. */
function gaussian() {
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

/** Desenha o texto num canvas 2D e devolve as posições dos pixels preenchidos. */
function sampleText(worldWidth: number, fontFamily: string, step: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const setup = () => {
    ctx.font = `400 120px ${fontFamily}`;
    ctx.letterSpacing = "18px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
  };
  // Mede antes para o canvas caber o texto inteiro (redimensionar zera o contexto)
  setup();
  const textWidth = Math.max(...LINES.map((l) => ctx.measureText(l).width));
  canvas.width = Math.ceil(textWidth) + 40;
  canvas.height = LINE_HEIGHT * LINES.length + 40;
  setup();
  LINES.forEach((line, i) =>
    ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i - (LINES.length - 1) / 2) * LINE_HEIGHT)
  );

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scale = worldWidth / textWidth;
  const points: number[] = [];
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      if (data[(y * canvas.width + x) * 4 + 3] > 100) {
        points.push(
          (x - canvas.width / 2 + (Math.random() - 0.5) * step) * scale,
          -(y - canvas.height / 2 + (Math.random() - 0.5) * step) * scale,
          (Math.random() - 0.5) * 0.1
        );
      }
    }
  }
  return new Float32Array(points);
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/** Nebulosa colorida: um disco achatado visto de lado, balançando devagar. */
function Nebula({
  width,
  dot,
  animate,
  count,
}: {
  width: number;
  dot: Texture;
  animate: boolean;
  count: number;
}) {
  const group = useRef<Group>(null);
  const material = useRef<PointsMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = gaussian() * width * 0.3;
      positions[i * 3 + 1] = gaussian() * 0.6;
      positions[i * 3 + 2] = gaussian() * 0.7;
      c.set(NEBULA_COLORS[i % NEBULA_COLORS.length]).multiplyScalar(0.35 + Math.random() * 0.65);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [width, count]);

  useFrame(({ clock }) => {
    const t = animate ? clock.elapsedTime : 99;
    // Só balança: girar sem parar traria partículas para perto da câmera
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.12;
      group.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.03;
    }
    // Surge depois do cometa e perde força quando o nome se forma
    if (material.current) {
      material.current.opacity =
        smoothstep(COMET_END - 0.3, FORM_START, t) *
        (1 - 0.25 * smoothstep(FORM_START, FORM_START + FORM_DURATION, t));
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material}
          map={dot}
          size={0.045}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Partículas grandes e desfocadas em várias profundidades. */
function Bokeh({ width, soft }: { width: number; soft: Texture }) {
  const group = useRef<Group>(null);
  const { positions, colors } = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 1.3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = -1 - Math.random() * 4;
      c.set(i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#3b82f6" : "#d946ef").multiplyScalar(0.6);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [width]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.15;
    group.current.position.x = Math.cos(clock.elapsedTime * 0.15) * 0.2;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={soft}
          size={0.35}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Risco de luz que cruza a tela na abertura. */
function Comet({ width }: { width: number }) {
  const ref = useRef<Points>(null);
  const trail = 60;
  const positions = useMemo(() => new Float32Array(trail * 3), []);
  const colors = useMemo(() => {
    const colors = new Float32Array(trail * 3);
    for (let i = 0; i < trail; i++) {
      const f = 1 - i / trail;
      colors.set([f, f * 0.95, f * 0.85], i * 3);
    }
    return colors;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime / COMET_END;
    ref.current.visible = t < 1;
    if (t >= 1) return;
    // Diagonal do canto superior esquerdo em direção ao centro
    for (let i = 0; i < trail; i++) {
      const p = Math.max(t - i * 0.004, 0);
      positions[i * 3] = -width * 0.55 + p * width * 0.55;
      positions[i * 3 + 1] = 2.6 - p * 2.6;
      positions[i * 3 + 2] = 0;
    }
    (ref.current.geometry.attributes.position as BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

/** O nome em partículas brancas, que se forma a partir da nebulosa. */
function Wordmark({
  pointer,
  fontFamily,
  width,
  nebulaWidth,
  dot,
  animate,
  step,
}: {
  pointer: React.RefObject<Pointer>;
  fontFamily: string;
  width: number;
  nebulaWidth: number;
  dot: Texture;
  animate: boolean;
  step: number;
}) {
  const points = useRef<Points>(null);
  const viewport = useThree((s) => s.viewport);

  const { targets, positions, velocities, colors } = useMemo(() => {
    const targets = sampleText(width, fontFamily, step);
    const count = targets.length / 3;
    const positions = new Float32Array(targets.length);
    const colors = new Float32Array(targets.length);
    for (let i = 0; i < count; i++) {
      // Nasce espalhado dentro da nebulosa
      positions[i * 3] = animate ? gaussian() * nebulaWidth * 0.3 : targets[i * 3];
      positions[i * 3 + 1] = animate ? gaussian() * 0.6 : targets[i * 3 + 1];
      positions[i * 3 + 2] = animate ? gaussian() * 0.7 : targets[i * 3 + 2];
      // Branco com leve variação fria/quente
      const v = 0.85 + Math.random() * 0.15;
      colors.set([v * (0.95 + Math.random() * 0.05), v, v * (0.95 + Math.random() * 0.08)], i * 3);
    }
    return {
      targets,
      positions,
      velocities: new Float32Array(targets.length),
      colors,
    };
  }, [width, nebulaWidth, fontFamily, animate, step]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const step = Math.min(delta * 60, 2); // independente do FPS
    const t = animate ? state.clock.elapsedTime : 99;

    // Força da mola sobe aos poucos: a nebulosa se condensa no nome
    const form = smoothstep(FORM_START, FORM_START + FORM_DURATION, t);
    const spring = SPRING * form;

    // Onda de distorção que percorre o nome de tempos em tempos
    const sweep = ((t * 0.18) % 1.6 - 0.3) * width - width / 2;

    const { x, y, active } = pointer.current;
    const mx = (x * viewport.width) / 2;
    const my = (y * viewport.height) / 2;
    const r2 = VORTEX_RADIUS * VORTEX_RADIUS;

    for (let i = 0; i < positions.length; i += 3) {
      const tx = targets[i];
      const ty = targets[i + 1];

      // Distorção ambiente: desloca as letras perto da onda
      const d = tx - sweep;
      const band = Math.exp(-(d * d) / 0.35) * form;
      const warpX = band * Math.sin(ty * 9 + t * 3) * 0.12;
      const warpY = band * Math.cos(tx * 7 - t * 2) * 0.1;

      // Vórtice do mouse: gira as partículas ao redor do cursor
      if (active && form > 0.5) {
        const dx = positions[i] - mx;
        const dy = positions[i + 1] - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < r2 && dist2 > 0.0001) {
          const dist = Math.sqrt(dist2);
          const f = (1 - dist / VORTEX_RADIUS) * VORTEX_FORCE * step;
          velocities[i] += (-dy / dist) * f + (dx / dist) * f * 0.35;
          velocities[i + 1] += (dx / dist) * f + (dy / dist) * f * 0.35;
        }
      }

      const goal0 = tx + warpX;
      const goal1 = ty + warpY;
      const goal2 = targets[i + 2];
      velocities[i] += (goal0 - positions[i]) * spring * step;
      velocities[i + 1] += (goal1 - positions[i + 1]) * spring * step;
      velocities[i + 2] += (goal2 - positions[i + 2]) * spring * step;

      // Antes de formar, deriva junto com a nebulosa
      if (form < 1) {
        const swirl = (1 - form) * 0.002 * step;
        velocities[i] += -positions[i + 2] * swirl;
        velocities[i + 2] += positions[i] * swirl;
      }

      for (let k = 0; k < 3; k++) {
        velocities[i + k] *= DAMPING;
        positions[i + k] += velocities[i + k] * step;
      }
    }

    (points.current.geometry.attributes.position as BufferAttribute).needsUpdate = true;
  });

  return (
    // key força recriar a geometria quando o tamanho muda
    <points ref={points} key={targets.length}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={dot}
        size={0.042}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function Scene({
  pointer,
  fontFamily,
  animate,
  lite,
}: {
  pointer: React.RefObject<Pointer>;
  fontFamily: string;
  animate: boolean;
  lite: boolean;
}) {
  const viewport = useThree((s) => s.viewport);
  const width = Math.min(viewport.width * 0.82, 13);
  // Nome em duas linhas: em tela estreita (celular) ocupa quase toda a largura;
  // em tela larga fica limitado pela altura para não encostar nos textos
  const aspect = viewport.width / viewport.height;
  const wordWidth = Math.min(
    viewport.width * (aspect < 1.4 ? 0.88 : 0.45),
    viewport.height * 1.7,
    8
  );
  const dot = useMemo(() => makeDotTexture(0.45), []);
  const soft = useMemo(() => makeDotTexture(0.05), []);

  return (
    <>
      {animate && <Comet width={width} />}
      <Bokeh width={width} soft={soft} />
      <Nebula
        width={width}
        dot={dot}
        animate={animate}
        count={lite ? 3000 : 7000}
      />
      <Wordmark
        pointer={pointer}
        fontFamily={fontFamily}
        width={wordWidth}
        nebulaWidth={width}
        dot={dot}
        animate={animate}
        step={lite ? 3 : SAMPLE_STEP}
      />
    </>
  );
}

export default function HeroScene({ lite = false }: { lite?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });
  const reducedMotion = useReducedMotion();
  const [fontFamily, setFontFamily] = useState<string | null>(null);

  // Espera a Geist carregar para desenhar o texto com a fonte certa
  useEffect(() => {
    document.fonts.ready.then(() =>
      setFontFamily(getComputedStyle(document.body).fontFamily)
    );
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      active: true,
    };
  };
  const release = () => (pointer.current.active = false);

  return (
    <div
      ref={container}
      // pan-y: arrastar na horizontal mexe nas partículas, na vertical rola a página
      className="absolute inset-0 touch-pan-y"
      onPointerDown={handleMove}
      onPointerMove={handleMove}
      onPointerLeave={release}
      onPointerUp={(e) => e.pointerType !== "mouse" && release()}
      onPointerCancel={release}
      aria-hidden
    >
      {fontFamily && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop={inView && !reducedMotion ? "always" : "demand"}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene
            pointer={pointer}
            fontFamily={fontFamily}
            animate={!reducedMotion}
            lite={lite}
          />
        </Canvas>
      )}
    </div>
  );
}
