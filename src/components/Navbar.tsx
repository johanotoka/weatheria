'use client'

import React, { useState } from 'react'
import { PiSunHorizonFill } from "react-icons/pi";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBar from './SearchBar';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';

type Props = {location?: string;}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function Navbar({ location }: Props) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);

    async function handleInputChange (value: string) {
        setCity(value);
        if(value.length >= 3) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`);
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setShowSuggestions(true);
                setError('');
            }
            catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
                setError('Location not found');
            }
        }
        else {
            setSuggestions([]);
            setShowSuggestions(false);
            setError('Location not found');
        }
    }

    const handleSuggestionClick = (item: string) => {
        setCity(item);
        setShowSuggestions(false);
    }

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        setLoadingCity(true);
        e.preventDefault();
        
        if(suggestions.length === 0) {
            setError('Location not found');
            setLoadingCity(false);
        }
        else {
            setError('');
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);
            }, 500);
        }
    }

    function handleCurrentLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async(position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name);
                    }, 500);
                }
                catch (error) {
                    setLoadingCity(false);
                    console.log(error);
                }
            });
        }
    }

    return (
        <>
            <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
                <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                    <div className='flex items-center justify-center gap-2'>
                        <h2 className='text-gray-500 text-3xl'>Weatheria</h2>
                        <PiSunHorizonFill className='text-3xl mt-1 text-orange-300'/>
                    </div>
                    {/*  */}
                    <section className='flex gap-2 items-center'>
                        <MdMyLocation 
                            title='Your Current Location'
                            onClick={handleCurrentLocation}
                            className='text-3xl text-gray-400 hover:opacity-80 cursor-pointer'
                        />
                        <MdOutlineLocationOn className='text-3xl'/>
                        <p className='text-slate-900/80 text-sm'>{location}</p>
                        <div className='relative hidden md:flex'>
                            {/* SearchBar */}
                            <SearchBar value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
                            <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}} />
                        </div>
                    </section> 
                </div>
            </nav>
            <section className='flex max-w-7xl px-3 md:hidden'>
                 <div className='relative'>
                    {/* SearchBar */}
                    <SearchBar value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
                    <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}} />
                </div>
            </section>
        </>
    )
}

function SuggestionBox(
    {
        showSuggestions,
        suggestions,
        handleSuggestionClick,
        error
    }: {
        showSuggestions: boolean;
        suggestions: string[];
        handleSuggestionClick: (item: string) => void;
        error: string;
    }
) {
    return (
        <>{(showSuggestions && suggestions.length > 0 && !error) && (
            <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 px-2 py-2'>
                {error && suggestions.length < 1 && (
                <li className='cursor-pointer p-1 rounded hover:bg-gray-200'>{error}</li>
                )}
                {suggestions.map((item) => (
                    <li key={item} onClick={() => handleSuggestionClick(item)} className='cursor-pointer p-1 rounded hover:bg-gray-200'>{item}</li>
                ))}
            </ul>
        )}
        </>
    )
        
}