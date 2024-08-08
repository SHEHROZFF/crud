"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MyLabel from '@/components/label';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await fetch(`https://crud-78ii.vercel.app/api/users/request-profile-update/${id}`);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          if (result.message) {
            setUser(result.message); // Adjust if your response structure differs
          } else {
            throw new Error('No user data found');
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user ID provided');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center font-semibold'>
        Loading User Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p className='text-gray-500'>No user found</p>
      </div>
    );
  }

  return (
    <>
      <section className='w-1/2 h-full mx-auto'>
        <div className='grid grid-cols-4 mx-auto p-5 h-96 items-center gap-x-8'>
          <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="" className='w-52 h-52 col-span-1' />
          <div className='col-span-1 flex flex-col gap-y-8'>
            <MyLabel inputValue={user.firstname} labelText='First name' myplaceholder='First name' />
            <MyLabel inputValue={user.lastname} labelText='last name' myplaceholder='last name' />
            <MyLabel inputValue={user.region} labelText='Region' myplaceholder='Region' />
            <MyLabel inputValue={user.yourTitle} labelText='Title' myplaceholder='Title' />
          </div>
          <div className='col-span-2 flex flex-col gap-y-8'>
            <MyLabel inputValue={user._id} labelText='Member ID' myplaceholder='Member ID' />
            <MyLabel inputValue={user.mainEmail} labelText='Email' myplaceholder='Email' />
            <MyLabel inputValue={user.mainTelephone} labelText='Cell' myplaceholder='Cell' />
            <MyLabel inputValue={user.membershipDate} labelText='Cell' myplaceholder='Membership Date' />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
