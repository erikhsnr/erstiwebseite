import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isValidEmail } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Nachricht muss mindestens 10 Zeichen lang sein' },
        { status: 400 }
      )
    }

    // Save contact message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      }
    })

    // TODO: Send notification email to admin
    // For now, just log the message
    console.log('New contact message received:', {
      id: contactMessage.id,
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject
    })

    return NextResponse.json(
      { message: 'Nachricht erfolgreich gesendet' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    )
  }
}
