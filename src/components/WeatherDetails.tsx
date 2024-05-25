import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string
}

export default function WeatherDetails(props: WeatherDetailsProps) {
    const {
        visibility = '25km',
        humidity = '50%',
        windSpeed = '5km/h',
        airPressure = '1000hPa',
        sunrise = '6:00 AM',
        sunset = '6:00 PM'
    } = props;

    return (
    <>
        <SingleWeatherDetail 
            info='Visibility'
            icon={<LuEye />}
            value={visibility}
        />
        <SingleWeatherDetail 
            info='Humidity'
            icon={<FiDroplet />}
            value={humidity}
        />
        <SingleWeatherDetail 
            info='Wind Speed'
            icon={<MdAir />}
            value={windSpeed}
        />
        <SingleWeatherDetail 
            info='Air Pressure'
            icon={<ImMeter />}
            value={airPressure}
        />
        <SingleWeatherDetail 
            info='Sunrise'
            icon={<LuSunrise  />}
            value={sunrise}
        />
        <SingleWeatherDetail 
            info='Sunset'
            icon={<LuSunset />}
            value={sunset}
        />
    </>
  )
}

export interface SingleWeatherDetailProps {
    info: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
        <p className='whitespace-nowrap'>{props.info}</p>
        <p className='text-3xl'>{props.icon}</p>
        <p>{props.value}</p>
    </div>
  )
}