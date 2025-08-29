'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { EventWithGroups } from '@/types'
import {
  formatDate,
  formatTimeRange,
  getWeekDays,
  getAvailableSeats,
  isEventFull,
  getEventStatus,
  groupEventsByDate,
  sortEvents
} from '@/lib/utils'

export default function EventsPage() {
  const [events, setEvents] = useState<EventWithGroups[]>([])
  const [filteredEvents, setFilteredEvents] = useState<EventWithGroups[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'available'>('all')

  const weekDays = getWeekDays()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
          setFilteredEvents(data)
        } else {
          setError('Fehler beim Laden der Veranstaltungen')
        }
      } catch (err) {
        setError('Fehler beim Laden der Veranstaltungen')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = [...events]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Day filter
    if (selectedDay !== 'all') {
      const dayData = weekDays.find(d => d.key === selectedDay)
      if (dayData) {
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date).toISOString().split('T')[0]
          return eventDate === dayData.date
        })
      }
    }

    // Status filter
    if (statusFilter === 'upcoming') {
      filtered = filtered.filter(event => getEventStatus(event) === 'upcoming')
    } else if (statusFilter === 'available') {
      filtered = filtered.filter(event => !isEventFull(event) && getEventStatus(event) === 'upcoming')
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, selectedDay, statusFilter, weekDays])

  const groupedEvents = groupEventsByDate(filteredEvents)

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
              Alle Veranstaltungen
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Entdecke alle Events der Erstiwoche 2025 und melde dich für deine Lieblingsveranstaltungen an.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-wide mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Events durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Day Filter */}
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">Alle Tage</option>
                {weekDays.map(day => (
                  <option key={day.key} value={day.key}>
                    {day.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">Alle Events</option>
                <option value="upcoming">Kommende Events</option>
                <option value="available">Verfügbare Plätze</option>
              </select>

              <FunnelIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="container-wide mx-auto px-6">
          {loading ? (
            <div className="space-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card loading-skeleton h-32"></div>
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
          ) : Object.keys(groupedEvents).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedEvents).map(([date, dayEvents], index) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CalendarDaysIcon className="w-6 h-6 mr-2 text-orange-500" />
                    {date}
                  </h2>

                  <div className="grid gap-6">
                    {dayEvents.map((event, eventIndex) => {
                      const eventStatus = getEventStatus(event)
                      const isFull = isEventFull(event)
                      const totalAvailableSeats = event.groups?.reduce(
                        (total, group) => total + getAvailableSeats(group),
                        0
                      ) || 0

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: eventIndex * 0.1 }}
                          className={`card hover:shadow-lg transition-shadow duration-300 ${
                            eventStatus === 'past' ? 'opacity-75' : ''
                          }`}
                        >
                          <div className="card-body">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {event.title}
                                  </h3>
                                  <div className="flex gap-2 ml-4">
                                    {eventStatus === 'past' && (
                                      <span className="badge bg-gray-100 text-gray-600">
                                        Vorbei
                                      </span>
                                    )}
                                    {eventStatus === 'ongoing' && (
                                      <span className="badge bg-green-100 text-green-600">
                                        Läuft
                                      </span>
                                    )}
                                    {isFull && eventStatus === 'upcoming' && (
                                      <span className="badge badge-danger">
                                        Ausgebucht
                                      </span>
                                    )}
                                    {!isFull && eventStatus === 'upcoming' && (
                                      <span className="badge badge-success">
                                        Verfügbar
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {event.description && (
                                  <p className="text-gray-600 mb-4 leading-relaxed">
                                    {event.description}
                                  </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
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
                                      {totalAvailableSeats} Plätze verfügbar
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <span className="w-2 h-2 rounded-full mr-2 bg-orange-500"></span>
                                    {event.groups?.length || 1} Gruppe(n)
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 lg:mt-0 lg:ml-6 flex-shrink-0">
                                {eventStatus === 'past' ? (
                                  <button
                                    disabled
                                    className="btn btn-secondary opacity-50 cursor-not-allowed"
                                  >
                                    Event beendet
                                  </button>
                                ) : isFull ? (
                                  <button
                                    disabled
                                    className="btn btn-secondary opacity-50 cursor-not-allowed"
                                  >
                                    Ausgebucht
                                  </button>
                                ) : (
                                  <Link
                                    href={`/events/${event.id}`}
                                    className="btn btn-primary hover:shadow-md transition-shadow"
                                  >
                                    Details & Anmeldung
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <CalendarDaysIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Keine Veranstaltungen gefunden
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedDay !== 'all' || statusFilter !== 'all'
                    ? 'Versuche es mit anderen Suchkriterien oder Filtern.'
                    : 'Noch keine Veranstaltungen verfügbar. Schau bald wieder vorbei!'}
                </p>
                {(searchTerm || selectedDay !== 'all' || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedDay('all')
                      setStatusFilter('all')
                    }}
                    className="btn btn-outline"
                  >
                    Filter zurücksetzen
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-orange-50 py-12">
        <div className="container-wide mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <CalendarDaysIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                22. - 26. September
              </h3>
              <p className="text-gray-600">
                Fünf Tage voller spannender Veranstaltungen
              </p>
            </div>
            <div>
              <UserGroupIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Einfache Anmeldung
              </h3>
              <p className="text-gray-600">
                Keine Registrierung erforderlich, nur E-Mail-Adresse
              </p>
            </div>
            <div>
              <ClockIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Automatische Erinnerungen
              </h3>
              <p className="text-gray-600">
                Erhalte Erinnerungen vor jeder Veranstaltung
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
