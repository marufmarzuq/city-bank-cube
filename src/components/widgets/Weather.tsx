import moment from "moment";
import res, { resType } from "./res";
import { useEffect, useState } from "react";
import { ACCU_API_KEY, ACCU_LOCATION_KEY } from "./keys";

const ftoc = (f: number) => Math.floor((f - 30) / 1.8);

const Temperature = ({
    minTemp,
    maxTemp,
}: {
    minTemp: number;
    maxTemp: number;
}) => (
    <div className="font-thin text-[10px] flex items-center justify-center mt-1">
        <div className="pr-2">{ftoc(minTemp)}°</div>
        <div className="pl-2 border-l border-[#888]">{ftoc(maxTemp)}°</div>
    </div>
);

interface ForecastCardProps {
    date: string;
    icon: number;
    phrase: string;
    minTemp: number;
    maxTemp: number;
    isMiddle: boolean;
}

const ForecastCard = ({
    date,
    icon,
    phrase,
    minTemp,
    maxTemp,
    isMiddle,
}: ForecastCardProps) => (
    <div
        className={`flex flex-col items-center ${
            isMiddle ? "border-x border-[#333]" : ""
        }`}
    >
        <div className="uppercase text-[12px]">
            {moment(date).format("ddd")}
        </div>
        <img
            className="h-6 my-3"
            src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}
            alt=""
        />
        <div className="text-[9px] capitalize font-thin">{phrase}</div>
        <Temperature minTemp={minTemp} maxTemp={maxTemp} />
    </div>
);

const Weather = () => {
    const [weatherData, setWeatherData] = useState<resType>(res);
    const weatherKey = "weatherData";
    const weatherDateKey = "weatherDate";

    // Function to fetch weather data
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${ACCU_LOCATION_KEY}?apikey=${ACCU_API_KEY}`
            );

            console.log({ response });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setWeatherData(data);

            localStorage.setItem(weatherKey, JSON.stringify(data));
            localStorage.setItem(weatherDateKey, new Date().toDateString());
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    };

    const checkAndFetchWeatherData = () => {
        const storedWeatherDate = localStorage.getItem(weatherDateKey);
        const today = new Date().toDateString();

        if (storedWeatherDate !== today) {
            fetchWeatherData();
        }
    };

    useEffect(() => {
        const storedWeatherData = localStorage.getItem(weatherKey);
        const storedWeatherDate = localStorage.getItem(weatherDateKey);
        const today = new Date().toDateString();

        if (!storedWeatherData || storedWeatherDate !== today) {
            fetchWeatherData();
        } else {
            setWeatherData(JSON.parse(storedWeatherData));
        }

        const interval = setInterval(() => {
            checkAndFetchWeatherData();
        }, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const today = weatherData.DailyForecasts[0];
    const upcomingForecasts = weatherData.DailyForecasts.slice(1, 4);

    return (
        <div
            className="bg-neutral-900 w-full h-full text-white p-4 select-none"
            style={{ fontFamily: '"Alegreya Sans", sans-serif' }}
        >
            <div className="h-[64%] flex flex-col items-center">
                <div className="text-[12px] uppercase font-thin mb-4">
                    {moment(today.Date).format("ddd, Do MMMM")}
                </div>
                <img
                    className="h-12"
                    src={`https://www.accuweather.com/images/weathericons/${today.Day.Icon}.svg`}
                    alt=""
                />
                <div className="text-2xl font-thin">
                    {(
                        (ftoc(today.Temperature.Minimum.Value) +
                            ftoc(today.Temperature.Maximum.Value)) /
                        2
                    ).toFixed(0)}
                    °
                </div>
                <div className="text-sm uppercase font-thin">
                    {today.Day.PrecipitationType ?? today.Day.IconPhrase}
                </div>
            </div>
            <div className="h-[36%] grid grid-cols-3">
                {upcomingForecasts.map((forecast, index) => (
                    <ForecastCard
                        key={index}
                        date={forecast.Date}
                        icon={forecast.Day.Icon}
                        phrase={
                            forecast.Day.PrecipitationType ??
                            forecast.Day.IconPhrase
                        }
                        minTemp={forecast.Temperature.Minimum.Value}
                        maxTemp={forecast.Temperature.Maximum.Value}
                        isMiddle={index === 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default Weather;
