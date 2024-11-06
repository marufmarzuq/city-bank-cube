import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";
import Weather from "./Weather";

export type Twidgets =
    | "weather"
    | "analog-clock"
    | "digital-clock"
    | "calendar";

const Widget = ({ type }: { type: Twidgets }) => {
    return (
        <>
            {type === "digital-clock" ? (
                <DigitalClock />
            ) : type === "analog-clock" ? (
                <AnalogClock />
            ) : type === "weather" ? (
                <Weather />
            ) : (
                "Widget not found"
            )}
        </>
    );
};

export default Widget;
