'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Admin, Event, Registration } from '@/types'

// Types for the global state
interface AppState {
  admin: Admin | null
  isAuthenticated: boolean
  events: Event[]
  registrations: Registration[]
  loading: boolean
  error: string | null
}

// Action types
type AppAction =
  | { type: 'SET_ADMIN'; payload: Admin | null }
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'SET_REGISTRATIONS'; payload: Registration[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'ADD_REGISTRATION'; payload: Registration }
  | { type: 'UPDATE_REGISTRATION'; payload: Registration }
  | { type: 'DELETE_REGISTRATION'; payload: string }
  | { type: 'LOGOUT' }

// Initial state
const initialState: AppState = {
  admin: null,
  isAuthenticated: false,
  events: [],
  registrations: [],
  loading: false,
  error: null,
}

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: !!action.payload,
      }
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
      }
    case 'SET_REGISTRATIONS':
      return {
        ...state,
        registrations: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      }
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      }
    case 'ADD_REGISTRATION':
      return {
        ...state,
        registrations: [...state.registrations, action.payload],
      }
    case 'UPDATE_REGISTRATION':
      return {
        ...state,
        registrations: state.registrations.map(registration =>
          registration.id === action.payload.id ? action.payload : registration
        ),
      }
    case 'DELETE_REGISTRATION':
      return {
        ...state,
        registrations: state.registrations.filter(registration => registration.id !== action.payload),
      }
    case 'LOGOUT':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Toast context for notifications
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Omit<Toast, 'id'> }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_TOASTS' }

const toastInitialState: ToastState = {
  toasts: [],
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            ...action.payload,
            id: Math.random().toString(36).substr(2, 9),
          },
        ],
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      }
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: [],
      }
    default:
      return state
  }
}

const ToastContext = createContext<{
  state: ToastState
  dispatch: React.Dispatch<ToastAction>
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
} | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Theme context for future dark mode support
interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  actualTheme: 'light' | 'dark'
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_ACTUAL_THEME'; payload: 'light' | 'dark' }

const themeInitialState: ThemeState = {
  theme: 'system',
  actualTheme: 'light',
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'SET_ACTUAL_THEME':
      return {
        ...state,
        actualTheme: action.payload,
      }
    default:
      return state
  }
}

const ThemeContext = createContext<{
  state: ThemeState
  dispatch: React.Dispatch<ThemeAction>
  setTheme: (theme: 'light' | 'dark' | 'system') => void
} | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Combined providers component
export function Providers({ children }: { children: ReactNode }) {
  const [appState, appDispatch] = useReducer(appReducer, initialState)
  const [toastState, toastDispatch] = useReducer(toastReducer, toastInitialState)
  const [themeState, themeDispatch] = useReducer(themeReducer, themeInitialState)

  // Toast helper functions
  const addToast = (toast: Omit<Toast, 'id'>) => {
    toastDispatch({ type: 'ADD_TOAST', payload: toast })

    // Auto-remove toast after duration
    setTimeout(() => {
      toastDispatch({ type: 'REMOVE_TOAST', payload: toast.id || '' })
    }, toast.duration || 5000)
  }

  const removeToast = (id: string) => {
    toastDispatch({ type: 'REMOVE_TOAST', payload: id })
  }

  const clearToasts = () => {
    toastDispatch({ type: 'CLEAR_TOASTS' })
  }

  // Theme helper functions
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    themeDispatch({ type: 'SET_THEME', payload: theme })
    localStorage.setItem('theme', theme)

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      themeDispatch({ type: 'SET_ACTUAL_THEME', payload: systemTheme })
    } else {
      themeDispatch({ type: 'SET_ACTUAL_THEME', payload: theme })
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('system')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeState.theme === 'system') {
        themeDispatch({ type: 'SET_ACTUAL_THEME', payload: e.matches ? 'dark' : 'light' })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [themeState.theme])

  // Check for saved admin session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('admin-token')
        if (token) {
          const response = await fetch('/api/admin/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const admin = await response.json()
            appDispatch({ type: 'SET_ADMIN', payload: admin })
          } else {
            // Invalid token, remove it
            localStorage.removeItem('admin-token')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('admin-token')
      }
    }

    checkAuthStatus()
  }, [])

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <ToastContext.Provider
        value={{
          state: toastState,
          dispatch: toastDispatch,
          addToast,
          removeToast,
          clearToasts
        }}
      >
        <ThemeContext.Provider
          value={{
            state: themeState,
            dispatch: themeDispatch,
            setTheme
          }}
        >
          {children}
          {/* Toast container */}
          <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            {toastState.toasts.map((toast) => (
              <div
                key={toast.id}
                className={`p-4 rounded-lg shadow-lg border transition-all duration-300 transform ${
                  toast.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : toast.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : toast.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{toast.title}</h4>
                    {toast.message && (
                      <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="ml-2 flex-shrink-0 text-current opacity-50 hover:opacity-75"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ThemeContext.Provider>
      </ToastContext.Provider>
    </AppContext.Provider>
  )
}
