import { Html } from "@react-three/drei";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../state/context";
import Widget, { Twidgets } from "../../widgets";
import { TScreenKeys, TScreens } from "../data";

interface VideoMaterialProps {
    src: string;
}

const VideoMaterial = ({ src }: VideoMaterialProps) => {
    const [video] = useState(() =>
        Object.assign(document.createElement("video"), {
            crossOrigin: "Anonymous",
            loop: true,
            muted: true,
        })
    );

    useEffect(() => {
        video.src = src;
        void video.play();
    }, [src, video]);

    return (
        <meshBasicMaterial toneMapped={false}>
            <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
    );
};

interface FaceProps {
    active: boolean;
    position: [number, number, number];
    rotation: [number, number, number];
    screen: TScreens[keyof TScreens];
    onClick: () => void;
}

const Face = ({ active, position, rotation, onClick, screen }: FaceProps) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = isHovered ? "pointer" : "auto";
        return () => {
            document.body.style.cursor = "auto";
        };
    }, [isHovered]);

    return (
        <mesh
            position={position}
            rotation={rotation}
            onClick={onClick}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            scale={active ? 0.95 : 1.02}
        >
            <planeGeometry args={[1, 1]} />
            {screen && screen !== "mute" ? (
                screen.type === "video" ? (
                    <VideoMaterial src={screen?.src} />
                ) : (
                    <>
                        <Html occlude="blending" transform center>
                            <div
                                onClick={onClick}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    fontSize: "5px",
                                }}
                            >
                                <Widget type={screen.src as Twidgets} />
                            </div>
                        </Html>
                    </>
                )
            ) : (
                <meshBasicMaterial color="#202030" />
            )}
        </mesh>
    );
};

type CubeProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Cube = observer(({ openPanel, setOpenPanel }: CubeProps) => {
    const store = useStore();

    const cubeFaces: {
        id: TScreenKeys;
        position: [number, number, number];
        rotation: [number, number, number];
    }[] = [
        {
            id: "A1",
            position: [0, 0.51, 0],
            rotation: [-Math.PI / 2, 0, 0],
        },
        {
            id: "B1",
            position: [0, 0, -0.51],
            rotation: [0, Math.PI, 0],
        },
        {
            id: "B2",
            position: [0.51, 0, 0],
            rotation: [0, Math.PI / 2, 0],
        },
        {
            id: "B3",
            position: [0, 0, 0.51],
            rotation: [0, 0, 0],
        },
        {
            id: "B4",
            position: [-0.51, 0, 0],
            rotation: [0, -Math.PI / 2, 0],
        },
        {
            id: "C4",
            position: [0, -0.51, 0],
            rotation: [Math.PI / 2, 0, Math.PI],
        },
    ];

    return (
        <>
            <group
                rotation={[Math.PI / 4 + 0.12, Math.PI / 4, 0]}
                scale={2}
                position={[0, 1.05, 0]}
            >
                {cubeFaces.map((face, index) => (
                    <Face
                        key={index}
                        {...{
                            ...face,
                            screen: store.screens[face.id],
                            active: store.currScreen === face.id,
                            onClick: () => {
                                if (face.id === store.currScreen) {
                                    store.setCurrScreen("");
                                    setOpenPanel(!openPanel);
                                } else {
                                    store.setCurrScreen(face.id as TScreenKeys);
                                    setOpenPanel(true);
                                }
                            },
                        }}
                    />
                ))}
                <mesh>
                    <boxGeometry args={[1, 1]} />
                    <meshBasicMaterial color="#F472B6" />
                </mesh>
            </group>
        </>
    );
});

export default Cube;
