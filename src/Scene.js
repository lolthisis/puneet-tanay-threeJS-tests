import React, { useEffect, useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { exportGLTF } from "./exportGltf";
import {
  Html,
  Sphere,
  RoundedBox,
  OrbitControls,
  useTexture,
  useMatcapTexture
} from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";

const Character = ({ ...props }) => {
  const roundedBox = useRef();
  useEffect(() => {
    roundedBox.current.rotation.y = props.sceneRotation;
  }, [props.sceneRotation]);

  return (
    <RoundedBox
      args={[1, 1, 1]}
      radius={0.2}
      smoothness={4}
      // position={(0, 5, 0)}
      ref={roundedBox}
      position={props.position}
    >
      <meshLambertMaterial
        attach="material"
        map={props.textureResources.DIFF}
      />
    </RoundedBox>
  );
};

const Scene = () => {
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
  const [hovered, setSphereHover] = useState(false);

  const box = useRef();

  // Setup Scene Initialisation
  useEffect(() => {
    // Update the document title using the browser API
    console.log("init");
    box.current.position.x += 2.0;
  }, []);

  useEffect(() => {
    // roundedBox.current.rotation.y = sceneRotation;
    if (hovered) box.current.rotation.z = sceneRotation;
  }, [sceneRotation]);

  const [spawnCount, setSpawnCount] = useState([]);
  const handleClick = useCallback(
    (e) => setSpawnCount((spawnCounts) => [...spawnCounts, uuidv4()]),
    []
  );

  // Setup Per Frame Update
  useFrame((delta, time) => {
    setSceneRotation(sceneRotation + 0.01);
  });
  const meshGroupRef = useRef();
  return (
    <>
      <Html>
        <button type="button" onClick={() => exportGLTF(meshGroupRef.current)}>
          Export GLTF!
        </button>
      </Html>
      <group name="GEOMETRIES" ref={meshGroupRef}>
        {spawnCount.map((key, index) => (
          <Character
            key={key}
            sceneRotation={sceneRotation}
            textureResources={CHARACTER_TEXTURES}
            position={[0, -4 + index * 1, 0]}
          />
        ))}

        <Sphere
          args={[1, 22, 22]}
          radius={0.05}
          smoothness={4}
          ref={box}
          onClick={handleClick}
          onPointerEnter={() => {
            setSphereHover(true);
          }}
          onPointerLeave={() => {
            setSphereHover(false);
          }}
        >
          <meshLambertMaterial
            map={CHARACTER_TEXTURES.NORMAL}
            attach="material"
          />
        </Sphere>
        {/* <Sphere args={[1, 22, 22]}>
          <meshMatcapMaterial matcap={matcap} />
        </Sphere> */}
      </group>

      <group name="LIGHTS">
        <ambientLight />
      </group>

      <group name="CAMERAS">
        <OrbitControls />
      </group>
    </>
  );
};

export { Scene };
