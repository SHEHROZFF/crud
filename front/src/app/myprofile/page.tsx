"use client"
import React, { useState } from 'react';
import HeaderMain from "../../components/Header";
import ProfileSection from './profilesection';

export default function ProfileMain() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <HeaderMain 
        showSearchBar={false} 
        headerText="User Profile" 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <ProfileSection />
    </>
  );
}
