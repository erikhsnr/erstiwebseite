import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date for display
export function formatDate(date: Date | string, formatStr = 'dd.MM.yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: de })
}

// Format date with relative display (today, tomorrow, etc.)
export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date

  if (isToday(dateObj)) {
    return 'Heute'
  } else if (isTomorrow(dateObj)) {
    return 'Morgen'
  } else if (isYesterday(dateObj)) {
    return 'Gestern'
  } else {
    return format(dateObj, 'EEEE, dd.MM.yyyy', { locale: de })
  }
}

// Format time range
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`
}

// Generate weekday schedule
export function getWeekDays() {
  return [
    { key: 'monday', label: 'Montag', date: '2025-09-22' },
    { key: 'tuesday', label: 'Dienstag', date: '2025-09-23' },
    { key: 'wednesday', label: 'Mittwoch', date: '2025-09-24' },
    { key: 'thursday', label: 'Donnerstag', date: '2025-09-25' },
    { key: 'friday', label: 'Freitag', date: '2025-09-26' }
  ]
}

// Check if date is in Erstiwoche
export function isInErstiwoche(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const startDate = new Date('2025-09-22')
  const endDate = new Date('2025-09-26')

  return dateObj >= startDate && dateObj <= endDate
}

// Get day of week in German
export function getDayOfWeek(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'EEEE', { locale: de })
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (German format)
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+49|0)[1-9][0-9]{7,14}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s/g, '')
  if (cleaned.startsWith('+49')) {
    return cleaned.replace(/(\+49)(\d{3})(\d+)/, '$1 $2 $3')
  } else if (cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{4})(\d+)/, '$1 $2')
  }
  return phone
}

// Generate random string
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Convert string to slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Calculate available seats for event group
export function getAvailableSeats(group: any): number {
  const confirmedRegistrations = group.registrations?.filter(
    (reg: any) => reg.status === 'CONFIRMED'
  ).length || 0
  return Math.max(0, group.maxSeats - confirmedRegistrations)
}

// Check if event is full
export function isEventFull(event: any): boolean {
  if (!event.groups || event.groups.length === 0) return false

  return event.groups.every((group: any) => getAvailableSeats(group) === 0)
}

// Get event status
export function getEventStatus(event: any): 'upcoming' | 'ongoing' | 'past' {
  const now = new Date()
  const eventDate = new Date(event.date)
  const [startHour, startMinute] = event.startTime.split(':').map(Number)
  const [endHour, endMinute] = event.endTime.split(':').map(Number)

  const eventStart = new Date(eventDate)
  eventStart.setHours(startHour, startMinute, 0, 0)

  const eventEnd = new Date(eventDate)
  eventEnd.setHours(endHour, endMinute, 0, 0)

  if (now < eventStart) return 'upcoming'
  if (now <= eventEnd) return 'ongoing'
  return 'past'
}

// Get registration status color
export function getStatusColor(status: string): string {
  switch (status) {
    case 'CONFIRMED':
      return 'text-green-600 bg-green-100'
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100'
    case 'CANCELLED':
      return 'text-red-600 bg-red-100'
    case 'WAITLIST':
      return 'text-blue-600 bg-blue-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Get registration status label
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'CONFIRMED':
      return 'Bestätigt'
    case 'PENDING':
      return 'Ausstehend'
    case 'CANCELLED':
      return 'Abgesagt'
    case 'WAITLIST':
      return 'Warteliste'
    default:
      return status
  }
}

// Sort events by date and time
export function sortEvents(events: any[]): any[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA.getTime() === dateB.getTime()) {
      return a.startTime.localeCompare(b.startTime)
    }

    return dateA.getTime() - dateB.getTime()
  })
}

// Group events by date
export function groupEventsByDate(events: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {}

  events.forEach(event => {
    const dateKey = formatDate(event.date)
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(event)
  })

  // Sort events within each date group
  Object.keys(grouped).forEach(date => {
    grouped[date] = sortEvents(grouped[date])
  })

  return grouped
}

// Calculate time until event
export function getTimeUntilEvent(eventDate: Date | string, startTime: string): string {
  const eventDateTime = new Date(eventDate)
  const [hours, minutes] = startTime.split(':').map(Number)
  eventDateTime.setHours(hours, minutes, 0, 0)

  const now = new Date()
  const diff = eventDateTime.getTime() - now.getTime()

  if (diff <= 0) return 'Event has started'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} Tag${days > 1 ? 'e' : ''}`
  } else if (hoursLeft > 0) {
    return `${hoursLeft} Stunde${hoursLeft > 1 ? 'n' : ''}`
  } else {
    return `${minutesLeft} Minute${minutesLeft > 1 ? 'n' : ''}`
  }
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

// Check if object is empty
export function isEmpty(obj: any): boolean {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

// Retry function with exponential backoff
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let attempt = 1

  while (attempt <= maxAttempts) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxAttempts) throw error

      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
      attempt++
    }
  }

  throw new Error('Max attempts reached')
}
