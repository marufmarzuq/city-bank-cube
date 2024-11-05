import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useStore } from "../../state/context";
import { cn } from "../../utils/cn";
import {
    loadFromLocalStorage,
    saveToLocalStorage,
} from "../../utils/manageLocalStorage";
import ThreeDim from "./threeDim";
import TwoDim from "./twoDim";

type GroundProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

type IconButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    isDark: boolean;
};

const IconButton = ({ onClick, children, isDark }: IconButtonProps) => (
    <button
        className={cn(
            "border border-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all outline-none",
            {
                "border-white text-white hover:bg-white hover:text-black":
                    isDark,
            }
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

const Ground = observer((props: GroundProps) => {
    const store = useStore();
    const { openPanel, setOpenPanel } = props;
    const [view, setView] = useState("3d");
    const [widerSide, setWiderSide] = useState<"x" | "y">("x");

    return (
        <div className="relative">
            {view === "3d" ? (
                <ThreeDim {...{ openPanel, setOpenPanel }} />
            ) : (
                <TwoDim {...{ openPanel, setOpenPanel, setWiderSide }} />
            )}
            <div
                className={cn("absolute top-3 right-3 flex gap-2", {
                    "flex-col-reverse": widerSide === "x",
                })}
            >
                {store.isScreensUpdated && (
                    <>
                        <IconButton
                            isDark={view === "3d"}
                            onClick={() => {
                                saveToLocalStorage("screens", store.screens);
                                store.setScreensUpdated(false);
                                setOpenPanel(false);
                            }}
                        >
                            <MdCheck className="text-xl" />
                        </IconButton>
                        <IconButton
                            isDark={view === "3d"}
                            onClick={() => {
                                store.setScreens(
                                    loadFromLocalStorage("screens")
                                );
                                store.setCurrScreen("");
                                store.setCurrItem(null);
                                setOpenPanel(false);
                            }}
                        >
                            <MdClose className="text-xl" />
                        </IconButton>
                    </>
                )}

                <IconButton
                    isDark={view === "3d"}
                    onClick={() => setView(view === "3d" ? "2d" : "3d")}
                >
                    <span className="text-[17px]">
                        {view === "3d" ? "2d" : "3d"}
                    </span>
                </IconButton>
            </div>
        </div>
    );
});

export default Ground;
