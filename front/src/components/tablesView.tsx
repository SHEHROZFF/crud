"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface TableViewProps {
  searchQuery: string;
}

const TableView: React.FC<TableViewProps> = ({ searchQuery }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:5000/api/users'); 
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

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle row click
  const handleRowClick = (userId: string) => {
    router.push(`/viewprofile?id=${userId}`); // Navigate to profile page with userId
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
                    onClick={() => handleRowClick(member._id)} // Handle row click
                  >
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
          {/* Pagination Controls */}
          <div className='mt-4 flex justify-center gap-x-1 items-center'>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:-translate-x-1 transition cursor-pointer'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`w-10 h-10 ${currentPage === index + 1 ? 'bg-blue-400 text-white' : 'bg-gray-300 text-gray-700'} rounded-full border-0 shadow-md`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:translate-x-1 transition cursor-pointer'
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
