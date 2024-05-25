import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails'
import { convertKelvinToCelcius } from '@/utils/convertKelvinToCelcius';

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
    weaterIcon: string;
    date: string;
    day: string;
    temp: number;
    feelsLike: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
    const {
        weaterIcon = '01d',
        date = '2024-06-15',
        day = 'Monday',
        temp = 25,
        description = 'Clear Sky'
    } = props;

  return (
    <Container className='gap-4'>
        <section className='flex gap-4 items-center px-4'>
            <div className='flex flex-col gap-1 items-center'>
                <WeatherIcon iconName={weaterIcon}/>
                <p>{date}</p>
                <p className='text-sm'>{day}</p>
            </div>
            <div className='flex flex-col px-4'>
                <p className='text-xs space-x-1 whitespace-nowrap'>
                    <span> Feels like </span>
                    <span className='text-5xl'>{convertKelvinToCelcius(temp ?? 0)}°C</span>
                </p>
                <p className='capitalize'> {description} </p>
            </div>
        </section>
        <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
            <WeatherDetails {...props}/>
        </section>
    </Container>
  )
}