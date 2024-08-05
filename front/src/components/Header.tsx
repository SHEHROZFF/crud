"use client";
import React from 'react';
import ProfileDropdown from './dropdown';

interface HeaderMainProps {
  showSearchBar?: boolean;
  headerText?: string;
}

export default function HeaderMain({ showSearchBar = true, headerText }: HeaderMainProps) {
  const isLoggedIn = true;

  return (
    <header className='w-full flex flex-col items-center justify-center gap-y-3 bg-gray-100'>
      <div className='w-[85%] flex items-center justify-between p-5 '>
        <h1 className='text-2xl text-blue-500 uppercase tracking-widest font-semibold'>
          Company
        </h1>
        <div className='flex gap-x-5 items-center'>
          <div className="relative">
            <input
              type="search"
              name=""
              id=""
              className="px-5 py-3 focus:outline-none rounded-full w-[450px] shadow-md"
              placeholder="Search Member by ID, Name"
            />
           <div className='w-8 h-8 rounded-full bg-blue-500 absolute right-5 top-1/2 -translate-y-1/2 flex justify-center items-center'>
           <i className="fas fa-search  transform  text-white"></i>
           </div>
          </div>
          <a href="/login">
          <button className='bg-blue-500 text-white w-20 h-10 rounded-md hover:-translate-y-1 hover:transition transition'>
            Login
          </button>
          </a>
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
