"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Profile: React.FC = () => {
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
    <div className='w-1/4 mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold mb-6 text-center'></h1>
      <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-4'>
        <div className='flex flex-col items-center'>
          <div className='w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center'>
            {/* Placeholder for user avatar */}
            <span className='text-2xl font-semibold text-gray-500'>
              {user.firstname.charAt(0)}{user.lastname.charAt(0)}
            </span>
          </div>
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>{user.firstname} {user.lastname}</h2>
          <p className='text-gray-600 mb-4'>{user.assoc}</p>
        </div>
        <div className='space-y-4'>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Member ID:</span>
            <span className='text-gray-900'>{user._id}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>First Name:</span>
            <span className='text-gray-900'>{user.firstname}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Last Name:</span>
            <span className='text-gray-900'>{user.lastname}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Country:</span>
            <span className='text-gray-900'>{user.region}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Membership Date:</span>
            <span className='text-gray-900'>{user.membershipDate}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Email:</span>
            <span className='text-gray-900'>{user.mainEmail}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-700'>Cell:</span>
            <span className='text-gray-900'>{user.mainTelephone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
