export type TScreenKeys =
    | "A1"
    | "A2"
    | "A3"
    | "A4"
    | "B1"
    | "B2"
    | "B3"
    | "B4"
    | "C1"
    | "C2"
    | "C3"
    | "C4";

export type TScreens = Record<
    TScreenKeys,
    { type: "video" | "widget"; src: string } | "mute" | null
>;

export const screens: TScreens = {
    A1: null,
    A2: "mute",
    A3: "mute",
    A4: "mute",
    B1: null,
    B2: null,
    B3: null,
    B4: null,
    C1: "mute",
    C2: "mute",
    C3: "mute",
    C4: null,
};
