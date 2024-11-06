import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdCheck, MdClose } from "react-icons/md";
import { useStore } from "../../state/context";
import { cn } from "../../utils/cn";
import Widget, { Twidgets } from "../widgets";

type PanelProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Panel = observer((props: PanelProps) => {
    const store = useStore();
    const { setOpenPanel } = props;
    const [tab, setTab] = useState<"uploads" | "widgets">("uploads");

    const items: {
        uploads: string[];
        widgets: Twidgets[];
    } = {
        uploads: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        ],
        widgets: ["weather", "analog-clock", "digital-clock"],
    };

    return (
        <div className="w-[300px] border-l border-neutral-200">
            <div className="pt-3 px-3 pb-1">
                <input
                    type="text"
                    placeholder="Search medias"
                    className="w-full border border-neutral-200 p-2 outline-none"
                />
            </div>
            <div className="[&>button]:p-2 [&>button]:border-b px-3 pb-3">
                {["uploads", "widgets"].map((item) => (
                    <button
                        key={item}
                        className={`mr-3 capitalize ${
                            tab === item ? "border-black" : "border-transparent"
                        }`}
                        onClick={() => setTab(item as "uploads" | "widgets")}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {tab === "uploads" && (
                <div className="mx-3 mb-3">
                    <button className="h-[44px] w-full flex gap-3 items-center justify-center bg-pink-400 text-white">
                        <FiUpload /> Upload
                    </button>
                </div>
            )}
            <div
                className={cn(
                    "h-[calc(100vh-111px)] overflow-y-auto px-3 pb-3 flex flex-col gap-2",
                    {
                        "h-[calc(100vh-166px)]": tab === "uploads",
                    }
                )}
            >
                {items[tab].map((item) => (
                    <Fragment key={item}>
                        <div
                            className={cn(
                                "h-[150px] flex-shrink-0 border border-neutral-200 cursor-pointer bg-neutral-50 hover:border-pink-200 hover:border-4",
                                {
                                    "border-4 border-pink-400 hover:border-pink-400":
                                        store.currItem &&
                                        store.currItem !== "mute" &&
                                        store.currItem.src === item,
                                    "h-[271px]": tab === "widgets",
                                }
                            )}
                            onClick={() => {
                                if (store.currItem && store.currItem === "mute")
                                    return;

                                store.setCurrItem(
                                    store.currItem &&
                                        store.currItem.src === item
                                        ? null
                                        : {
                                              type:
                                                  tab === "uploads"
                                                      ? "video"
                                                      : "widget",
                                              src: item,
                                          }
                                );
                            }}
                        >
                            {tab === "uploads" ? (
                                <video
                                    src={item}
                                    className="w-full h-full object-cover"
                                    muted
                                    autoPlay
                                    loop
                                />
                            ) : (
                                <Widget type={item as Twidgets} />
                            )}
                        </div>
                        {store.currItem &&
                            store.currItem !== "mute" &&
                            store.currItem.src === item &&
                            store.currScreen && (
                                <div className="px-1 flex justify-end gap-3 items-center">
                                    <button
                                        className="hover:text-pink-400"
                                        onClick={() => store.setCurrItem(null)}
                                    >
                                        <MdClose className="text-xl" />
                                    </button>
                                    <button
                                        className="hover:text-pink-400"
                                        onClick={() => {
                                            store.setScreens({
                                                ...store.screens,
                                                [store.currScreen]: {
                                                    type:
                                                        tab === "uploads"
                                                            ? "video"
                                                            : "widget",
                                                    src: item,
                                                },
                                            });
                                            store.setCurrScreen("");
                                            store.setCurrItem(null);
                                            setOpenPanel(false);
                                        }}
                                    >
                                        <MdCheck className="text-xl" />
                                    </button>
                                </div>
                            )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
});

export default Panel;
