'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { useApp, useToast } from '@/app/providers'
import { AdminLoginData } from '@/types'
import { isValidEmail } from '@/lib/utils'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState<AdminLoginData>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0)

  const router = useRouter()
  const { state, dispatch } = useApp()
  const { addToast } = useToast()

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      router.push('/admin')
    }
  }, [state.isAuthenticated, router])

  // Handle block timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isBlocked && blockTimeRemaining > 0) {
      interval = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isBlocked, blockTimeRemaining])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein'
    }

    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof AdminLoginData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      addToast({
        type: 'error',
        title: 'Login blockiert',
        message: `Zu viele fehlgeschlagene Versuche. Warte ${Math.ceil(blockTimeRemaining / 60)} Minuten.`
      })
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and admin data
        localStorage.setItem('admin-token', data.token)
        dispatch({ type: 'SET_ADMIN', payload: data.admin })

        addToast({
          type: 'success',
          title: 'Login erfolgreich',
          message: `Willkommen zurück, ${data.admin.name}!`
        })

        // Reset login attempts
        setLoginAttempts(0)
        setIsBlocked(false)

        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        if (newAttempts >= 5) {
          setIsBlocked(true)
          setBlockTimeRemaining(15 * 60) // 15 minutes
          addToast({
            type: 'error',
            title: 'Account blockiert',
            message: 'Zu viele fehlgeschlagene Login-Versuche. Account ist für 15 Minuten blockiert.'
          })
        } else {
          addToast({
            type: 'error',
            title: 'Login fehlgeschlagen',
            message: data.error || 'Ungültige Anmeldedaten'
          })
        }
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Verbindungsfehler',
        message: 'Fehler beim Verbinden zum Server. Bitte versuche es später erneut.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600">
            Melde dich an, um das Admin-Dashboard zu verwalten
          </p>
        </div>

        {/* Login attempts warning */}
        {loginAttempts > 0 && !isBlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert alert-warning"
          >
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
            <span>
              {loginAttempts === 1 && 'Falsches Passwort. Noch 4 Versuche.'}
              {loginAttempts === 2 && 'Falsches Passwort. Noch 3 Versuche.'}
              {loginAttempts === 3 && 'Falsches Passwort. Noch 2 Versuche.'}
              {loginAttempts === 4 && 'Letzter Versuch! Account wird bei nächstem Fehler blockiert.'}
            </span>
          </motion.div>
        )}

        {/* Blocked warning */}
        {isBlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert alert-error"
          >
            <LockClosedIcon className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-medium">Account blockiert</div>
              <div className="text-sm">
                Verbleibende Zeit: {formatTime(blockTimeRemaining)}
              </div>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label required">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="admin@hs-niederrhein.de"
                  disabled={isSubmitting || isBlocked}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label required">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Dein sicheres Passwort"
                  disabled={isSubmitting || isBlocked}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isSubmitting || isBlocked}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isBlocked}
            className="btn btn-primary w-full btn-lg"
          >
            {isSubmitting ? (
              <>
                <div className="spinner mr-2" />
                Anmeldung läuft...
              </>
            ) : isBlocked ? (
              <>
                <LockClosedIcon className="w-5 h-5 mr-2" />
                Blockiert ({formatTime(blockTimeRemaining)})
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                Anmelden
              </>
            )}
          </button>
        </form>

        {/* Security Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <ShieldCheckIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Sicherheitshinweis</p>
              <p>
                Nach 5 fehlgeschlagenen Login-Versuchen wird der Account für 15 Minuten blockiert.
                Alle Login-Versuche werden protokolliert.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-2">Demo-Zugangsdaten:</p>
              <p><strong>E-Mail:</strong> admin@hs-niederrhein.de</p>
              <p><strong>Passwort:</strong> Admin123!</p>
            </div>
          </div>
        )}

        {/* Back to Homepage */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-orange-600 hover:text-orange-700 transition-colors text-sm"
          >
            ← Zurück zur Startseite
          </button>
        </div>
      </motion.div>
    </div>
  )
}
