import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Infrastructure from "./Infrastructure";

type ThreeDimProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const ThreeDim = ({ openPanel, setOpenPanel }: ThreeDimProps) => {
    return (
        <div className="h-lvh">
            <Canvas
                shadows
                camera={{
                    position: [-5, 1.5, 5],
                    fov: 90,
                    near: 0.1,
                    far: 100,
                }}
            >
                <color attach="background" args={["#202030"]} />
                <fog attach="fog" args={["#202030", 5, 20]} />

                <Cube {...{ openPanel, setOpenPanel }} />
                <Infrastructure />

                <gridHelper args={[70, 70]} position={[0, -2, 0]} />

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
                <OrbitControls
                    minDistance={2}
                    maxDistance={7}
                    target={[0, 1, 0]}
                />
            </Canvas>
        </div>
    );
};

export default ThreeDim;
