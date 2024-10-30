import { useState } from "react";
import Ground from "./components/groud";
import Panel from "./components/panel";
import { cn } from "./utils/cn";

const App = () => {
    const [openPanel, setOpenPanel] = useState(false);

    return (
        <div
            className={cn("h-lvh grid transition-all overflow-hidden", {
                "grid-cols-[100vw_300px]": !openPanel,
                "grid-cols-[calc(100vw-300px)_300px]": openPanel,
            })}
        >
            <Ground {...{ openPanel, setOpenPanel }} />
            <Panel {...{ openPanel, setOpenPanel }} />
        </div>
    );
};

export default App;
