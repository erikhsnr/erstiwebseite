import nodemailer from 'nodemailer'
import { EmailData, EmailTemplateData, EmailType } from '@/types'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

// Create transporter
const createTransporter = () => {
  if (process.env.NODE_ENV === 'development') {
    // Use Ethereal Email for development
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    })
  }

  // Production email service (configure based on your provider)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// Email templates
export const emailTemplates = {
  confirmation: (data: EmailTemplateData) => ({
    subject: `Anmeldung bestätigt: ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Anmeldung bestätigt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #fbbf24); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
            .button { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Anmeldung bestätigt! 🎉</h1>
            <p>Hallo ${data.firstName}!</p>
          </div>
          <div class="content">
            <p>Vielen Dank für deine Anmeldung zur Erstiwoche! Wir freuen uns, dich dabei zu haben.</p>

            <div class="event-details">
              <h3>📅 Veranstaltungsdetails</h3>
              <p><strong>Event:</strong> ${data.eventTitle}</p>
              <p><strong>Datum:</strong> ${data.eventDate}</p>
              <p><strong>Uhrzeit:</strong> ${data.eventTime}</p>
              ${data.eventLocation ? `<p><strong>Ort:</strong> ${data.eventLocation}</p>` : ''}
              ${data.groupName ? `<p><strong>Gruppe:</strong> ${data.groupName}</p>` : ''}
            </div>

            <p>📧 Du erhältst automatisch Erinnerungen:</p>
            <ul>
              <li>Einen Tag vor der Veranstaltung</li>
              <li>3 Stunden vor Beginn</li>
            </ul>

            <p>Falls du doch nicht teilnehmen kannst, kannst du dich hier abmelden:</p>
            <a href="${data.unsubscribeUrl}" class="button">Abmelden</a>

            <p>Bei Fragen stehen wir gerne zur Verfügung!</p>
          </div>

          <div class="footer">
            <p>Erstiwoche 2025 | Hochschule Niederrhein</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hallo ${data.firstName}!

Vielen Dank für deine Anmeldung zur Erstiwoche! Wir freuen uns, dich dabei zu haben.

Veranstaltungsdetails:
- Event: ${data.eventTitle}
- Datum: ${data.eventDate}
- Uhrzeit: ${data.eventTime}
${data.eventLocation ? `- Ort: ${data.eventLocation}` : ''}
${data.groupName ? `- Gruppe: ${data.groupName}` : ''}

Du erhältst automatisch Erinnerungen einen Tag vor der Veranstaltung und 3 Stunden vor Beginn.

Falls du doch nicht teilnehmen kannst, kannst du dich hier abmelden: ${data.unsubscribeUrl}

Bei Fragen stehen wir gerne zur Verfügung!

Erstiwoche 2025 | Hochschule Niederrhein
    `
  }),

  reminder: (data: EmailTemplateData, hoursBeforeEvent: number) => ({
    subject: `Erinnerung: ${data.eventTitle} ${hoursBeforeEvent === 24 ? 'morgen' : 'heute'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erinnerung</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #fbbf24); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center; }
            .button { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 Erinnerung</h1>
            <p>Hallo ${data.firstName}!</p>
          </div>
          <div class="content">
            <div class="highlight">
              <h3>${hoursBeforeEvent === 24 ? '📅 Morgen ist es soweit!' : '⏰ In 3 Stunden geht es los!'}</h3>
            </div>

            <div class="event-details">
              <h3>Deine Veranstaltung</h3>
              <p><strong>Event:</strong> ${data.eventTitle}</p>
              <p><strong>Datum:</strong> ${data.eventDate}</p>
              <p><strong>Uhrzeit:</strong> ${data.eventTime}</p>
              ${data.eventLocation ? `<p><strong>Ort:</strong> ${data.eventLocation}</p>` : ''}
              ${data.groupName ? `<p><strong>Gruppe:</strong> ${data.groupName}</p>` : ''}
            </div>

            ${hoursBeforeEvent === 3 ? '<p>🚀 Vergiss nicht, rechtzeitig da zu sein!</p>' : '<p>📝 Denk daran, morgen rechtzeitig da zu sein!</p>'}

            <p>Falls du doch nicht teilnehmen kannst, teile uns das bitte mit:</p>
            <a href="${data.unsubscribeUrl}" class="button">Abmelden</a>

            <p>Wir freuen uns auf dich!</p>
          </div>

          <div class="footer">
            <p>Erstiwoche 2025 | Hochschule Niederrhein</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hallo ${data.firstName}!

${hoursBeforeEvent === 24 ? 'Morgen ist es soweit!' : 'In 3 Stunden geht es los!'}

Deine Veranstaltung:
- Event: ${data.eventTitle}
- Datum: ${data.eventDate}
- Uhrzeit: ${data.eventTime}
${data.eventLocation ? `- Ort: ${data.eventLocation}` : ''}
${data.groupName ? `- Gruppe: ${data.groupName}` : ''}

${hoursBeforeEvent === 3 ? 'Vergiss nicht, rechtzeitig da zu sein!' : 'Denk daran, morgen rechtzeitig da zu sein!'}

Falls du doch nicht teilnehmen kannst, kannst du dich hier abmelden: ${data.unsubscribeUrl}

Wir freuen uns auf dich!

Erstiwoche 2025 | Hochschule Niederrhein
    `
  }),

  cancellation: (data: EmailTemplateData) => ({
    subject: `Abmeldung bestätigt: ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Abmeldung bestätigt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6b7280, #374151); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6b7280; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Abmeldung bestätigt</h1>
            <p>Hallo ${data.firstName}!</p>
          </div>
          <div class="content">
            <p>Du hast dich erfolgreich von folgender Veranstaltung abgemeldet:</p>

            <div class="event-details">
              <h3>Abgemeldete Veranstaltung</h3>
              <p><strong>Event:</strong> ${data.eventTitle}</p>
              <p><strong>Datum:</strong> ${data.eventDate}</p>
              <p><strong>Uhrzeit:</strong> ${data.eventTime}</p>
            </div>

            <p>Schade, dass du nicht dabei sein kannst! Falls sich deine Pläne ändern, kannst du dich gerne erneut auf unserer Website anmelden.</p>

            <p>Wir hoffen, dich bei einer anderen Veranstaltung begrüßen zu können!</p>
          </div>

          <div class="footer">
            <p>Erstiwoche 2025 | Hochschule Niederrhein</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hallo ${data.firstName}!

Du hast dich erfolgreich von folgender Veranstaltung abgemeldet:

- Event: ${data.eventTitle}
- Datum: ${data.eventDate}
- Uhrzeit: ${data.eventTime}

Schade, dass du nicht dabei sein kannst! Falls sich deine Pläne ändern, kannst du dich gerne erneut auf unserer Website anmelden.

Wir hoffen, dich bei einer anderen Veranstaltung begrüßen zu können!

Erstiwoche 2025 | Hochschule Niederrhein
    `
  })
}

