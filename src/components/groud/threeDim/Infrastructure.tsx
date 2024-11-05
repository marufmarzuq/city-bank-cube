import { Center, Text3D } from "@react-three/drei";

const Infrastructure = () => {
    return (
        <group>
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
            <Center position={[0, -0.7, 3]}>
                <Text3D
                    font="/Inter_Medium_Regular.json"
                    letterSpacing={-0.03}
                    size={0.6}
                >
                    CITY BANK CENTER
                    <meshStandardMaterial
                        attach="material"
                        color="#ffffff"
                        transparent
                        opacity={0.5}
                    />
                </Text3D>
            </Center>
        </group>
    );
};

export default Infrastructure;
