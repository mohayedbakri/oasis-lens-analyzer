import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { Unit, UnitType } from "@/lib/poc-data";
import { statusColor, statusLabelAr } from "./status";

// Procedural per-type geometry. Designed to be swapped later for AI-generated
// GLB models (loaded with useGLTF) without changing the call sites.
function unitGeometry(type: UnitType) {
  switch (type) {
    case "silo":
      return <cylinderGeometry args={[0.6, 0.6, 2.2, 24]} />;
    case "mill":
      return <boxGeometry args={[1.8, 1.4, 1.4]} />;
    case "packaging":
      return <boxGeometry args={[2.2, 1.0, 1.2]} />;
    case "admin":
      return <boxGeometry args={[1.6, 1.2, 1.6]} />;
    case "training":
      return <boxGeometry args={[1.6, 1.0, 1.2]} />;
    case "energy":
      return <boxGeometry args={[2.4, 0.15, 1.4]} />;
  }
}

function unitHeight(type: UnitType) {
  switch (type) {
    case "silo": return 1.1;
    case "mill": return 0.7;
    case "packaging": return 0.5;
    case "admin": return 0.6;
    case "training": return 0.5;
    case "energy": return 0.08;
  }
}

function UnitMesh({ unit, onClick }: { unit: Unit; onClick: (u: Unit) => void }) {
  const ref = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);
  const color = statusColor[unit.status];

  useFrame((_, dt) => {
    if (ref.current && unit.status === "in_progress") {
      ref.current.rotation.y += dt * 0.15;
    }
  });

  return (
    <group position={[unit.x, unitHeight(unit.type), unit.z]}>
      <mesh
        ref={ref}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onClick(unit);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "default";
        }}
      >
        {unitGeometry(unit.type)}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hover ? 0.6 : unit.status === "in_progress" ? 0.3 : 0.05}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {hover && (
        <Html distanceFactor={10} center>
          <div className="pointer-events-none whitespace-nowrap rounded-md bg-background/95 px-2 py-1 text-xs font-medium text-foreground shadow-lg ring-1 ring-border">
            {unit.name_ar} · {statusLabelAr[unit.status]}
          </div>
        </Html>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#e8dec8" roughness={1} />
    </mesh>
  );
}

function Fallback2D({ units, onClick }: { units: Unit[]; onClick: (u: Unit) => void }) {
  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="-10 -10 20 20" className="h-full w-full max-w-md">
        <rect x="-10" y="-10" width="20" height="20" fill="#e8dec8" />
        {units.map((u) => (
          <g key={u.id} onClick={() => onClick(u)} style={{ cursor: "pointer" }}>
            <circle cx={u.x} cy={u.z} r="1.2" fill={statusColor[u.status]} />
            <text x={u.x} y={u.z + 2.2} textAnchor="middle" fontSize="0.9" fill="#333">
              {u.name_ar}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Complex3D({
  units,
  onSelect,
}: {
  units: Unit[];
  onSelect: (u: Unit) => void;
}) {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-card">
      <Suspense fallback={<Fallback2D units={units} onClick={onSelect} />}>
        <Canvas
          shadows
          camera={{ position: [8, 8, 10], fov: 45 }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#f3ead6"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 12, 6]} intensity={1.1} castShadow />
          <Ground />
          {units.map((u) => (
            <UnitMesh key={u.id} unit={u} onClick={onSelect} />
          ))}
          <OrbitControls
            enablePan
            minDistance={6}
            maxDistance={22}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute bottom-3 start-3 flex flex-wrap gap-2 text-xs">
        {(["planned", "in_progress", "done", "blocked"] as const).map((s) => (
          <span
            key={s}
            className="flex items-center gap-1.5 rounded-full bg-background/90 px-2 py-1 shadow-sm ring-1 ring-border"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: statusColor[s] }} />
            {statusLabelAr[s]}
          </span>
        ))}
      </div>
    </div>
  );
}