// Send email function
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'erstiwoche@hs-niederrhein.de',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    })

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Helper function to format event data for email templates
export function formatEmailTemplateData(
  registration: any,
  event: any,
  group?: any
): EmailTemplateData {
  const eventDate = format(new Date(event.date), 'EEEE, dd.MM.yyyy', { locale: de })
  const eventTime = `${event.startTime} - ${event.endTime}`

  return {
    firstName: registration.firstName,
    lastName: registration.lastName,
    eventTitle: event.title,
    eventDate,
    eventTime,
    eventLocation: event.location,
    groupName: group?.name,
    unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe/${registration.unsubscribeToken}`
  }
}

// Send confirmation email
export async function sendConfirmationEmail(registration: any, event: any, group?: any): Promise<boolean> {
  const templateData = formatEmailTemplateData(registration, event, group)
  const template = emailTemplates.confirmation(templateData)

  return sendEmail({
    to: registration.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

// Send reminder email
export async function sendReminderEmail(registration: any, event: any, group: any, hoursBeforeEvent: number): Promise<boolean> {
  const templateData = formatEmailTemplateData(registration, event, group)
  const template = emailTemplates.reminder(templateData, hoursBeforeEvent)

  return sendEmail({
    to: registration.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

// Send cancellation email
export async function sendCancellationEmail(registration: any, event: any): Promise<boolean> {
  const templateData = formatEmailTemplateData(registration, event)
  const template = emailTemplates.cancellation(templateData)

  return sendEmail({
    to: registration.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}
