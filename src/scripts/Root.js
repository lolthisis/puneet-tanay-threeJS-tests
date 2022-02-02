import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { GameElements } from "./components/GameElements";

const Root = () => {
  return (
    <>
      <GameElements />
      <Lights />
      <Camera />
    </>
  );
};

export { Root };
