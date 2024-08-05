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
<<<<<<< HEAD
}
=======
}
>>>>>>> 28fb3603838862b44977ad263492c05acb43ae32
