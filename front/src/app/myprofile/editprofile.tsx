import React from 'react';

export default function EditProfile() {
    return (
        <div className='w-full h-full'>
            <div className='w-3/4 h-full mx-auto shadow-xl'>
                <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Profile Picture and Info */}
                    <div className="col-span-1 rounded-lg p-6 flex flex-col items-center">
                        <div className="relative h-36 w-36 mb-4">
                            <img
                                src="https://www.laraibrabbani.net/_next/image?url=%2FLaraib.jpg&w=540&q=90"
                                alt="Profile Picture"
                                className="h-36 w-36 rounded-full object-cover border-4 border-gray-300 shadow-md hover:border-blue-500 transition-colors"
                            />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">First Name</h1>
                        <p className="text-center text-gray-600">There will be Title</p>
                    </div>

                    {/* Form Section */}
                    <div className="col-span-3 bg-gray-50 rounded-lg p-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit User Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="member-id" className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                                <input
                                    type="number"
                                    id="member-id"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="membership-date" className="block text-sm font-medium text-gray-700 mb-1">Membership Date</label>
                                <input
                                    type="text"
                                    id="membership-date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="main-email" className="block text-sm font-medium text-gray-700 mb-1">Main Email</label>
                                <input
                                    type="email"
                                    id="main-email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="main-telephone" className="block text-sm font-medium text-gray-700 mb-1">Main Telephone Number</label>
                                <input
                                    type="tel"
                                    id="main-telephone"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            {/* Additional Fields */}
                            <div>
                                <label htmlFor="office-email" className="block text-sm font-medium text-gray-700 mb-1">Office Email</label>
                                <input
                                    type="email"
                                    id="office-email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="office-tel" className="block text-sm font-medium text-gray-700 mb-1">Office Tel</label>
                                <input
                                    type="tel"
                                    id="office-tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region / State / Province</label>
                                <input
                                    type="text"
                                    id="region"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="office-name" className="block text-sm font-medium text-gray-700 mb-1">Office Name</label>
                                <input
                                    type="text"
                                    id="office-name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
