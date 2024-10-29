import FrontText from "./FrontText";

type EnvironmentProps = {
    children: React.ReactNode;
};

const Environment = ({ children }: EnvironmentProps) => {
    return (
        <group>
            {children}
            <mesh position={[0, -1.5, 0.12]}>
                <boxGeometry args={[2, 1, 2]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <mesh position={[0, -0.75, 0.12]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <mesh position={[0, 9, -10]}>
                <boxGeometry args={[16, 22, 7]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <mesh position={[0, -1.6, 3]}>
                <boxGeometry args={[8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <FrontText />
        </group>
    );
};

export default Environment;
