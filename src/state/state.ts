import { makeAutoObservable } from "mobx";
import { screens, TScreenKeys } from "../components/groud/data";

type TScreens = typeof screens;
type TCurrScreen = TScreenKeys | "";
type TCurrItem = {
    type: "video" | "widget";
    src?: string;
} | null;

export type TState = {
    screens: TScreens;
    setScreens: (screens: TScreens) => void;
    currScreen: TCurrScreen;
    setCurrScreen: (screen: TCurrScreen) => void;
    currItem: TCurrItem;
    setCurrItem: (item: TCurrItem) => void;
};

export function makeState(): TState {
    return makeAutoObservable({
        screens: screens,
        setScreens(screens: TScreens) {
            this.screens = screens;
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
