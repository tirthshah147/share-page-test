import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const authUser = await cookieStore.get('auth-user')?.value

  if (!authUser) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    )
  }

  return NextResponse.json({ success: true, user: JSON.parse(authUser) })
}
