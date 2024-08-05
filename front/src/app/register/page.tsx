"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    region: '',
    mainTelephone:'',
    mainEmail: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch('https://crud-wotf-git-main-shehrozs-projects.vercel.appapi/users/register', { // Update with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful', result);
      // Redirect or show success message
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              placeholder="Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-600">Telephone</label>
            <input
              type="tel"
              id="mainTelephone"
              name="mainTelephone"
              value={formData.mainTelephone}
              onChange={handleChange}
              required
              placeholder="+1243642314"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="mainEmail"
              name="mainEmail"
              value={formData.mainEmail}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}







// import React from 'react';

// export default function RegisterPage() {

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
//         <form className="space-y-4">
//           <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-4">
//             <div>
//               <label htmlFor="first-name" className="block text-sm font-medium text-gray-600">First Name</label>
//               <input
//                 type="text"
//                 id="first-name"
//                 name="first-name"
//                 required
//                 placeholder="John"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="last-name" className="block text-sm font-medium text-gray-600">Last Name</label>
//               <input
//                 type="text"
//                 id="last-name"
//                 name="last-name"
//                 required
//                 placeholder="Doe"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
//             <input
//               type="text"
//               id="country"
//               name="country"
//               required
//               placeholder="Country"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
