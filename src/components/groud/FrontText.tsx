import { Center, Text3D } from "@react-three/drei";

const FrontText = () => {
    return (
        <>
            <Center position={[0, -0.7, 3]}>
                <Text3D
                    font="/Inter_Medium_Regular.json"
                    letterSpacing={-0.03}
                    size={0.6}
                    // bevelSize={0.01}
                    // bevelSegments={10}
                    // curveSegments={128}
                    // bevelThickness={0.01}
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
        </>
    );
};

export default FrontText;
