import React, { useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { useFrame } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  Loader,
  OrbitControls,
  useTexture,
  PerspectiveCamera,
} from "@react-three/drei";

export default function Blob() {
  const start = Date.now();
  const mesh = useRef();
  const textureMap = useTexture("/explosion.png");
  const uniform = {
    tExplosion: {
      type: "t",
      value: textureMap,
    },
    time: {
      // float initialized to 0
      type: "f",
      value: 0.0,
    },
  };

  useFrame(() => (uniform["time"].value = .00025 * (Date.now() - start)));

  return (
    <mesh ref={mesh}>
      <icosahedronBufferGeometry attach="geometry" args={[20, 4]} />
      {/* <meshBasicMaterial color="orange" wireframe={true} /> */}
      <shaderMaterial
        uniforms={uniform}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={false}
      />
    </mesh>
  );
}
