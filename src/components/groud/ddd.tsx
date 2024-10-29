import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { OrbitControls } from "@react-three/drei";

type DddProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Ddd = ({ openPanel, setOpenPanel }: DddProps) => {
    return (
        <div className="h-dvh">
            <Canvas
                shadows={true}
                style={{
                    background:
                        "linear-gradient(180deg, #ddd 0%, rgba(237,224,214,1) 100%)",
                }}
            >
                <Cube {...{ openPanel, setOpenPanel }} />
                <axesHelper args={[5]} />
                <ambientLight intensity={1} />
                <OrbitControls minDistance={1} maxDistance={5} />
            </Canvas>
        </div>
    );
};

export default Ddd;
