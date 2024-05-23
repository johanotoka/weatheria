import React from 'react'
import { PiSunHorizonFill } from "react-icons/pi";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBar from './SearchBar';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
            <p className='flex items-center justify-center gap-2'>
                <h2 className='text-gray-500 text-3xl'>Weatheria</h2>
                <PiSunHorizonFill className='text-3xl mt-1 text-orange-300'/>
            </p>
            {/*  */}
            <section className='flex gap-2 items-center'>
                <MdMyLocation className='text-3xl text-gray-400 hover:opacity-80 cursor-pointer'/>
                <MdOutlineLocationOn className='text-3xl'/>
                <p className='text-slate-900/80 text-sm'>Toronto</p>
                <div>
                    {/* SearchBar */}
                    <SearchBar />
                </div>
            </section>
        </div>
    </div>
  )
}