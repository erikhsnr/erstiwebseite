'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const importantLinks = [
  {
    title: 'Hochschule Niederrhein',
    description: 'Offizielle Homepage',
    href: 'https://www.hs-niederrhein.de',
    external: true
  },
  {
    title: 'Studiengang',
    description: 'Informatik Bachelor',
    href: 'https://www.hs-niederrhein.de/informatik',
    external: true
  },
  {
    title: 'Studienkalender',
    description: 'Termine & Fristen',
    href: 'https://www.hs-niederrhein.de/studium/studienorganisation/termine-und-fristen',
    external: true
  }
]

const socialLinks = [
  {
    name: 'FSR Instagram',
    href: 'https://instagram.com/fsr_informatik_hn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.204c-.315 0-.595-.122-.805-.332-.21-.21-.332-.49-.332-.805s.122-.595.332-.805c.21-.21.49-.332.805-.332s.595.122.805.332c.21.21.332.49.332.805s-.122.595-.332.805c-.21.21-.49.332-.805.332zm-.122 1.679c1.297 0 2.448.49 3.323 1.297.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.827-1.418-1.978-1.418-3.275s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297z"/>
      </svg>
    )
  },
  {
    name: 'Hochschule Instagram',
    href: 'https://instagram.com/hs_niederrhein',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.204c-.315 0-.595-.122-.805-.332-.21-.21-.332-.49-.332-.805s.122-.595.332-.805c.21-.21.49-.332.805-.332s.595.122.805.332c.21.21.332.49.332.805s-.122.595-.332.805c-.21.21-.49.332-.805.332zm-.122 1.679c1.297 0 2.448.49 3.323 1.297.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.827-1.418-1.978-1.418-3.275s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297z"/>
      </svg>
    )
  }
]

const quickLinks = [
  { name: 'Veranstaltungen', href: '/events' },
  { name: 'Kontakt', href: '/contact' },
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' }
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-wide mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <span className="text-xl font-bold">Erstiwoche</span>
                <span className="text-orange-400 ml-1">2025</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Dein perfekter Start ins Studium an der Hochschule Niederrhein.
              Vom 22. bis 26. September 2025.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Wichtige Links</h3>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block group"
                  >
                    <div className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors duration-200">
                      {link.title}
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                      {link.description}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <div>Hochschule Niederrhein</div>
                  <div>Reinarzstraße 49</div>
                  <div>47805 Krefeld</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a
                  href="tel:+492151822-0"
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  +49 2151 822-0
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:erstiwoche@hs-niederrhein.de"
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  erstiwoche@hs-niederrhein.de
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Hochschule Niederrhein. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-400" />
              <span>für die Erstis</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
