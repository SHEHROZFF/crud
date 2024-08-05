"use client";

import React, { useState, useEffect } from 'react';

export default function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState("https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg");
    const [formData, setFormData] = useState({
        firstname: 'name',
        lastname: 'lname',
        memberId: '123',
        membershipDate: 'meme',
        mainEmail: 'dfahgfda@jfhhg.com',
        mainTelephone: '45464646',
        officeEmail: 'kudzfgz@dgzhfgbdz.com',
        officeTel: '3536454',
        address: 'jkfhkhkjhs',
        city: 'khjxzlhjhg',
        region: 'hznlnhvzlnh',
        officeName: 'hjzhkjv'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // console.log(userId);
    
    // Fetch user profile info on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch('https://crud-wotf-git-main-shehrozs-projects.vercel.app/api/users/request-profile-update/'+ `${userId}`); // Update with your server URL
                if (!response.ok) throw new Error('Failed to fetch profile information.');
                const data = await response.json();

                setFormData(data.message);
                // console.log(data);
                
            } catch (err  : any ) {
                setError(err.message);
            }
        };
        console.log(fetchProfile());
        
        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setError('');
        const userId = localStorage.getItem('userId');
        
        try {
            const response = await fetch('https://crud-wotf-git-main-shehrozs-projects.vercel.app/api/users/verify-and-update-profile/'+ `${userId}`, { // Update with your server URL
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update profile.');

            const result = await response.json();
            console.log('Profile updated successfully:', result);
            setIsEditing(false);
        } catch (err:any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-gray-100 py-10">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Profile Picture and Info */}
                <div className="col-span-1 rounded-lg p-6 flex flex-col items-center">
                    <div className="relative h-36 w-36 mb-4">
                        <img
                            src={profilePicture}
                            alt="Profile Picture"
                            className="h-36 w-36 rounded-full object-cover border-4 border-gray-300 shadow-md hover:border-blue-500 transition-colors"
                        />
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 cursor-pointer">
                                <span className="sr-only">Change Profile Picture</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7M12 5v14M4 8h16"></path>
                                    </svg>
                                </div>
                            </label>
                        )}
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">{formData.firstname}</h1>
                    <p className="text-center text-gray-600">There will be Title</p>
                </div>

                {/* Profile Details */}
                <div className="col-span-3 bg-gray-50 rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstname}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastname}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                            <input
                                type="number"
                                id="memberId"
                                value={formData.memberId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="membershipDate" className="block text-sm font-medium text-gray-700 mb-1">Membership Date</label>
                            <input
                                type="text"
                                id="membershipDate"
                                value={formData.membershipDate}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="mainEmail" className="block text-sm font-medium text-gray-700 mb-1">Main Email</label>
                            <input
                                type="email"
                                id="mainEmail"
                                value={formData.mainEmail}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="mainTelephone" className="block text-sm font-medium text-gray-700 mb-1">Main Telephone Number</label>
                            <input
                                type="tel"
                                id="mainTelephone"
                                value={formData.mainTelephone}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        {/* Additional Fields */}
                        <div>
                            <label htmlFor="officeEmail" className="block text-sm font-medium text-gray-700 mb-1">Office Email</label>
                            <input
                                type="email"
                                id="officeEmail"
                                value={formData.officeEmail}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="officeTel" className="block text-sm font-medium text-gray-700 mb-1">Office Tel</label>
                            <input
                                type="tel"
                                id="officeTel"
                                value={formData.officeTel}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region / State / Province</label>
                            <input
                                type="text"
                                id="region"
                                value={formData.region}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="officeName" className="block text-sm font-medium text-gray-700 mb-1">Office Name</label>
                            <input
                                type="text"
                                id="officeName"
                                value={formData.officeName}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors ${isEditing ? 'hidden' : ''}`}
                        >
                            Edit Profile
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                    {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
                </div>
            </div>
        </div>
    );
}






// import React, { useState } from 'react';

// export default function ProfileSection() {
//     const [isEditing, setIsEditing] = useState(false);
//     const [profilePicture, setProfilePicture] = useState("https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg");
//     const [formData, setFormData] = useState({
//         firstName: 'First Name',
//         lastName: 'Last Name',
//         memberId: '123456',
//         membershipDate: '01/01/2023',
//         mainEmail: 'email@example.com',
//         mainTelephone: '+1234567890',
//         officeEmail: 'office@example.com',
//         officeTel: '+0987654321',
//         address: '123 Address St.',
//         city: 'City Name',
//         region: 'Region Name',
//         officeName: 'Office Name'
//     });

//     const handleEditClick = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProfilePicture(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, value } = event.target;
//         setFormData({
//             ...formData,
//             [id]: value
//         });
//     };

//     return (
//         <div className="h-screen w-full bg-gray-100 py-10">
//             <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-4 gap-8">

//                 {/* Profile Picture and Info */}
//                 <div className="col-span-1 rounded-lg p-6 flex flex-col items-center">
//                     <div className="relative h-36 w-36 mb-4">
//                         <img
//                             src={profilePicture}
//                             alt="Profile Picture"
//                             className="h-36 w-36 rounded-full object-cover border-4 border-gray-300 shadow-md hover:border-blue-500 transition-colors"
//                         />
//                         {isEditing && (
//                             <label className="absolute bottom-2 right-2 cursor-pointer">
//                                 <span className="sr-only">Change Profile Picture</span>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                     className="hidden"
//                                 />
//                                 <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7M12 5v14M4 8h16"></path>
//                                     </svg>
//                                 </div>
//                             </label>
//                         )}
//                     </div>
//                     <h1 className="text-2xl font-semibold text-gray-800 mb-2">{formData.firstName}</h1>
//                     <p className="text-center text-gray-600">There will be Title</p>
//                 </div>

//                 {/* Profile Details */}
//                 <div className="col-span-3 bg-gray-50 rounded-lg p-8">
//                     <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Information</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         <div>
//                             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                             <input
//                                 type="text"
//                                 id="firstName"
//                                 value={formData.firstName}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                             <input
//                                 type="text"
//                                 id="lastName"
//                                 value={formData.lastName}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
//                             <input
//                                 type="number"
//                                 id="memberId"
//                                 value={formData.memberId}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="membershipDate" className="block text-sm font-medium text-gray-700 mb-1">Membership Date</label>
//                             <input
//                                 type="text"
//                                 id="membershipDate"
//                                 value={formData.membershipDate}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="mainEmail" className="block text-sm font-medium text-gray-700 mb-1">Main Email</label>
//                             <input
//                                 type="email"
//                                 id="mainEmail"
//                                 value={formData.mainEmail}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="mainTelephone" className="block text-sm font-medium text-gray-700 mb-1">Main Telephone Number</label>
//                             <input
//                                 type="tel"
//                                 id="mainTelephone"
//                                 value={formData.mainTelephone}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//                                 disabled
//                             />
//                         </div>
//                         {/* Additional Fields */}
//                         <div>
//                             <label htmlFor="officeEmail" className="block text-sm font-medium text-gray-700 mb-1">Office Email</label>
//                             <input
//                                 type="email"
//                                 id="officeEmail"
//                                 value={formData.officeEmail}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="officeTel" className="block text-sm font-medium text-gray-700 mb-1">Office Tel</label>
//                             <input
//                                 type="tel"
//                                 id="officeTel"
//                                 value={formData.officeTel}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                             <input
//                                 type="text"
//                                 id="address"
//                                 value={formData.address}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                             <input
//                                 type="text"
//                                 id="city"
//                                 value={formData.city}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region / State / Province</label>
//                             <input
//                                 type="text"
//                                 id="region"
//                                 value={formData.region}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="officeName" className="block text-sm font-medium text-gray-700 mb-1">Office Name</label>
//                             <input
//                                 type="text"
//                                 id="officeName"
//                                 value={formData.officeName}
//                                 className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
//                                 disabled={!isEditing}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex justify-end mt-6">
//                         <button
//                             type="button"
//                             onClick={handleEditClick}
//                             className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors ${isEditing ? 'hidden' : ''}`}
//                         >
//                             Edit Profile
//                         </button>
//                         {isEditing && (
//                             <button
//                                 type="button"
//                                 onClick={handleEditClick}
//                                 className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors"
//                             >
//                                 Save Changes
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
