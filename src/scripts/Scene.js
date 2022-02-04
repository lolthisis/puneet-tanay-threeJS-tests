import { Root } from "./Root";

const Scene = ({ ...props }) => {
  return (
    <>
      <Root grabbing={props.grabbing} />
    </>
  );
};

export { Scene };
