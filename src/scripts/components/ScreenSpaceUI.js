import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const ScreenSpaceUI = ({ ...props }) => {
  const itemRef = useRef();
  const cursorImgRef = useRef();
  const root = useRef();
  const [grabbing, setGrabbing] = useState(false);

  function OnMouseMove(e) {
    // console.log("move");
    // if (!grabbing) return;
    let left = e.x - 20;
    let top = e.y - 20;
    if (cursorImgRef.current) {
      cursorImgRef.current.style.left = left + "px";
      cursorImgRef.current.style.top = top + "px";
    }
  }
  function resetCursorImg() {
    if (root.current) root.current.style.cursor = "default";
    if (cursorImgRef.current) cursorImgRef.current.classList.remove("active");
    setGrabbing(false);
  }
  function OnMouseUp(e) {
    // console.log("up");
    resetCursorImg();
  }
  useEffect(() => {
    root.current = document.getElementById("root");
    root.current.addEventListener("mousemove", OnMouseMove);
    document.querySelector("canvas").addEventListener("mouseup", OnMouseUp);
    return () => {
      root.current.removeEventListener("mousemove", OnMouseMove);
      document
        .querySelector("canvas")
        .removeEventListener("mouseup", OnMouseUp);
    };
  });

  return (
    <>
      <img className={"cursorImg"} ref={cursorImgRef} alt="" src="" />
      <div className={"ItemsParent"}>
        <img
          className={"Item"}
          ref={itemRef}
          src="https://www.transparentpng.com/thumb/cube/AZIkiw-cube-transparent-image.png"
          onMouseDown={() => {
            console.log("down");
            setGrabbing(true);
            if (cursorImgRef.current) {
              cursorImgRef.current.src =
                "https://www.transparentpng.com/thumb/cube/AZIkiw-cube-transparent-image.png";
              cursorImgRef.current.classList.add("active");
            }
            if (root.current) root.current.style.cursor = "grabbing";
          }}
          alt="Cube"
        />
      </div>
    </>
  );
};

export { ScreenSpaceUI };
