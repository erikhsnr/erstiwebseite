'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { EventWithGroups } from '@/types'
import { formatDate, formatTimeRange, getWeekDays, getAvailableSeats, isEventFull } from '@/lib/utils'

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithGroups[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch('/api/events?upcoming=true&limit=6')
        if (response.ok) {
          const data = await response.json()
          setUpcomingEvents(data)
        } else {
          setError('Fehler beim Laden der Veranstaltungen')
        }
      } catch (err) {
        setError('Fehler beim Laden der Veranstaltungen')
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  const weekDays = getWeekDays()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-wide px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="hero-title text-white mb-6">
              Willkommen zur
              <br />
              <span className="text-yellow-200">Erstiwoche 2025</span>
            </h1>
            <p className="hero-subtitle text-white/90 mb-8 max-w-3xl mx-auto">
              Starte dein Studium mit unvergesslichen Erlebnissen! Melde dich für spannende Veranstaltungen an,
              lerne deine Kommilitonen kennen und entdecke alles, was die Hochschule Niederrhein zu bieten hat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="btn btn-lg bg-white text-orange-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                Alle Veranstaltungen
              </Link>
              <Link
                href="/register"
                className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-200"
              >
                Jetzt anmelden
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
      </section>

      {/* Event Overview Section */}
      <section className="section bg-white">
        <div className="container-wide px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Programm der Erstiwoche</h2>
            <p className="section-subtitle">
              Vom 22. bis 26. September 2025 erwartet dich ein abwechslungsreiches Programm
              voller Aktivitäten, Workshops und sozialer Events.
            </p>
          </motion.div>

          {/* Week Schedule Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
            {weekDays.map((day, index) => (
              <motion.div
                key={day.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 mb-4">
                  <h3 className="font-bold text-lg mb-2">{day.label}</h3>
                  <p className="text-orange-100 text-sm">{formatDate(day.date, 'dd.MM.')}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {index === 0 && 'Orientierung & Kennenlernen'}
                  {index === 1 && 'Campus-Tour & Workshops'}
                  {index === 2 && 'Fachbereich-Events'}
                  {index === 3 && 'Sport & Freizeit'}
                  {index === 4 && 'Abschlussfeier'}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nächste Veranstaltungen</h3>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card loading-skeleton h-64"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  Erneut versuchen
                </button>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="event-card group"
                  >
                    <div className="card-body">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                          {event.title}
                        </h4>
                        {isEventFull(event) && (
                          <span className="badge badge-danger text-xs">Ausgebucht</span>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <CalendarDaysIcon className="w-4 h-4 mr-2 text-orange-500" />
                          {formatDate(event.date, 'EEEE, dd.MM.yyyy')}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2 text-orange-500" />
                          {formatTimeRange(event.startTime, event.endTime)}
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-orange-500" />
                            {event.location}
                          </div>
                        )}
                        {event.groups && event.groups.length > 0 && (
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-2 text-orange-500" />
                            {event.groups.reduce((total, group) => total + getAvailableSeats(group), 0)} Plätze verfügbar
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/events/${event.id}`}
                        className="btn btn-primary w-full group-hover:shadow-md transition-shadow"
                      >
                        Details & Anmeldung
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Noch keine Veranstaltungen verfügbar.</p>
                <p className="text-sm text-gray-500">Schau bald wieder vorbei!</p>
              </div>
            )}

            {upcomingEvents.length > 0 && (
              <div className="text-center mt-12">
                <Link
                  href="/events"
                  className="btn btn-outline btn-lg"
                >
                  Alle Veranstaltungen anzeigen
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50">
        <div className="container-wide px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Was dich erwartet</h2>
            <p className="section-subtitle">
              Die Erstiwoche ist der perfekte Start in dein Studium an der Hochschule Niederrhein.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UserGroupIcon,
                title: 'Neue Freunde finden',
                description: 'Lerne deine Kommilitonen kennen und knüpfe erste Kontakte für dein Studium.'
              },
              {
                icon: MapPinIcon,
                title: 'Campus entdecken',
                description: 'Erkunde den Campus und finde dich in deiner neuen Umgebung zurecht.'
              },
              {
                icon: CalendarDaysIcon,
                title: 'Spannende Events',
                description: 'Nimm an verschiedenen Veranstaltungen, Workshops und Freizeitaktivitäten teil.'
              },
              {
                icon: ClockIcon,
                title: 'Flexibel anmelden',
                description: 'Melde dich einfach online an und erhalte automatische Erinnerungen.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container-wide px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bereit für dein Studium?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Melde dich jetzt für die Erstiwoche an und starte optimal in dein Studium
              an der Hochschule Niederrhein.
            </p>
            <Link
              href="/events"
              className="btn btn-lg bg-white text-orange-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Jetzt zur Erstiwoche anmelden
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
