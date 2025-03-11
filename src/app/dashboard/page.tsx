'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<{
    username: string
    role: string
    projects: string[]
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      const res = await fetch('/api/me')
      const data = await res.json()

      if (!data.success) {
        router.push('/login') // Redirect to login if not authenticated
        return
      }

      setUser(data.user)
    }

    fetchUserData()
  }, [])

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-semibold text-center mb-4'>Dashboard</h2>

        {user ? (
          <div>
            <p className='text-lg font-medium text-gray-700'>
              Username: {user.username}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Role: {user.role}
            </p>

            <h3 className='mt-4 text-lg font-semibold'>Projects:</h3>
            {user.projects.length > 0 ? (
              <ul className='list-disc pl-5'>
                {user.projects.map((project, index) => (
                  <li key={index} className='text-gray-600'>
                    {project}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-500'>No projects assigned.</p>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  )
}
