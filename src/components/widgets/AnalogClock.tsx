import React, { useEffect, useState } from "react";
import "./analog-clock.css";

const AnalogClock: React.FC = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hourRotation = (date.getHours() % 12) * 30 + date.getMinutes() * 0.5;
    const minuteRotation = date.getMinutes() * 6;
    const secondRotation = date.getSeconds() * 6;

    return (
        <div className="ancl-container">
            <div className="ancl-face">
                <div className="ancl-minutes">
                    {[...Array(60)].map((_, minute) => (
                        <div
                            key={minute}
                            className="ancl-tick-radius"
                            style={{
                                transform: `rotate(${minute * 6}deg)`,
                            }}
                        >
                            {minute % 15 === 0 ? (
                                <div
                                    style={{
                                        fontSize: "1.4rem",
                                        textShadow:
                                            "4px 3px 6px rgba(0, 0, 0, 0.3)",
                                        transform: `rotate(-${minute * 6}deg`,
                                        translate:
                                            minute === 0
                                                ? "-6px -8px"
                                                : minute === 30
                                                ? "2px -8px"
                                                : "0 -8px",
                                    }}
                                >
                                    {minute / 5 || 12}
                                </div>
                            ) : (
                                minute % 5 === 0 && (
                                    <div className="ancl-tickmark"></div>
                                )
                            )}
                        </div>
                    ))}
                </div>
                <div className="ancl-date-container">
                    {date
                        .toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                        })
                        .toUpperCase()}
                </div>
                <div className="ancl-hand-container ancl-hour-face">
                    <div
                        className="ancl-hand ancl-hour-hand"
                        style={{
                            transform: `rotate(${hourRotation}deg)`,
                        }}
                    ></div>
                </div>
                <div className="ancl-hand-container ancl-min-face">
                    <div
                        className="ancl-hand ancl-min-hand"
                        style={{
                            transform: `rotate(${minuteRotation}deg)`,
                        }}
                    ></div>
                </div>
                <div className="ancl-hand-container ancl-second-face">
                    <div
                        className="ancl-hand ancl-second-hand"
                        style={{
                            transform: `rotate(${secondRotation}deg)`,
                        }}
                    ></div>
                </div>
                <div className="ancl-center-peg"></div>
            </div>
        </div>
    );
};

export default AnalogClock;
