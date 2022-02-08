import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const ScreenSpaceUI = ({ ...props }) => {
  const cursorImgRef = useRef();
  const root = useRef();

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
    props.setGrabbing(false);
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
          src="https://www.transparentpng.com/thumb/cube/AZIkiw-cube-transparent-image.png"
          onMouseDown={() => {
            console.log("down");
            props.setGrabbing(true);
            if (cursorImgRef.current) {
              cursorImgRef.current.src =
                "https://www.transparentpng.com/thumb/cube/AZIkiw-cube-transparent-image.png";
              cursorImgRef.current.classList.add("active");
            }
            if (root.current) root.current.style.cursor = "grabbing";
          }}
          alt="Cube"
        />
        <img
          className={"Item"}
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/44c37112-6a1a-480d-b53d-ae53ca8029d7/dde3pvw-5b5132e2-37ad-4792-84cb-ac9fddf40a9a.png/v1/fill/w_1024,h_1020,strp/astronaut_png_by_hamza7black_dde3pvw-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyMCIsInBhdGgiOiJcL2ZcLzQ0YzM3MTEyLTZhMWEtNDgwZC1iNTNkLWFlNTNjYTgwMjlkN1wvZGRlM3B2dy01YjUxMzJlMi0zN2FkLTQ3OTItODRjYi1hYzlmZGRmNDBhOWEucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.KO59mOPt5HNXPke_JKgQ4B7O1tsbTkb_z2YSXcoPpdM"
          onMouseDown={() => {
            console.log("down");
            props.setGrabbing("Astro");
            if (cursorImgRef.current) {
              cursorImgRef.current.src =
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/44c37112-6a1a-480d-b53d-ae53ca8029d7/dde3pvw-5b5132e2-37ad-4792-84cb-ac9fddf40a9a.png/v1/fill/w_1024,h_1020,strp/astronaut_png_by_hamza7black_dde3pvw-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyMCIsInBhdGgiOiJcL2ZcLzQ0YzM3MTEyLTZhMWEtNDgwZC1iNTNkLWFlNTNjYTgwMjlkN1wvZGRlM3B2dy01YjUxMzJlMi0zN2FkLTQ3OTItODRjYi1hYzlmZGRmNDBhOWEucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.KO59mOPt5HNXPke_JKgQ4B7O1tsbTkb_z2YSXcoPpdM";
              cursorImgRef.current.classList.add("active");
            }
            if (root.current) root.current.style.cursor = "grabbing";
          }}
          alt="Cube"
        />
        <img
          className={"Item"}
          src="https://images.pngnice.com/download/2007/Grill-PNG-Free-Image.png"
          onMouseDown={() => {
            console.log("down");
            props.setGrabbing("Grill");
            if (cursorImgRef.current) {
              cursorImgRef.current.src =
                "https://images.pngnice.com/download/2007/Grill-PNG-Free-Image.png";
              cursorImgRef.current.classList.add("active");
            }
            if (root.current) root.current.style.cursor = "grabbing";
          }}
          alt="Cube"
        />
        <img
          className={"Item"}
          src="https://pbs.twimg.com/profile_images/1136014070765772800/zpkkb7B0_400x400.png"
          onMouseDown={() => {
            console.log("down");
            props.setGrabbing("Craftsman");
            if (cursorImgRef.current) {
              cursorImgRef.current.src =
                "https://pbs.twimg.com/profile_images/1136014070765772800/zpkkb7B0_400x400.png";
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
