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

export const screens: Record<
    TScreenKeys,
    { type?: string; src?: string; isBlank?: boolean }
> = {
    A1: {
        type: "",
        src: "",
    },
    A2: {
        isBlank: true,
    },
    A3: {
        isBlank: true,
    },
    A4: {
        isBlank: true,
    },
    B1: {
        type: "",
        src: "",
    },
    B2: {
        type: "",
        src: "",
    },
    B3: {
        type: "",
        src: "",
    },
    B4: {
        type: "",
        src: "",
    },
    C1: {
        isBlank: true,
    },
    C2: {
        isBlank: true,
    },
    C3: {
        isBlank: true,
    },
    C4: {
        type: "",
        src: "",
    },
};
