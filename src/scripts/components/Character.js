import React, { useEffect, useRef, useState } from "react";
import { RoundedBox, useCursor } from "@react-three/drei";

const Character = ({ ...props }) => {
  const roundedBox = useRef();
  useEffect(() => {
    roundedBox.current.rotation.y = props.sceneRotation;
  }, [props.sceneRotation]);
  const [hovered, setHovered] = useState(false);

  return (
    <RoundedBox
      args={[1, 1, 1]}
      radius={0.2}
      smoothness={4}
      // position={(0, 5, 0)}
      ref={roundedBox}
      position={props.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => props.setTarget(e.object)}
    >
      <meshLambertMaterial
        attach="material"
        map={props.textureResources.DIFF}
      />
    </RoundedBox>
  );
};

export { Character };
