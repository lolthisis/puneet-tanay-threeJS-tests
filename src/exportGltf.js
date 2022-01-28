import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

function exportGLTF(input) {
  const gltfExporter = new GLTFExporter();

  const options = {
    trs: false,
    onlyVisible: true,
    truncateDrawRange: false,
    binary: true,
    maxTextureSize: Number(4096) || Infinity // To prevent NaN value
  };
  gltfExporter.parse(
    input,
    function (result) {
      if (result instanceof ArrayBuffer) {
        saveArrayBuffer(result, "scene.glb");
      } else {
        const output = JSON.stringify(result, null, 2);
        console.log(output);
        saveString(output, "scene.gltf");
      }
    },
    function (error) {
      console.log("An error happened during parsing", error);
    },
    options
  );
}

function save(blob, filename) {
  let link = document.getElementById("gltfDownloadBtn");
  if (!link) {
    link = document.createElement("a");
    link.id = "gltfDownloadBtn";
    link.style.display = "none";
    document.body.appendChild(link);
  }

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

export { exportGLTF };
