import React, { useRef, useState, useMemo } from "react";
import { vertexShader, fragmentShader } from "./shaders";
import { useFrame, Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import DatGui, { DatNumber, DatFolder } from "react-dat-gui";

export default function BlobWave() {
  const [settings, setsettings] = useState({
    speed: 0.2,
    density: 1.5,
    strength: 0.2,
    frequency: 3.0,
    amplitude: 6.0,
    intensity: 7.0,
  });
  const handleUpdate = (newData) =>
    setsettings((prevState) => ({
      ...prevState.data,
      ...newData,
    }));
  return (
    <>
      <DatGui data={settings} onUpdate={handleUpdate}>
        <DatFolder title="Noise" closed={false}>
          <DatNumber
            path="speed"
            label="speed"
            min={0.01}
            max={1}
            step={0.01}
          />
          <DatNumber
            path="density"
            label="density"
            min={0}
            max={10}
            step={0.01}
          />
          <DatNumber
            path="strength"
            label="strength"
            min={0}
            max={2}
            step={0.01}
          />
        </DatFolder>
        <DatFolder title="Rotation" closed={false}>
          <DatNumber
            path="frequency"
            label="frequency"
            min={0}
            max={10}
            step={0.1}
          />
          <DatNumber
            path="amplitude"
            label="amplitude"
            min={0}
            max={10}
            step={0.1}
          />
        </DatFolder>
        <DatFolder title="Color" closed={false}>
          <DatNumber
            path="intensity"
            label="intensity"
            min={0}
            max={10}
            step={0.1}
          />
        </DatFolder>
      </DatGui>
      <Canvas>
        <OrbitControls />
        <PerspectiveCamera
          fov={45}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
          position={[0, 0, 4]}
          makeDefault
        />
        <Scene settings={settings} />
      </Canvas>
    </>
  );
}

const Scene = ({ settings }) => {
  const material = useRef();
  const start = Date.now();

  useFrame(() => {
    material.current.uniforms.uTime.value = 0.00025 * (Date.now() - start);
    material.current.uniforms.uSpeed.value = settings.speed;
    material.current.uniforms.uNoiseDensity.value = settings.density;
    material.current.uniforms.uNoiseStrength.value = settings.strength;
    material.current.uniforms.uFrequency.value = settings.frequency;
    material.current.uniforms.uAmplitude.value = settings.amplitude;
    material.current.uniforms.uIntensity.value = settings.intensity;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
      uFrequency: { value: settings.frequency },
      uAmplitude: { value: settings.amplitude },
      uIntensity: { value: settings.intensity },
    }),
    [true]
  );

  return (
    <mesh>
      <icosahedronBufferGeometry attach="geometry" args={[1, 64]} />
      <shaderMaterial
        needsUpdate={true}
        attach="material"
        ref={material}
        uniforms={uniforms}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={false}
      />
    </mesh>
  );
};
