import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { GameElements } from "./components/GameElements";

const Root = ({ ...props }) => {
  return (
    <>
      <GameElements grabbing={props.grabbing} />
      <Lights />
      <Camera />
    </>
  );
};

export { Root };
