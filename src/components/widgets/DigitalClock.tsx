import React, { useEffect, useState } from "react";

const DigitalClock: React.FC = () => {
    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
        period: "AM",
    });

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            let period = "AM";

            if (hours === 0) hours = 12;
            if (hours > 12) {
                hours -= 12;
                period = "PM";
            }

            setTime({
                hours: hours < 10 ? `0${hours}` : `${hours}`,
                minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
                seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
                period,
            });
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="h-full w-full flex items-center text-gray-300 bg-black font-sans">
            <div className="w-full relative grid grid-cols-3 gap-2 p-4 text-5xl">
                <div className="bg-neutral-900 flex items-center justify-center rounded-lg py-3">
                    <div className="relative">
                        <span className="text-[7px] font-bold absolute -left-[10px] bottom-[5px]">
                            {time.period}
                        </span>
                        {time.hours}
                    </div>
                </div>
                <div className="bg-neutral-900 flex items-center justify-center rounded-lg py-3">
                    {time.minutes}
                </div>
                <div className="bg-neutral-900 flex items-center justify-center rounded-lg py-3">
                    {time.seconds}
                </div>
                <div className="w-full h-[2px] bg-black absolute top-[50%]"></div>
            </div>
        </div>
    );
};

export default DigitalClock;
