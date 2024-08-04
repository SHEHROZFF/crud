import React from 'react'
import HeaderMain from "../../components/Header";
import ProfileSection from './profilesection';
import EditProfile from './editprofile';
export default function ProfileMain() {
  return (
    <>
      <HeaderMain showSearchBar={false} headerText="User Profile " />
      <ProfileSection />
      {/* <EditProfile /> */}
    </>
  )
}
