'use client'

import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import Container from "@/components/Container";
import { convertKelvinToCelcius } from "@/utils/convertKelvinToCelcius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { meterToKilometer } from "@/utils/meterToKilometer";
import { mPerSecToKmPerH } from "@/utils/mPerSecToKmPerH";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=6f2f8486ca5dde950f7abb703f2a785d&cnt=6


export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () =>
    {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=${process.env.NEXT_PUBLIC_WEATHERIA_KEY}&cnt=8`);
      return data;
    }
  )

  const today = data?.list[0];

  if (isLoading) return 
  <div className='flex justify-center items-center min-h-screen'>
    <p className='animate-bounce'>Loading...</p>
  </div>;

  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        
        {/* Today's data */}
        <section className='space-y-4'>
          <div className='space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p> {format(parseISO(today?.dt_txt ?? ''), 'EEEE')} </p>
              <p className="text-lg"> ({format(parseISO(today?.dt_txt ?? ''), 'dd-MM-yyyy')}) </p>
            </h2>
            <div>
              <Container className='gap-10 px-6 items-center'>
                {/* Temperature */}
                <div className='flex flex-col px-4'>
                  <span className='text-5xl'>
                    {convertKelvinToCelcius(today?.main.temp ?? 0)}°C
                  </span>
                  <p className='text-xs space-x-1 whitespace-nowrap'>
                    <span> Feels like {convertKelvinToCelcius(today?.main.feels_like ?? 0)}°C </span>
                  </p>
                  <p className='text-xs space-x-2 whitespace-nowrap'>
                    <span> ⬇️: {convertKelvinToCelcius(today?.main.temp_min ?? 0)}°C </span>
                    <span> ⬆️: {convertKelvinToCelcius(today?.main.temp_max ?? 0)}°C </span>
                  </p>
                </div>
                {/* Time and weather */}
                <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                  {data?.list.map((weather_data, index) => (
                    <div key={index} className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'>
                      <p className='whitespace-nowrap'> {format(parseISO(weather_data.dt_txt), 'h:mm a')} </p>
                      <WeatherIcon iconName={getDayOrNightIcon(weather_data.weather[0].icon, weather_data.dt_txt)}/>
                      <p className=''> {convertKelvinToCelcius(weather_data.main.temp ?? 0)}°C </p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>

          {/* Weather details */}
          <div className='flex gap-4'>
            <Container className='w-fit justify-center flex-col px-4 items-center'>
              <p className='capitalize text-center'> {today?.weather[0].description} </p>
              <WeatherIcon iconName={getDayOrNightIcon(today?.weather[0].icon ?? '', today?.dt_txt ?? '')} />
            </Container>
            <Container className='bg-orange-300/80 px-5 gap-4 justify-between overflow-x-auto'>
              <WeatherDetails 
                visibility={meterToKilometer(today?.visibility ?? 10000)} 
                humidity={`${today?.main.humidity}%`}
                airPressure={`${today?.main.pressure} hPa`}
                windSpeed={`${mPerSecToKmPerH(today?.wind.speed ?? 3.6)}`}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 	1718445600), 'h:mm a')}
                sunset={format(fromUnixTime(data?.city.sunset ?? 	1718488800), 'h:mm a')}
                />
            </Container>
          </div>
        </section>

        {/* 7 day forcast data */}
        <section className='flex w-full flex-col gap-4'>
          <h2 className='text-2xl'>7 Day Forecast</h2>
          
        </section>
      </main>
    </div>
  );
}
