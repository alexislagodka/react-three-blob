import React from "react";
import "./App.css";
import BlobWave from "./BlobWave/BlobWave";
import Blob from "./Blob/Blob";
import Box from "./Box/Box";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

export default function App() {
  return (
    <>
      <section>
        <BlobWave />
      </section>
      {/* <section>
        <Canvas camera={{ zoom: 3, position: [0, 0, 100] }}>
        <Canvas>
          <PerspectiveCamera
            fov={30}
            position={[0, 0, 100]}
            near={window.innerWidth / window.innerHeight}
            far={10000}
            makeDefault
          />
          <Blob />
        </Canvas>
      </section>
      <section>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </section> */}
    </>
  );
}
