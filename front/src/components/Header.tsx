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
    <header className='w-full flex flex-col items-center justify-center gap-y-3 bg-gray-100'>
      <div className='w-[85%] flex items-center justify-between p-5 '>
        <a href="/">
          <h1 className='text-2xl text-blue-500 uppercase tracking-widest font-semibold'>
            Company
          </h1>
        </a>
        <div className='flex gap-x-5 items-center'>
          {showSearchBar && (
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-5 py-3 focus:outline-none rounded-full w-[450px] shadow-md"
                placeholder="Search Member by ID, Name"
              />
              <div className='w-8 h-8 rounded-full bg-blue-500 absolute right-5 top-1/2 -translate-y-1/2 flex justify-center items-center'>
                <i className="fas fa-search text-white"></i>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <span className='text-blue-500'>
             
              <ProfileDropdown UserName={userName} />
            </span>
          ) : (
            <a href="/login">
              <button className='bg-blue-500 text-white w-20 h-10 rounded-md hover:-translate-y-1 hover:transition transition'>
                Login
              </button>
            </a>
          )}
          <select
            name="language"
            id="language"
            className="rounded-md focus:outline-none w-10 h-10"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
    </header>
  );
}
