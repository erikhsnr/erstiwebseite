'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { ContactFormData } from '@/types'
import { isValidEmail } from '@/lib/utils'

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Betreff ist erforderlich'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
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

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        const data = await response.json()
        setError(data.error || 'Fehler beim Senden der Nachricht')
      }
    } catch (err) {
      setError('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'E-Mail',
      details: 'erstiwoche@hs-niederrhein.de',
      href: 'mailto:erstiwoche@hs-niederrhein.de'
    },
    {
      icon: PhoneIcon,
      title: 'Telefon',
      details: '+49 2151 822-0',
      href: 'tel:+492151822-0'
    },
    {
      icon: MapPinIcon,
      title: 'Adresse',
      details: 'Hochschule Niederrhein\nReinarzstraße 49\n47805 Krefeld',
      href: 'https://maps.google.com/?q=Hochschule+Niederrhein+Krefeld'
    },
    {
      icon: ClockIcon,
      title: 'Bürozeiten',
      details: 'Mo-Fr: 9:00 - 16:00 Uhr\nSa-So: Geschlossen',
      href: null
    }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nachricht gesendet!
          </h2>
          <p className="text-gray-600 mb-6">
            Vielen Dank für deine Nachricht. Wir werden uns so schnell wie möglich bei dir melden.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-primary"
          >
            Weitere Nachricht senden
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container-wide mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontakt
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Hast du Fragen zur Erstiwoche? Wir helfen gerne weiter!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card"
              >
                <div className="card-header">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Nachricht senden
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Fülle das Formular aus und wir melden uns schnellstmöglich bei dir.
                  </p>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-error mb-6">
                      <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label required">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Dein vollständiger Name"
                        />
                        {errors.name && (
                          <p className="form-error">{errors.name}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label required">
                          E-Mail-Adresse *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="deine@email.de"
                        />
                        {errors.email && (
                          <p className="form-error">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label required">
                        Betreff *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                        placeholder="Worum geht es?"
                      />
                      {errors.subject && (
                        <p className="form-error">{errors.subject}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label required">
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`form-textarea ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Beschreibe dein Anliegen..."
                      />
                      {errors.message && (
                        <p className="form-error">{errors.message}</p>
                      )}
                      <p className="form-help">
                        Mindestens 10 Zeichen erforderlich
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner mr-2" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <EnvelopeIcon className="w-5 h-5 mr-2" />
                          Nachricht senden
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-gray-900">
                      Kontaktinformationen
                    </h3>
                  </div>
                  <div className="card-body space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <info.icon className="w-6 h-6 text-orange-500 mt-1" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          {info.href ? (
                            <a
                              href={info.href}
                              target={info.href.startsWith('http') ? '_blank' : '_self'}
                              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-gray-600 hover:text-orange-600 transition-colors"
                            >
                              {info.details.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              ))}
                            </a>
                          ) : (
                            <div className="text-gray-600">
                              {info.details.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-gray-900">
                      Häufige Fragen
                    </h3>
                  </div>
                  <div className="card-body space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Wann findet die Erstiwoche statt?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Vom 22. bis 26. September 2025
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Muss ich mich vorab anmelden?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Ja, für die meisten Veranstaltungen ist eine Anmeldung erforderlich.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Sind die Veranstaltungen kostenlos?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Ja, alle Erstiwoche-Veranstaltungen sind kostenlos.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Was passiert bei schlechtem Wetter?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Outdoor-Events werden bei Bedarf in Innenräume verlegt.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-orange-50 py-12">
        <div className="container-wide mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dringende Fragen während der Erstiwoche?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Falls du während der Erstiwoche schnelle Hilfe benötigst, wende dich an unsere
              Erstihelferin vor Ort oder rufe die Hotline an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+492151822999"
                className="btn btn-primary"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Erstihelfer Hotline
              </a>
              <a
                href="mailto:hilfe@erstiwoche.hs-niederrhein.de"
                className="btn btn-outline"
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Notfall E-Mail
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
