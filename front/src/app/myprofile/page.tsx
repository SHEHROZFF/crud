import React from 'react'
import HeaderMain from "../../components/Header";
import ProfileSection from './profilesection';
export default function ProfileMain() {
  return (
    <>
      <HeaderMain showSearchBar={false} headerText="User Profile " searchQuery={''} setSearchQuery={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } } />
      <ProfileSection />
    </>
  )
}
