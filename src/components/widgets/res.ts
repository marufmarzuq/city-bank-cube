const res = {
    img_url: "https://www.accuweather.com/images/weathericons/42.svg",
    Headline: {
        EffectiveDate: "2024-11-06T19:00:00+06:00",
        EffectiveEpochDate: 1730898000,
        Severity: 4,
        Text: "Thunderstorms Wednesday evening",
        Category: "thunderstorm",
        EndDate: "2024-11-07T01:00:00+06:00",
        EndEpochDate: 1730919600,
        MobileLink:
            "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?lang=en-us",
        Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?lang=en-us",
    },
    DailyForecasts: [
        {
            Date: "2024-11-06T07:00:00+06:00",
            EpochDate: 1730854800,
            Temperature: {
                Minimum: {
                    Value: 73,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 87,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 16,
                IconPhrase: "Mostly cloudy w/ t-storms",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Moderate",
            },
            Night: {
                Icon: 42,
                IconPhrase: "Mostly cloudy w/ t-storms",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Moderate",
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=1&lang=en-us",
            Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=1&lang=en-us",
        },
        {
            Date: "2024-11-07T07:00:00+06:00",
            EpochDate: 1730941200,
            Temperature: {
                Minimum: {
                    Value: 75,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 3,
                IconPhrase: "Partly sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=2&lang=en-us",
            Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=2&lang=en-us",
        },
        {
            Date: "2024-11-08T07:00:00+06:00",
            EpochDate: 1731027600,
            Temperature: {
                Minimum: {
                    Value: 74,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 5,
                IconPhrase: "Hazy sunshine",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=3&lang=en-us",
            Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=3&lang=en-us",
        },
        {
            Date: "2024-11-09T07:00:00+06:00",
            EpochDate: 1731114000,
            Temperature: {
                Minimum: {
                    Value: 74,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=4&lang=en-us",
            Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=4&lang=en-us",
        },
        {
            Date: "2024-11-10T07:00:00+06:00",
            EpochDate: 1731200400,
            Temperature: {
                Minimum: {
                    Value: 74,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 6,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 38,
                IconPhrase: "Mostly cloudy",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=5&lang=en-us",
            Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=5&lang=en-us",
        },
    ],
};

export type resType = typeof res;
export default res;
