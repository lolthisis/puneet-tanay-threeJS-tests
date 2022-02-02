import { exportGLTF } from "../generic/exportGltf";
import { Html } from "@react-three/drei";

const ScreenSpaceUI = ({ ...props }) => {
  return (
    <Html>
      <button
        type="button"
        onClick={() => exportGLTF(props.meshGroupRef.current)}
      >
        Export GLTF!
      </button>
    </Html>
  );
};

export { ScreenSpaceUI };
