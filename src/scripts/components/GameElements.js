import React, {
  cloneElement,
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
import { Item } from "./Item.js";
import { Model } from "./Model.js";
import { Outline, EffectComposer } from "@react-three/postprocessing";
import { ExportGLTF } from "../generic/ExportGltf";
import { Draggable } from "../generic/Draggable";
import { Box2 } from "three";
import { urls } from "../constants/constants";
import { v4 } from "uuid";
// import create from "zustand";

// const useStore = create((set) => ({
//   target: null,
//   setTarget: (target) => set({ target })
// }));
function Base({ ...props }) {
  const { nodes } = useGLTF("/headless.glb");
  const edges = useMemo(
    () => new THREE.EdgesGeometry(nodes.Cube.geometry, 15),
    [nodes]
  );
  return (
    <group dispose={null} {...props}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial />
      </mesh>
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
}
function Box({ position, opacity }) {
  // const ref2 = useRef();
  // useEffect(() => {
  // if (props.selectedItem) props.selectedItem.current = ref.current;
  // });
  // useFrame(
  //   (state, delta) => (ref.current.rotation.x = ref.current.rotation.y += 0)
  // );
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial opacity={opacity} color="orange" transparent />
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
  const { mode } = useControls({
    mode: { value: "translate", options: ["translate", "rotate", "scale"] }
  });
  useControls({
    Export: buttonGroup({
      GLTF: (meshGroupRef) => {
        ExportGLTF(meshGroupRef);
      }
    })
  });
  useControls({
    Spawn: buttonGroup({
      Grill: () => {
        handleSpawn("Grill");
      },
      Astro: () => {
        handleSpawn("Astro");
      },
      Robo: () => {
        handleSpawn("Robo");
      },
      Craftsman: () => {
        handleSpawn("Craftsman");
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
  const spawnThis = useRef();
  // Setup Scene Initialisation
  useEffect(() => {
    // Update the document title using the browser API

    if (props.grabbing) spawnThis.current = props.grabbing;
    else if (spawnThis.current) handleSpawn("" + spawnThis.current);
    // setLookAtTarget(sphere);
    return () => {
      //Cleanup
    };
  }, [props.grabbing]);

  const spawnURL = useRef();
  const [spawnCount, setSpawnCount] = useState([]);

  const handleSpawn = useCallback((e) => {
    setSpawnCount((spawnCounts) => [
      ...spawnCounts,
      { url: urls[e].url, uuid: v4(), scale: urls[e].scale }
    ]);
  }, []);

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
      <Base scale={2} position={[0, 1, 0]} />
      <group ref={parentSpawner}>
        {spawnCount.map((key, index) => (
          <Draggable key={key.uuid} {...dragProps}>
            <Item
              key={key.uuid}
              url={key.url}
              uuid={key.uuid}
              scale={key.scale}
              pivotY={key.pivotY}
              position={[-1, -1, 4 + index * 2]}
            />
          </Draggable>
        ))}
      </group>

      <Box position={leftPos} opacity={leftOpacity} />
      <Box position={rightPos} opacity={rightOpacity} />

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
