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
  useCursor,
  MeshWobbleMaterial
} from "@react-three/drei";
import { useControls, buttonGroup } from "leva";
import { v4 as uuidv4 } from "uuid";
import { ScreenSpaceUI } from "./ScreenSpaceUI.js";
import { Outline, EffectComposer } from "@react-three/postprocessing";
import { ExportGLTF } from "../generic/ExportGltf";
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
        <meshStandardMaterial />
      </mesh>
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
}
function Box({ onHover, ...props }) {
  const ref = useRef();
  useEffect(() => {
    if (props.selectedItem) props.selectedItem.current = ref.current;
  });
  // useFrame(
  //   (state, delta) => (ref.current.rotation.x = ref.current.rotation.y += 0)
  // );
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshStandardMaterial
        opacity={props.opacity}
        color="orange"
        transparent
      />
    </mesh>
  );
}
function distance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
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
  const leftPlacement = useRef();
  const rightPlacement = useRef();
  const leftPlacementMat = useRef();
  const rightPlacementMat = useRef();
  const selectedItem = useRef();
  const parentSpawner = useRef();
  const box1 = useRef();
  const box2 = useRef();

  const { mode } = useControls({
    mode: { value: "translate", options: ["translate", "rotate", "scale"] }
  });
  useControls({
    " ": buttonGroup({
      Spawn: () => {
        handleSpawn();
      },
      "Export GLTF": (meshGroupRef) => {
        ExportGLTF(meshGroupRef);
      }
    })
  });

  const [target, setTarget] = useState(null);
  const [lookAtTarget, setLookAtTarget] = useState(null);
  const [hovered, onHover] = useState(null);
  const [nearleft, setNearLeft] = useState(false);
  const [leftOpacity, setLeftOpacity] = useState(0);
  const [rightOpacity, setRightOpacity] = useState(0);
  const [leftPos, setLeftPos] = useState([1.3, 0.15, 1.3]);
  const [rightPos, setRightPos] = useState([1.3, 0.15, -1.3]);
  const selected = hovered ? [hovered] : undefined;

  // Setup Scene Initialisation
  useEffect(() => {
    // Update the document title using the browser API
    console.log("init");
    setLookAtTarget(sphere);
    return () => {
      //Cleanup
    };
  }, [props.grabbing]);

  // useEffect(() => {
  //   if (transform.current) {
  //     const controls = transform.current;
  //     controls.setMode(mode);
  //     const callback = (event) => (orbit.current.enabled = !event.value);
  //     controls.addEventListener("dragging-changed", callback);
  //     return () => controls.removeEventListener("dragging-changed", callback);
  //   }
  // });
  var i = 0;
  const [spawnCount, setSpawnCount] = useState([]);
  // const [spawnedPos, setSpawnedPos] = useState([]);
  const handleSpawn = useCallback((e) => {
    i++;
    // setSpawnedPos((spawnedPos) => [...spawnedPos, e]);
    setSpawnCount((spawnCounts) => [...spawnCounts, i]);
  }, []);

  var q = new THREE.Quaternion(),
    p = new THREE.Vector3();
  p.set(0, 0, 5.5);
  q.identity();

  // Setup Per Frame Update
  useFrame((state, dt, delta, time) => {
    // console.log(spawnCount.map(key, 1));
    if (!hovered) {
      // state.camera.forward.lookAt(lookAtTarget.position);
      // state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt));
      // state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt));
    }
    // if (selectedItem.current) {
    //   var pos = selectedItem.current.getWorldPosition();
    //   var leftDist = distance(pos, {
    //     x: leftPos[0],
    //     y: leftPos[1],
    //     z: leftPos[2]
    //   });
    //   var rightDist = distance(pos, {
    //     x: rightPos[0],
    //     y: rightPos[1],
    //     z: rightPos[2]
    //   });

    //   setNearLeft(leftDist < rightDist);
    // }
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

      <group ref={parentSpawner}>
        {spawnCount.map((key, index) => (
          <Draggable {...dragProps}>
            <Character
              key={key}
              sceneRotation={sceneRotation}
              textureResources={CHARACTER_TEXTURES}
              position={[-4, -1 + index * 1, 0]}
              setTarget={setTarget}
              onHover={onHover}
            />
          </Draggable>
        ))}
      </group>

      {/* <Draggable {...dragProps}> */}
      <Box
        ref={box1}
        position={leftPos}
        opacity={leftOpacity}
        onPointerUp={() => {
          // setLeftOpacity(0);
          // if (box1.current) box1.current.position = leftPos;
        }}
      />
      {/* </Draggable> */}
      {/* <Draggable {...dragProps}> */}
      <Box
        ref={box2}
        position={rightPos}
        opacity={rightOpacity}
        onPointerUp={() => {
          // setRightOpacity(0);
          // if (box2.current) box2.current.position = rightPos;
        }}
      />
      {/* </Draggable> */}
      {/* {target && (
        <TransformControls ref={transform} object={target} mode={mode} />
      )} */}
      <Draggable {...dragProps}>
        <Sphere
          args={[1, 22, 22]}
          radius={0.05}
          smoothness={4}
          position={[0.3, 0.5, 0]}
          ref={sphere}
          onPointerOver={() => {
            onHover(sphere);
          }}
          onPointerOut={() => {
            onHover(null);
          }}
        >
          <meshLambertMaterial
            map={CHARACTER_TEXTURES.NORMAL}
            attach="material"
          />
        </Sphere>
      </Draggable>
      {/* <Draggable {...dragProps}>
        <mesh ref={selectedItem} position={[0, 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Draggable> */}

      {props.grabbing && (
        <>
          <mesh
            ref={leftPlacement}
            onPointerUp={() => {
              setLeftOpacity(1);
            }}
            onPointerEnter={() => {
              console.log(leftOpacity);
              if (leftOpacity !== 0) return;
              if (leftPlacementMat.current)
                leftPlacementMat.current.opacity = 0.9;
            }}
            onPointerLeave={() => {
              if (leftOpacity !== 0) return;
              if (leftPlacementMat.current)
                leftPlacementMat.current.opacity = 0.55;
            }}
            position={leftPos}
          >
            <boxGeometry />
            <meshLambertMaterial
              ref={leftPlacementMat}
              color="lightblue"
              opacity={leftOpacity !== 0 ? 0 : 0.55}
              transparent
            />
          </mesh>
          <mesh
            ref={rightPlacement}
            position={rightPos}
            onPointerUp={() => {
              setRightOpacity(1);
            }}
            onPointerEnter={() => {
              if (rightOpacity !== 0) return;
              if (rightPlacementMat.current)
                rightPlacementMat.current.opacity = 0.9;
            }}
            onPointerLeave={() => {
              if (rightOpacity !== 0) return;
              if (rightPlacementMat.current)
                rightPlacementMat.current.opacity = 0.55;
            }}
          >
            <boxGeometry />
            <meshBasicMaterial
              ref={rightPlacementMat}
              color="lightblue"
              opacity={rightOpacity !== 0 ? 0 : 0.55}
              transparent
            />
          </mesh>
        </>
      )}

      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          blur
          selection={selected}
          visibleEdgeColor="white"
          edgeStrength={50}
          width={500}
        />
      </EffectComposer>

      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        doublePass
        opacity={0.3}
        width={20}
        height={20}
        blur={1}
        far={1}
        resolution={1024}
      />
      <OrbitControls enabled={!drag} />
    </group>
  );
};

export { GameElements };
