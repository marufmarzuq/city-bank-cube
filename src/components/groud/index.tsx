import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useStore } from "../../state/context";
import { cn } from "../../utils/cn";
import {
    loadFromLocalStorage,
    saveToLocalStorage,
} from "../../utils/manageLocalStorage";
import DD from "./dd";
import DDD from "./ddd";
import { observer } from "mobx-react-lite";

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

const Ground = observer((props: GroundProps) => {
    const store = useStore();
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
                {store.isScreensUpdated && (
                    <>
                        <IconButton
                            onClick={() => {
                                saveToLocalStorage("screens", store.screens);
                                store.setScreensUpdated(false);
                                setOpenPanel(false);
                            }}
                        >
                            <MdCheck className="text-xl" />
                        </IconButton>
                        <IconButton
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
