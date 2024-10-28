import Cube from "./Cube";

type DddProps = {
    openPanel: boolean;
    setOpenPanel: (view: boolean) => void;
};

const Ddd = ({ openPanel, setOpenPanel }: DddProps) => {
    console.log({ openPanel, setOpenPanel });
    return (
        <div className="h-dvh">
            <Cube />
        </div>
    );
};

export default Ddd;
