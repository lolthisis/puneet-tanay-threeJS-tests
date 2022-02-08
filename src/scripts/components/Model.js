import { Box, useGLTF } from "@react-three/drei";
import * as three from "three";
import {} from "@react-three/fiber";
import { useState, useEffect, useMemo, useRef, Suspense } from "react";

const Model = ({ ...props }) => {
  const gltf = useGLTF("" + props.url);
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const [visibleBox, setVisibleBox] = useState(false);
  useEffect(() => {
    let bb = new three.Box3().setFromObject(ref.current);
    let size = bb.getSize(new three.Vector3());
    if (ref1.current) {
      ref1.current.scale.x = size.x;
      ref1.current.scale.y = size.y;
      ref1.current.scale.z = size.z;
      ref1.current.position.y += size.y / 2; // * props.pivotY;
    }
    if (ref2.current) {
      ref2.current.scale.x = size.x;
      ref2.current.scale.y = size.y;
      ref2.current.scale.z = size.z;
      ref2.current.position.y += size.y / 2; // * props.pivotY;
    }
  }, [gltf]);

  return (
    <Suspense
      fallback={
        <mesh ref={ref2} position={props.position} castShadow={false}>
          <boxGeometry />
          <meshStandardMaterial opacity={0.3} color="blue" transparent />
        </mesh>
      }
    >
      <primitive
        ref={ref}
        dispose={null}
        object={gltf.scene.clone()}
        onPointerOver={() => setVisibleBox(true)}
        onPointerOut={() => setVisibleBox(false)}
        {...props}
      />

      <mesh ref={ref1} position={props.position} castShadow={false}>
        <boxGeometry />
        <meshStandardMaterial
          opacity={visibleBox ? 0.3 : 0}
          color="orange"
          transparent
        />
      </mesh>
    </Suspense>
  );
};

export { Model };
