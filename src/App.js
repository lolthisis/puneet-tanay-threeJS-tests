// Import Sytles
import "./styles.css";
import React, { Suspense } from "react";

// Import App Modules
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene.js";

export default function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* https://docs.pmnd.rs/drei/loaders/loader */}
      <Loader />
    </>
  );
}
