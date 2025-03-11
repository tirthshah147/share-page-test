import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Dummy users list
const users = [
  {
    id: 1,
    username: 'Alice',
    password: 'alice123',
    role: 'Admin',
    projects: ['Project A', 'Project B'],
  },
  {
    id: 2,
    username: 'BoB',
    password: 'bob123',
    role: 'Manager',
    projects: ['Project C'],
  },
  {
    id: 3,
    username: 'Charlie',
    password: 'charlie123',
    role: 'Editor',
    projects: ['Project D', 'Project E'],
  },
  {
    id: 4,
    username: 'David',
    password: 'david123',
    role: 'Viewer',
    projects: ['Project F'],
  },
  { id: 5, username: 'Emma', password: 'emma123', role: 'Guest', projects: [] },
]

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const user = users.find(
    (u) => u.username === username && u.password === password,
  )

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 },
    )
  }

  const cookieStore = await cookies()

  // Store user details in cookies
  cookieStore.set('auth-user', JSON.stringify(user), {
    httpOnly: true,
    path: '/',
  })

  return NextResponse.json({ success: true, message: 'Login successful', user })
}
