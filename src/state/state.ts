import { makeAutoObservable } from "mobx";
import { screens, TScreenKeys } from "../components/groud/data";
import { loadFromLocalStorage } from "../utils/manageLocalStorage";
import isEqual from "../utils/isEqual";

type TScreens = typeof screens;
type TCurrScreen = TScreenKeys | "";
type TCurrItem = {
    type: "video" | "widget";
    src?: string;
} | null;

const initialScreens = (loadFromLocalStorage("screens") as TScreens) || screens;

export type TState = {
    isScreensUpdated: boolean;
    setScreensUpdated: (val: boolean) => void;
    screens: TScreens;
    setScreens: (screens: TScreens) => void;
    currScreen: TCurrScreen;
    setCurrScreen: (screen: TCurrScreen) => void;
    currItem: TCurrItem;
    setCurrItem: (item: TCurrItem) => void;
};

export function makeState(): TState {
    return makeAutoObservable({
        isScreensUpdated: false as boolean,
        setScreensUpdated(val: boolean) {
            this.isScreensUpdated = val;
        },
        screens: initialScreens,
        setScreens(newScreens: TScreens) {
            this.screens = newScreens;
            this.isScreensUpdated = !isEqual(
                newScreens,
                loadFromLocalStorage("screens") ?? screens
            );
        },
        currScreen: "" as TCurrScreen,
        setCurrScreen(screen: TCurrScreen) {
            this.currScreen = screen;
        },
        currItem: null as TCurrItem,
        setCurrItem(item: TCurrItem) {
            this.currItem = item;
        },
    }) as TState;
}
