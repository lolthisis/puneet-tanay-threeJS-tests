import React, { useEffect, useRef, useState } from "react";
import { RoundedBox, useCursor } from "@react-three/drei";
import { useCube } from "@react-three/cannon";

const Character = ({ ...props }) => {
  const roundedBox = useRef();
  useEffect(() => {
    roundedBox.current.rotation.y = props.sceneRotation;
  }, [props.sceneRotation]);
  const [hovered, setHovered] = useState(false);

  return (
    <RoundedBox
      name={props.name}
      args={[1, 1, 1]}
      radius={0.2}
      smoothness={4}
      // position={(0, 5, 0)}
      ref={roundedBox}
      position={props.position}
      onPointerOver={(e) => {
        // props.onHover(roundedBox);
        setHovered(true);
      }}
      onPointerOut={() => {
        // props.onHover(null);
        setHovered(false);
      }}
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
