"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TableViewProps {
  searchQuery: string;
}

const TableView: React.FC<TableViewProps> = ({ searchQuery }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (userId: string) => {
    router.push(`/viewprofile?id=${userId}`);
  };

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
          <p className='my-5 font-medium text-3xl lg:text-5xl text-center uppercase bg-[#D8D8D8] h-16 flex justify-center items-center'>
            List of Member with Summary Information
          </p>
          <table className='min-w-full shadow-md bg-white'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Member ID
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  First Name
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Last Name
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Assoc. Acronym
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Association
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Promotion Year
                </th>
                <th className='font-medium py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 bg-[#94A3D0] text-black text-xs lg:text-base'>
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className='py-3 px-4 border-b border-gray-300 text-center'>
                    <p className='mt-2 text-gray-500'>No data available</p>
                  </td>
                </tr>
              ) : (
                currentItems.map((member: any) => (
                  <tr
                    key={member._id}
                    className='hover:bg-gray-100 cursor-pointer'
                    onClick={() => handleRowClick(member._id)}
                  >
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-green-600 text-xs lg:text-base'>
                      {member._id}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.firstname}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.lastname}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.assoc}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.association}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.promotionYear}
                    </td>
                    <td className='py-2 px-2 lg:py-3 lg:px-4 border-b border-gray-300 text-center underline text-blue-500 text-xs lg:text-base'>
                      {member.region}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className='mt-4 flex flex-col sm:flex-row justify-start items-center gap-x-2'>
            <button
              className='px-4 py-2 bg-[#D8D8D8] text-blue-500 underline hover:-translate-x-1 transition cursor-pointer mb-2 sm:mb-0'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className='flex gap-1'>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 text-xs sm:text-sm ${currentPage === index + 1 ? 'bg-[#D8D8D8] text-blue-500 underline' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className='px-4 py-2 bg-[#D8D8D8] text-blue-500 underline hover:translate-x-1 transition cursor-pointer'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableView;
