import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdminFromCookies, getTokenFromCookies, getAdminFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Try to get token from Authorization header first
    const authHeader = request.headers.get('authorization')
    const bearerToken = authHeader?.replace('Bearer ', '')

    // If no bearer token, try cookies
    const cookieToken = getTokenFromCookies(request)

    const token = bearerToken || cookieToken

    if (!token) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }

    // Get admin from token
    const admin = await getAdminFromToken(token)

    if (!admin) {
      return NextResponse.json(
        { error: 'Ungültiger Token' },
        { status: 401 }
      )
    }

    // Return admin data (without password)
    return NextResponse.json({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
