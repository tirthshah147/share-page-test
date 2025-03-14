'use client'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function LoginPage() {
  const params = useParams()
  const tenant = params.subdomain

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('UseEffect running')
  }, [tenant])

  // Example function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // This is the body of the request, which includes the form data
          body: JSON.stringify({
            title: email,
            body: password,
            userId: 1,
          }),
        },
      )

      // Response from the API
      const data = await response.json()
      console.log('User saved successfully:', data)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
        <h1 className='text-2xl font-semibold text-center mb-4 text-black'>
          {tenant ? `Welcome to ${tenant}` : 'Welcome'}
        </h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email address
            </label>
            <input
              type='email'
              id='email'
              className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
