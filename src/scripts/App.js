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
// import { config } from "./config";

const collectionPath = "TEST_NAMESPACE/user_bookmarks/";
const testDocValue = {
  nowOnCli: Date.now(),
  nowOnServer: 1234,
  some: "data"
};

export default function App() {
  const [grabbing, setGrabbing] = useState(false);
  const [keys, setKeys] = useState([]);
  return (
    <>
      {/* <FirebaseDatabaseProvider firebase={firebase} {...config}> */}
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Root grabbing={grabbing} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <ScreenSpaceUI setGrabbing={setGrabbing} />

      {/* https://docs.pmnd.rs/drei/loaders/loader */}
      {/* <Loader /> */}
      {/* <FirebaseDatabaseMutation path={collectionPath} type="push">
          {({ runMutation }) => (
            <button
              data-testid="add-document"
              onClick={async () => {
                const { key } = await runMutation(testDocValue);
                if (key === null || typeof key === "undefined") return;
                setKeys((key) => [...keys, key]);
                // this.setState((state) => ({
                //   keys: [...keys, key]
                // }));
              }}
            >
              add-document-with-generated-key
            </button>
          )}
        </FirebaseDatabaseMutation>
      </FirebaseDatabaseProvider> */}
    </>
  );
}
