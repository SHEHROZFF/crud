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
    <header className='w-full flex flex-col items-center justify-center gap-y-3'>
      <div className='w-[75%] flex gap-x-5 items-center justify-between'>
        <img
          src="https://marketplace.canva.com/EAE-ijirxZc/1/0/1600w/canva-black-%26-white-simple-initial-circle-badge-logo-GlLGxBQNAH4.jpg"
          height={50}
          width={50}
          alt="Association Logo"
        />

        <div className='flex gap-x-8 items-center'>
          <select
            name="language"
            id="language"
            className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none"
          >
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>

          {isLoggedIn ? (
            <div className='flex items-center gap-x-4 cursor-pointer'>
              <ProfileDropdown />
            </div>
          ) : (
            <a href="/login">
              <button className='px-5 py-1 border border-gray-800 rounded-lg'>
                Login
              </button>
            </a>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-32 bg-gray-800 px-10">
        {showSearchBar ? (
          <>
            <div className="relative w-1/3">
              <input
                type="search"
                name=""
                id=""
                className="w-full px-5 py-3 focus:outline-none rounded-full bg-gray-700 text-white pl-12"
                placeholder="Search Member"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </>
        ) : (
          <span className="text-white text-center w-full font-bold text-4xl">{headerText}</span>
        )}
      </div>
    </header>
  );
}
