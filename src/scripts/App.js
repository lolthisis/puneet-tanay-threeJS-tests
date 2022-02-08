// Import Sytles
import "../styles.css";
import React, { Suspense, useState } from "react";

// Import App Modules
import { Environment, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Root } from "./Root";
import { ScreenSpaceUI } from "./components/ScreenSpaceUI";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import * as firebase from "firebase/app";
import { config } from "./config";

export default function App() {
  const [grabbing, setGrabbing] = useState(false);

  return (
    <>
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Root grabbing={grabbing} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        <ScreenSpaceUI setGrabbing={setGrabbing} />

        {/* https://docs.pmnd.rs/drei/loaders/loader */}
        {/* <Loader /> */}
      </FirebaseDatabaseProvider>
    </>
  );
}
