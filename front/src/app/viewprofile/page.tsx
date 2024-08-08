"use client"
import React, { useState } from 'react';
import HeaderMain from "../../components/Header";
import dynamic from 'next/dynamic';

const UserProfile = dynamic(() => import('./userprofile'), { ssr: false });

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <HeaderMain 
        showSearchBar={true} 
        headerText="User Profile" 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <UserProfile />
    </>
  );
}
