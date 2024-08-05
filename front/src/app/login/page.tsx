"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [mainEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!verification) {
      setError('Please check the verification box');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Please enter the verification token');
      setLoading(false);
      return;
    }

    try {
<<<<<<< HEAD
      const response = await fetch('https://crud-wotf-git-main-shehrozs-projects.vercel.app/api/users/login', {
=======
      const response = await fetch('http://localhost:5000/api/users/login', { // Update with your server URL
>>>>>>> aef45269fe662379bc91f115c61cc2853be37331
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mainEmail, password, token }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      console.log('Login successful', result._id);
      localStorage.setItem('userId', result._id);
      router.push('/myprofile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={mainEmail}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='space-x-2'>
            <input
              type="checkbox"
              id="verification"
              checked={verification}
              onChange={(e) => setVerification(e.target.checked)}
            />
            <label htmlFor="verification" className='text-sm text-blue-500'>
              Verification
            </label>
          </div>
          {verification && (
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-600">Verification Token</label>
              <input
                type="number"
                id="token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                placeholder="Enter 6 character token"
                className="w-full px-4 py-2 border border-gray-300 border-t-0 border-l-0 border-r-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-t-0 focus:border-l-0 focus:border-r-0"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
