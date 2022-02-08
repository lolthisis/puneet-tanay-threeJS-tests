import { Suspense, useEffect, useRef } from "react";
import { Model } from "./Model";
import { Box } from "@react-three/drei";
const Item = ({ ...props }) => {
  return <Model key={props.uuid} {...props} />;
};

export { Item };
