"use client"
import React, { useState, useEffect } from 'react';

interface TableViewProps {
  searchQuery: string;
}

const TableView: React.FC<TableViewProps> = ({ searchQuery }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  const response = await fetch('http://localhost:5000/api/users'); 

        const response = await fetch('https://crud-78ii.vercel.app/api/users');



        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: any = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((member: any) =>
    member._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center font-semibold'>
        Loading Please Wait...
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
    <section className='w-full h-full'>
      <div className='container mx-auto px-4 py-6'>
        <div className='overflow-x-auto'>
          <p className='font-medium text-lg capitalize'>List of Members:</p>
          <table className='min-w-full shadow-md rounded-xl bg-white'>
            <thead className='bg-gray-200 text-gray-700 rounded-md'>
              <tr>
                <th className='font-medium py-3 px-4 border-b border-gray-300 '>Member ID</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>First Name</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>Last Name</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>Assoc. Acronym</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>Association</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>Promotion Year</th>
                <th className='font-medium py-3 px-4 border-b border-gray-300'>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className='py-3 px-4 border-b border-gray-300 text-center'>
                    <p className='mt-2 text-gray-500'>No data available</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((member: any) => (
                  <tr key={member._id} className='hover:bg-gray-100'>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member._id}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.firstname}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.lastname}</td>
                    <td className='py-3 px-4 border-b border-gray-300 text-center'>{member.assoc}</td>
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

export default TableView;
