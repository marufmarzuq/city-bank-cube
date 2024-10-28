import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import videoSrc from "../../assets/demo.mp4";
import videoSrc1 from "../../assets/demo2.mp4";
import videoSrc2 from "../../assets/demo3.mp4";
import videoSrc3 from "../../assets/demo4.mp4";
import videoSrc4 from "../../assets/demo5.mp4";
import videoSrc5 from "../../assets/demo6.mp4";

interface CanvasVideoMaterialProps {
    videoSrc: string;
    attachIndex: number;
}

const CanvasVideoMaterial = ({
    videoSrc,
    attachIndex,
}: CanvasVideoMaterialProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const textureRef = useRef<THREE.CanvasTexture | null>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("loadedmetadata", () => {
            video.play().catch((error) => {
                console.error("Error playing video:", error);
            });
            setIsVideoReady(true);
        });

        videoRef.current = video;

        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        canvasRef.current = canvas;

        const texture = new THREE.CanvasTexture(canvas);
        textureRef.current = texture;

        return () => {
            video.pause();
            video.src = "";
            video.load();
            texture.dispose();
        };
    }, [videoSrc]);

    useFrame(() => {
        if (
            isVideoReady &&
            videoRef.current &&
            canvasRef.current &&
            textureRef.current
        ) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.drawImage(
                    videoRef.current,
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                textureRef.current.needsUpdate = true;
            }
        }
    });

    return isVideoReady && textureRef.current ? (
        <meshBasicMaterial
            attach={`material-${attachIndex}`}
            map={textureRef.current}
        />
    ) : null;
};

const Cube = () => {
    return (
        <Canvas
            shadows={true}
            style={{
                background:
                    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(237,224,214,1) 100%)",
            }}
        >
            <axesHelper args={[5]} />
            <ambientLight intensity={0.5} />
            {/* <mesh rotation={[Math.PI / 4 - 0.17, 0, 0]} position={[0, 0, 0]}> */}
            <mesh
                onClick={(e) => console.log(e)}
                rotation={[Math.PI / 4 - 0.17, 0, Math.PI / 4]}
            >
                <boxGeometry args={[1, 1, 1]} />
                <CanvasVideoMaterial videoSrc={videoSrc} attachIndex={0} />
                <CanvasVideoMaterial videoSrc={videoSrc1} attachIndex={1} />
                <CanvasVideoMaterial videoSrc={videoSrc2} attachIndex={2} />
                <CanvasVideoMaterial videoSrc={videoSrc3} attachIndex={3} />
                <CanvasVideoMaterial videoSrc={videoSrc4} attachIndex={4} />
                <CanvasVideoMaterial videoSrc={videoSrc5} attachIndex={5} />
            </mesh>
            {/* </mesh> */}
            <OrbitControls
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minDistance={1}
                maxDistance={5}
            />
        </Canvas>
    );
};

export default Cube;
