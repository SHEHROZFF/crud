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
    <div className='w-full bg-gray-100 h-screen flex justify-center items-center px-4 py-6'>
  <div className='max-w-xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-6'>
    <div className='flex flex-col items-center'>
      <div className='w-40 h-40 rounded-full bg-blue-200 text-gray-700 mb-6 flex items-center justify-center'>
        <span className='text-4xl font-bold'>
          {user.firstname.charAt(0)}{user.lastname.charAt(0)}
        </span>
      </div>
      <h2 className='text-3xl font-bold text-gray-800 mb-2 capitalize'>
        {user.firstname} {user.lastname}
      </h2>
      <p className='text-gray-600 mb-4'>{user.assoc}</p>
    </div>
    <div className='space-y-4'>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>Member ID:</span>
        <span className='text-gray-900 font-medium'>{user._id}</span>
      </div>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>First Name:</span>
        <span className='text-gray-900 font-medium capitalize'>{user.firstname}</span>
      </div>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>Last Name:</span>
        <span className='text-gray-900 font-medium capitalize'>{user.lastname}</span>
      </div>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>Country:</span>
        <span className='text-gray-900 font-medium'>{user.region}</span>
      </div>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>Membership Date:</span>
        <span className='text-gray-900 font-medium'>{user.membershipDate}</span>
      </div>
      <div className='flex justify-between items-center border-b pb-2'>
        <span className='font-medium text-gray-700'>Email:</span>
        <span className='text-gray-900 font-medium'>{user.mainEmail}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='font-medium text-gray-700'>Cell:</span>
        <span className='text-gray-900 font-medium'>{user.mainTelephone}</span>
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
