import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../state/context";
import { cn } from "../../../utils/cn";
import { TScreenKeys } from "../data";
import Widget, { Twidgets } from "../../widgets";

type TwoDimProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
    setWiderSide: (view: "x" | "y") => void;
};

const TwoDim = observer(
    ({ openPanel, setOpenPanel, setWiderSide }: TwoDimProps) => {
        const store = useStore();
        const screens = store.screens;

        const [containerSize, setContainerSize] = useState(() => ({
            w: window.innerWidth - (openPanel ? 300 : 0),
            h: window.innerHeight,
        }));

        useEffect(() => {
            const updateContainerSize = () => {
                const pw = 300;
                const aw = window.innerWidth - (openPanel ? pw : 0);
                const ah = window.innerHeight;

                let ch, cw;

                if (aw / 4 > ah / 3) {
                    setWiderSide("x");
                    if ((aw - 160) / 4 > ah / 3) {
                        cw = (ah * 4) / 3;
                        ch = ah;
                    } else {
                        cw = aw - 160;
                        ch = ((aw - 160) * 3) / 4;
                    }
                } else {
                    setWiderSide("y");
                    if ((ah - 160) / 3 > aw / 4) {
                        cw = aw;
                        ch = (aw * 3) / 4;
                    } else {
                        cw = ((ah - 160) * 4) / 3;
                        ch = ah - 160;
                    }
                }
                setContainerSize({ w: cw, h: ch });
            };

            // Initial size setup
            updateContainerSize();

            // Listen to resize events
            window.addEventListener("resize", updateContainerSize);
            return () =>
                window.removeEventListener("resize", updateContainerSize);
        }, [openPanel, setWiderSide]);

        return (
            <div className="h-lvh flex items-center justify-center">
                <div
                    style={{
                        width: containerSize.w,
                        height: containerSize.h,
                    }}
                    className="grid grid-cols-4 grid-rows-3 gap-0"
                >
                    {Object.keys(screens).map((screenKey) => {
                        const screen = screens[screenKey as TScreenKeys];
                        return (
                            <div
                                onClick={() => {
                                    if (screen !== "mute") {
                                        if (store.currScreen === screenKey) {
                                            store.setCurrScreen("");
                                            setOpenPanel(!openPanel);
                                        } else {
                                            store.setCurrScreen(
                                                screenKey as TScreenKeys
                                            );
                                            setOpenPanel(true);
                                        }
                                    }
                                }}
                                key={screenKey}
                            >
                                <div
                                    className={cn(
                                        "w-full h-full self-stretch flex items-center justify-center bg-neutral-100",
                                        {
                                            "transform rotate-180":
                                                screenKey === "A1" ||
                                                screenKey === "C4",
                                            "bg-transparent": screen === "mute",
                                            "hover:cursor-pointer hover:border-pink-200":
                                                screen !== "mute",
                                            "border-4 border-pink-400 hover:border-pink-400":
                                                store.currScreen === screenKey,
                                        }
                                    )}
                                >
                                    {screen && screen !== "mute" ? (
                                        screen.type === "video" ? (
                                            <video
                                                src={screen.src}
                                                className="w-full h-full object-cover"
                                                muted
                                                autoPlay
                                                loop
                                            />
                                        ) : (
                                            <Widget
                                                type={screen.src as Twidgets}
                                            />
                                        )
                                    ) : (
                                        <span className="text-2xl opacity-5">
                                            {screenKey}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

export default TwoDim;
