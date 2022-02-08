import { Suspense, useEffect, useRef } from "react";
import { Model } from "./Model";
import { Box } from "@react-three/drei";
const Item = ({ ...props }) => {
  return (
    <Suspense fallback={<Box />}>
      <Model key={props.uuid} {...props} />
    </Suspense>
  );
};

export { Item };
