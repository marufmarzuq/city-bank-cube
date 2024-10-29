import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Environment from "./Environment";

type DddProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Ddd = ({ openPanel, setOpenPanel }: DddProps) => {
    return (
        <div className="h-dvh">
            <Canvas
                shadows
                camera={{
                    position: [-5, 1.5, 4],
                    fov: 90,
                    near: 0.1,
                    far: 100,
                }}
            >
                <color attach="background" args={["#202030"]} />
                <fog attach="fog" args={["#202030", 5, 20]} />

                <Environment>
                    <Cube {...{ openPanel, setOpenPanel }} />
                </Environment>
                <gridHelper args={[25, 25]} position={[0, -2, 0]} />
                <axesHelper args={[5]} />

                <hemisphereLight
                    intensity={0.2}
                    color="#eaeaea"
                    groundColor="blue"
                />
                <directionalLight
                    castShadow
                    intensity={0.2}
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0001}
                    position={[10, 10, -10]}
                />
                <ambientLight intensity={1} />
                <directionalLight
                    color="#ffffff"
                    position={[0, 5, 5]}
                    intensity={1}
                />
                <OrbitControls minDistance={1} maxDistance={10} />
            </Canvas>
        </div>
    );
};

export default Ddd;
