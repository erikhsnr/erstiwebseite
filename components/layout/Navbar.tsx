'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, CalendarDaysIcon, HomeIcon, EnvelopeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useApp } from '@/app/providers'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Veranstaltungen', href: '/events', icon: CalendarDaysIcon },
  { name: 'Kontakt', href: '/contact', icon: EnvelopeIcon },
  { name: 'Impressum', href: '/impressum', icon: DocumentTextIcon },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { state } = useApp()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="container-wide mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Erstiwoche
              </span>
              <span className="text-orange-600 ml-1">2025</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${active ? 'nav-link-active' : ''} flex items-center space-x-1`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Admin Link */}
            {state.isAuthenticated ? (
              <Link
                href="/admin"
                className="btn btn-outline btn-sm"
              >
                Admin
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="btn btn-ghost btn-sm"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 focus-ring"
            aria-expanded="false"
          >
            <span className="sr-only">Hauptmenü öffnen</span>
            {isOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        active
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                      } flex items-center space-x-2`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}

                {/* Mobile Admin Link */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  {state.isAuthenticated ? (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/admin/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                    >
                      Admin Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress bar for scroll position */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400"
        style={{
          scaleX: isScrolled ? 1 : 0,
          transformOrigin: 'left'
        }}
        transition={{ duration: 0.3 }}
      />
    </header>
  )
}
