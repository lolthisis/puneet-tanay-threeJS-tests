import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Character } from "./Character.js";
import {
  Html,
  Sphere,
  RoundedBox,
  OrbitControls,
  useTexture,
  useMatcapTexture,
  ContactShadows,
  TransformControls,
  useGLTF,
  useCursor
} from "@react-three/drei";
import { useControls, buttonGroup } from "leva";
import { v4 as uuidv4 } from "uuid";
import { ScreenSpaceUI } from "./ScreenSpaceUI.js";
import { Outline, EffectComposer } from "@react-three/postprocessing";
import { exportGLTF } from "../generic/exportGltf";
import { Draggable } from "../generic/Draggable";

// import create from "zustand";

// const useStore = create((set) => ({
//   target: null,
//   setTarget: (target) => set({ target })
// }));
function Model() {
  const { nodes } = useGLTF("/headless.glb");
  const edges = useMemo(
    () => new THREE.EdgesGeometry(nodes.Cube.geometry, 15),
    [nodes]
  );
  return (
    <group dispose={null} scale={2} position={[0, 1, 0]}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial transparent />
      </mesh>
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
}
function Box({ onHover, ...props }) {
  const ref = useRef();
  useFrame(
    (state, delta) => (ref.current.rotation.x = ref.current.rotation.y += 0)
  );
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={(e) => onHover(ref)}
      onPointerOut={(e) => onHover(null)}
    >
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
const GameElements = ({ ...props }) => {
  // In here it could load textures, images, triangulate textgeometry, etc
  // The line below produces a fake load, emulating loading assets/set-up processing
  // usePromise((ms) => new Promise((res) => setTimeout(res, ms)), [1000]);

  // Load Resources
  // https://www.npmjs.com/package/@react-three/drei#usetexture
  const CHARACTER_TEXTURES = {
    DIFF: useTexture("./aerial_rocks_02_diff_2k.jpg"),
    NORMAL: useTexture("./aerial_rocks_02_nor_gl_2k.jpg"),
    ROUGHNESS: useTexture("./aerial_rocks_02_rough_2k.jpg")
  };

  const [matcap] = useMatcapTexture("161B1F_C7E0EC_90A5B3_7B8C9B");

  // Setup Scene References
  const [sceneRotation, setSceneRotation] = useState(1);
  // const [mode, setMode] = useState(null);

  const meshGroupRef = useRef();
  const sphere = useRef();
  const transform = useRef();
  const orbit = useRef();

  const { mode } = useControls({
    mode: { value: "translate", options: ["translate", "rotate", "scale"] }
  });
  useControls({
    " ": buttonGroup({
      Spawn: () => {
        handleSpawn();
      },
      "Export GLTF": (meshGroupRef) => {
        exportGLTF(meshGroupRef);
      }
    })
  });

  const [target, setTarget] = useState(null);
  const [lookAtTarget, setLookAtTarget] = useState(null);
  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

  // Setup Scene Initialisation
  useEffect(() => {
    // Update the document title using the browser API
    console.log("init");
    setLookAtTarget(sphere);
    return () => {
      //Cleanup
    };
  }, []);

  // useEffect(() => {
  //   if (transform.current) {
  //     const controls = transform.current;
  //     controls.setMode(mode);
  //     const callback = (event) => (orbit.current.enabled = !event.value);
  //     controls.addEventListener("dragging-changed", callback);
  //     return () => controls.removeEventListener("dragging-changed", callback);
  //   }
  // });

  const [spawnCount, setSpawnCount] = useState([]);
  const handleSpawn = useCallback(
    (e) => setSpawnCount((spawnCounts) => [...spawnCounts, uuidv4()]),
    []
  );

  var q = new THREE.Quaternion(),
    p = new THREE.Vector3();
  p.set(0, 0, 5.5);
  q.identity();

  // Setup Per Frame Update
  useFrame((state, dt, delta, time) => {
    if (!hovered) {
      // state.camera.forward.lookAt(lookAtTarget.position);
      // state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt));
      // state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt));
    }
  });

  const [drag, setDrag] = useState(false);
  const dragProps = {
    onDragStart: () => setDrag(true),
    onDragEnd: () => setDrag(false)
  };

  return (
    <group name="GEOMETRIES" ref={meshGroupRef}>
      {/* <OrbitControls ref={orbit} /> */}
      <Model>
        {/* <Html distanceFactor={10} position={[1, 7, 1]}>
          <div class="content">View</div>
        </Html> */}
      </Model>

      {spawnCount.map((key, index) => (
        <Draggable {...dragProps}>
          <Character
            key={key}
            sceneRotation={sceneRotation}
            textureResources={CHARACTER_TEXTURES}
            position={[-4, -1 + index * 1, 0]}
            setTarget={setTarget}
          />
        </Draggable>
      ))}

      {/* {target && (
        <TransformControls ref={transform} object={target} mode={mode} />
      )} */}

      <Sphere
        args={[1, 22, 22]}
        radius={0.05}
        smoothness={4}
        position={[0.3, 0.5, 0]}
        ref={sphere}
      >
        <Html
          scale={1}
          // distanceFactor={10}
          position={[-1, 1, 1]}
          // transform
          // occlude
        >
          <div className="annotation">View</div>
        </Html>
        <meshLambertMaterial
          map={CHARACTER_TEXTURES.NORMAL}
          attach="material"
        />
      </Sphere>
      <Draggable {...dragProps}>
        <Box onHover={onHover} position={[0, 3, 0]} />
      </Draggable>

      {/* <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          blur
          selection={selected}
          visibleEdgeColor="green"
          edgeStrength={50}
          width={500}
        />
      </EffectComposer> */}
      {/* <Sphere args={[1, 22, 22]}>
    <meshMatcapMaterial matcap={matcap} />
  </Sphere> */}
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1, 0]}
        opacity={0.75}
        width={20}
        height={20}
        blur={2.6}
        far={1}
        resolution={128}
      />
      <OrbitControls enabled={!drag} />
    </group>
  );
};

export { GameElements };
