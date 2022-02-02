const Lights = () => {
  return (
    <group name="LIGHTS">
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
      />
    </group>
  );
};

export { Lights };
