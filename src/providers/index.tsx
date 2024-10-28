import React, { useMemo } from "react";
import { StoreProvider } from "../state/context";
import { makeState } from "../state/state";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const store = useMemo(() => {
        return makeState();
    }, []);

    return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default Providers;
