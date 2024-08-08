"use client";
import React, { useEffect, useState } from 'react';
import ProfileDropdown from './dropdown';

interface HeaderMainProps {
  showSearchBar?: boolean;
  headerText?: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeaderMain({ showSearchBar = true, headerText, searchQuery, setSearchQuery }: HeaderMainProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('firstname');
    console.log('userId:', userId);
    console.log('storedUserName:', storedUserName);
    if (userId && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <header className='w-full flex flex-col bg-[#FFFF00]'>
        <div className='w-11/12 lg:w-3/4 h-24 lg:h-32 flex flex-col lg:flex-row gap-y-5 lg:gap-x-5 justify-between items-center mx-auto'>
          <a href="/">
            <div className='w-20 h-20 lg:w-24 lg:h-24 rounded-full border-black border-2 bg-[#CFDBED] flex justify-center items-center text-lg'>
              Logo
            </div>
          </a>
          <p className='text-white text-xl lg:text-3xl font-bold px-5 py-3 bg-[#D8D8D8] text-center'>
            Association for Free Peace & Love
          </p>
          <select name="" id="" className='bg-[#CFDBED] rounded-full px-4 lg:px-8 py-2 lg:py-4 font-semibold border-2 border-black'>
            <option value="EN">Lang - EN</option>
            <option value="ES">Lang - ES</option>
          </select>
        </div>
      </header>
      <section className='w-full h-auto lg:h-72 bg-[#B3C283] flex flex-col gap-y-3 p-5 items-center relative'>
        <p className='text-2xl lg:text-5xl font-medium text-center py-3 bg-[#D8D8D8] w-full lg:w-3/4'>
          Stay Connected to your Promotion Classmates
        </p>
        <div className='w-full lg:w-2/5 h-auto lg:h-32 flex flex-col border'>
          <p className='bg-[#D8D8D8] text-center w-full py-2 text-[#645496] font-medium text-lg'>Search Member</p>
          <div className='flex gap-0 w-full'>
            {showSearchBar && (
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='col-span-3 bg-slate-50 focus:outline-none text-center text-black py-2 border border-gray-500 border-l-0 w-full'
                placeholder='Type any word for Member: ID, Name and Country.'
              />
            )}
            <div className='w-16 lg:w-20 bg-slate-100 flex justify-center items-center'>
              <i className="fas fa-search text-blue-500"></i>
            </div>
          </div>
          <div className='grid grid-cols-3 items-center h-auto lg:h-20'>
            <div className='col-span-1 bg-slate-100 uppercase flex justify-center items-center border h-full font-medium'>
              Browse People By Name
            </div>
            <div className='col-span-2 uppercase flex justify-center items-center text-blue-600 bg-[#D8D8D8] h-full cursor-pointer text-center'>
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </div>
          </div>
        </div>
        <div className='right-5 lg:right-40 lg:absolute top-32 lg:top-32'>

          {isLoggedIn ? (
            <span className='text-blue-500'>
              <ProfileDropdown UserName={userName} />
            </span>
          ) : (
            <a href="/login">
              <button className='bg-[#CCC2D9] rounded-full py-2 lg:py-4 px-5 lg:px-10 border border-black font-semibold'>
                Log-In
              </button>
            </a>
          )}
        </div>
      </section>
    </>
  );
}
