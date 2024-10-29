import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../state/context";
import { TScreenKeys } from "./data";

interface VideoMaterialProps {
    videoSrc: string;
}

const VideoMaterial = ({ videoSrc }: VideoMaterialProps) => {
    const [video] = useState(() =>
        Object.assign(document.createElement("video"), {
            crossOrigin: "Anonymous",
            loop: true,
            muted: true,
        })
    );

    useEffect(() => {
        video.src = videoSrc;
        void video.play();
    }, [videoSrc, video]);

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
    videoSrc: string;
    onClick: () => void;
}

const Face = ({ active, position, rotation, videoSrc, onClick }: FaceProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // make cursor a pointer when hovering over the face
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
            <VideoMaterial videoSrc={videoSrc} />
        </mesh>
    );
};

type CubeProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Cube = observer(({ openPanel, setOpenPanel }: CubeProps) => {
    const store = useStore();
    const screens = store.screens as Record<string, { src: string }>;

    const cubeFaces: {
        id: string;
        position: [number, number, number];
        rotation: [number, number, number];
        videoSrc: string;
    }[] = [
        {
            id: "A1",
            position: [0, 0.51, 0],
            rotation: [-Math.PI / 2, 0, 0],

            videoSrc: screens.A1.src,
        },
        {
            id: "B1",
            position: [0, 0, -0.51],
            rotation: [0, Math.PI, 0],
            videoSrc: screens.B1.src,
        },
        {
            id: "B2",
            position: [0.51, 0, 0],
            rotation: [0, Math.PI / 2, 0],
            videoSrc: screens.B2.src,
        },
        {
            id: "B3",
            position: [0, 0, 0.51],
            rotation: [0, 0, 0],
            videoSrc: screens.B3.src,
        },
        {
            id: "B4",
            position: [-0.51, 0, 0],
            rotation: [0, -Math.PI / 2, 0],
            videoSrc: screens.B4.src,
        },
        {
            id: "C4",
            position: [0, -0.51, 0],
            rotation: [Math.PI / 2, 0, Math.PI],
            videoSrc: screens.C4.src,
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
                        position={face.position}
                        rotation={face.rotation}
                        videoSrc={face.videoSrc}
                        active={store.currScreen === face.id}
                        onClick={() => {
                            if (face.id === store.currScreen) {
                                store.setCurrScreen("");
                                setOpenPanel(!openPanel);
                            } else {
                                store.setCurrScreen(face.id as TScreenKeys);
                                setOpenPanel(true);
                            }
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
