import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateAdminFromCookies } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming') === 'true'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const date = searchParams.get('date')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true
    }

    // Filter by date
    if (date) {
      const targetDate = new Date(date)
      const nextDay = new Date(targetDate)
      nextDay.setDate(nextDay.getDate() + 1)

      where.date = {
        gte: targetDate,
        lt: nextDay
      }
    } else if (upcoming) {
      where.date = {
        gte: new Date()
      }
    }

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        groups: {
          include: {
            registrations: {
              where: {
                status: 'CONFIRMED'
              }
            }
          }
        },
        registrations: true
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ],
      take: limit
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const admin = await authenticateAdminFromCookies(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      maxGroups,
      groups
    } = body

    // Validate required fields
    if (!title || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create event with groups
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        startTime,
        endTime,
        location,
        maxGroups: maxGroups || 1,
        groups: {
          create: groups?.map((group: any) => ({
            name: group.name,
            maxSeats: group.maxSeats || 50
          })) || [
            {
              name: 'Standard',
              maxSeats: 50
            }
          ]
        }
      },
      include: {
        groups: {
          include: {
            registrations: true
          }
        },
        registrations: true
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
