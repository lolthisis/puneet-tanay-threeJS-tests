// Import Sytles
import "../styles.css";
import React, { Suspense, useState } from "react";

// Import App Modules
import { Environment, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { ScreenSpaceUI } from "./components/ScreenSpaceUI";

export default function App() {
  const [grabbing, setGrabbing] = useState(false);
  return (
    <>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene grabbing={grabbing} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <ScreenSpaceUI setGrabbing={setGrabbing} />

      {/* https://docs.pmnd.rs/drei/loaders/loader */}
      <Loader />
    </>
  );
}
