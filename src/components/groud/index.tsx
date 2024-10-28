import { useState } from "react";
import DDD from "./ddd";
import DD from "./dd";
import { cn } from "../../utils/cn";
import { MdClose, MdCheck } from "react-icons/md";

type GroundProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

type IconButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const IconButton = ({ onClick, children }: IconButtonProps) => (
    <button
        className="border border-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all outline-none"
        onClick={onClick}
    >
        {children}
    </button>
);

const Ground = (props: GroundProps) => {
    const { openPanel, setOpenPanel } = props;
    const [view, setView] = useState("3d");
    const [widerSide, setWiderSide] = useState<"x" | "y">("x");

    return (
        <div className="relative">
            {view === "3d" ? (
                <DDD {...{ openPanel, setOpenPanel }} />
            ) : (
                <DD {...{ openPanel, setOpenPanel, setWiderSide }} />
            )}
            <div
                className={cn("absolute bottom-3 right-3 flex gap-2", {
                    "flex-col": widerSide === "x",
                })}
            >
                <IconButton onClick={() => setOpenPanel(!openPanel)}>
                    <MdCheck className="text-xl" />
                </IconButton>
                <IconButton onClick={() => setOpenPanel(!openPanel)}>
                    <MdClose className="text-xl" />
                </IconButton>
                <IconButton
                    onClick={() => setView(view === "3d" ? "2d" : "3d")}
                >
                    <span className="text-[17px]">
                        {view === "3d" ? "2d" : "3d"}
                    </span>
                </IconButton>
            </div>
        </div>
    );
};

export default Ground;
