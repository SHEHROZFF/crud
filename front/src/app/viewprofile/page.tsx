import React from 'react';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('./userprofile'), { ssr: false });

const Page: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </React.Suspense>
  );
};

export default Page;
