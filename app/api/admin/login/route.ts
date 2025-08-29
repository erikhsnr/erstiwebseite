import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { loginAdmin, checkRateLimit, validateEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-Mail und Passwort sind erforderlich' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Login-Versuche. Bitte warte 15 Minuten.' },
        { status: 429 }
      )
    }

    // Attempt login
    const result = await loginAdmin(email, password)

    if (!result) {
      return NextResponse.json(
        { error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      )
    }

    // Log successful login
    console.log(`Admin login successful: ${result.admin.email} from IP: ${ip}`)

    // Return token and admin data (without password)
    return NextResponse.json({
      token: result.token,
      admin: {
        id: result.admin.id,
        email: result.admin.email,
        name: result.admin.name,
        isActive: result.admin.isActive,
        createdAt: result.admin.createdAt,
        updatedAt: result.admin.updatedAt
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
