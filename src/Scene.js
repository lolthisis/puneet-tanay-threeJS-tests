import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Sphere,
  RoundedBox,
  OrbitControls,
  useTexture,
  useMatcapTexture
} from "@react-three/drei";

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
  const [sceneRotation, setSceneRotation] = useState(0);

  const box = useRef();

  // Setup Scene Initialisation
  useEffect(() => {
    // Update the document title using the browser API
    console.log("init");
    box.current.position.x += 2.0;
  }, []);

  useEffect(() => {
    // roundedBox.current.rotation.y = sceneRotation;
    box.current.rotation.z = sceneRotation;
  }, [sceneRotation]);

  // Setup Per Frame Update
  useFrame((delta, time) => {
    setSceneRotation(sceneRotation + 0.01);
  });

  return (
    <>
      <group name="GEOMETRIES">
        <Character
          sceneRotation={sceneRotation}
          textureResources={CHARACTER_TEXTURES}
        />
        <Sphere args={[1, 22, 22]} radius={0.05} smoothness={4} ref={box}>
          <meshLambertMaterial
            map={CHARACTER_TEXTURES.DIFF}
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
