import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { GameElements } from "./components/GameElements";

const Root = ({ ...props }) => {
  return (
    <>
      <GameElements {...props} />
      <Lights />
      <Camera />
    </>
  );
};

export { Root };
