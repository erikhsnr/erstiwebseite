import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'
import { Admin } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(adminId: string): string {
  return jwt.sign(
    { adminId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// Verify JWT token
export function verifyToken(token: string): { adminId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string }
    return decoded
  } catch (error) {
    return null
  }
}

// Get admin from token
export async function getAdminFromToken(token: string): Promise<Admin | null> {
  try {
    const decoded = verifyToken(token)
    if (!decoded) return null

    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.adminId,
        isActive: true
      }
    })

    return admin
  } catch (error) {
    return null
  }
}

// Middleware to check authentication
export async function authenticateAdmin(request: NextRequest): Promise<Admin | null> {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    return getAdminFromToken(token)
  } catch (error) {
    return null
  }
}

// Get token from cookies
export function getTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get('admin-token')?.value || null
}

// Authenticate admin from cookies
export async function authenticateAdminFromCookies(request: NextRequest): Promise<Admin | null> {
  try {
    const token = getTokenFromCookies(request)
    if (!token) return null

    return getAdminFromToken(token)
  } catch (error) {
    return null
  }
}

// Login admin
export async function loginAdmin(email: string, password: string): Promise<{ admin: Admin; token: string } | null> {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email.toLowerCase(),
        isActive: true
      }
    })

    if (!admin) {
      return null
    }

    const isValidPassword = await verifyPassword(password, admin.password)
    if (!isValidPassword) {
      return null
    }

    const token = generateToken(admin.id)

    return {
      admin: {
        ...admin,
        password: '' // Don't return password
      },
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

// Create admin
export async function createAdmin(email: string, password: string, name: string): Promise<Admin | null> {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingAdmin) {
      throw new Error('Admin with this email already exists')
    }

    const hashedPassword = await hashPassword(password)

    const admin = await prisma.admin.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name
      }
    })

    return {
      ...admin,
      password: '' // Don't return password
    }
  } catch (error) {
    console.error('Create admin error:', error)
    return null
  }
}

// Password validation
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export function checkRateLimit(identifier: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(identifier)

  if (!attempts) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Reset if window has passed
  if (now - attempts.lastAttempt > windowMs) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Check if limit exceeded
  if (attempts.count >= maxAttempts) {
    return false
  }

  // Increment attempts
  attempts.count++
  attempts.lastAttempt = now
  loginAttempts.set(identifier, attempts)

  return true
}

// Clear rate limit for identifier
export function clearRateLimit(identifier: string): void {
  loginAttempts.delete(identifier)
}

// Get remaining rate limit time
export function getRateLimitInfo(identifier: string, windowMs = 15 * 60 * 1000): { blocked: boolean; remainingTime?: number } {
  const attempts = loginAttempts.get(identifier)

  if (!attempts) {
    return { blocked: false }
  }

  const now = Date.now()
  const timePassed = now - attempts.lastAttempt

  if (timePassed > windowMs) {
    return { blocked: false }
  }

  if (attempts.count >= 5) {
    return {
      blocked: true,
      remainingTime: windowMs - timePassed
    }
  }

  return { blocked: false }
}
