import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Loader from '../../public/lottie_loader.json';

// Define the type for a member
// interface Member {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   acronym: string;
//   association: string;
//   promotionYear: number;
//   country: string;
// }

const Table: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Update with your server URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: any = await response.json();
        // console.log(result);
        
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Lottie loop={true} animationData={Loader} />
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

  return (
    <section className='w-full'>
      <div className='container mx-auto px-4 py-6'>
        <div className='overflow-x-auto'>
          <p className='font-medium text-lg capitalize'>List of Members:</p>
          <table className='min-w-full shadow-md rounded-xl bg-white'>
            <thead className='bg-gray-200 text-gray-700 rounded-md'>
              <tr>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Member ID</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>First Name</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Last Name</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Assoc. Acronym</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Association</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Promotion Year</th>
                <th className='font-normal py-3 px-4 border-b border-gray-300'>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className='py-3 px-4 border-b border-gray-300 text-center'>
                    <p className='mt-2 text-gray-500'>No data available</p>
                  </td>
                </tr>
              ) : (
                data.map((member : any ) => (
                  <tr key={member.id} className='hover:bg-gray-100'>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member._id}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.firstname}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.lastname}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.acronym}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.association}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.promotionYear}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.region}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
