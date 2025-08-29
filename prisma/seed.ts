import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin user
  const hashedPassword = await hashPassword('Admin123!')

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@hs-niederrhein.de' },
    update: {},
    create: {
      email: 'admin@hs-niederrhein.de',
      password: hashedPassword,
      name: 'Administrator',
      isActive: true
    }
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample events for the Erstiwoche
  const events = [
    {
      title: 'Willkommensveranstaltung',
      description: 'Offizielle Begrüßung aller Erstsemester mit wichtigen Informationen zum Studienstart. Lerne die Hochschule, deine Dozenten und Kommilitonen kennen.',
      date: new Date('2025-09-22'),
      startTime: '09:00',
      endTime: '11:00',
      location: 'Audimax, Gebäude A',
      maxGroups: 3,
      groups: [
        { name: 'Gruppe A (Informatik)', maxSeats: 80 },
        { name: 'Gruppe B (Wirtschaftsinformatik)', maxSeats: 60 },
        { name: 'Gruppe C (Medieninformatik)', maxSeats: 50 }
      ]
    },
    {
      title: 'Campus-Führung',
      description: 'Entdecke den Campus der Hochschule Niederrhein. Wir zeigen dir alle wichtigen Orte: Bibliothek, Mensa, Labore und Aufenthaltsräume.',
      date: new Date('2025-09-22'),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Treffpunkt: Haupteingang',
      maxGroups: 4,
      groups: [
        { name: 'Tour 1', maxSeats: 25 },
        { name: 'Tour 2', maxSeats: 25 },
        { name: 'Tour 3', maxSeats: 25 },
        { name: 'Tour 4', maxSeats: 25 }
      ]
    },
    {
      title: 'Orientierungsrallye',
      description: 'Eine spielerische Art, den Campus zu erkunden! In Teams löst ihr Aufgaben und lernt dabei wichtige Anlaufstellen kennen.',
      date: new Date('2025-09-23'),
      startTime: '10:00',
      endTime: '12:30',
      location: 'Campus-weit',
      maxGroups: 6,
      groups: [
        { name: 'Team Rot', maxSeats: 15 },
        { name: 'Team Blau', maxSeats: 15 },
        { name: 'Team Grün', maxSeats: 15 },
        { name: 'Team Gelb', maxSeats: 15 },
        { name: 'Team Orange', maxSeats: 15 },
        { name: 'Team Lila', maxSeats: 15 }
      ]
    },
    {
      title: 'Fachbereich-Info: Informatik',
      description: 'Spezielle Informationsveranstaltung für Informatik-Studierende. Erfahre alles über Studienaufbau, Wahlpflichtfächer und Karrieremöglichkeiten.',
      date: new Date('2025-09-23'),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Hörsaal B.201',
      maxGroups: 2,
      groups: [
        { name: 'Bachelor Informatik', maxSeats: 40 },
        { name: 'Wirtschaftsinformatik', maxSeats: 30 }
      ]
    },
    {
      title: 'Pizza & Talk',
      description: 'Entspanntes Kennenlernen bei Pizza und Getränken. Tausche dich mit älteren Semestern aus und stelle alle deine Fragen.',
      date: new Date('2025-09-23'),
      startTime: '18:00',
      endTime: '21:00',
      location: 'Mensa',
      maxGroups: 1,
      groups: [
        { name: 'Alle Studierenden', maxSeats: 120 }
      ]
    },
    {
      title: 'Workshop: Studienverwaltung',
      description: 'Lerne die wichtigsten Online-Systeme kennen: HISinOne, Moodle, E-Mail-Setup und mehr. Praktische Tipps für den Studienalltag.',
      date: new Date('2025-09-24'),
      startTime: '09:00',
      endTime: '11:00',
      location: 'PC-Pool C.115',
      maxGroups: 2,
      groups: [
        { name: 'Workshop A', maxSeats: 20 },
        { name: 'Workshop B', maxSeats: 20 }
      ]
    },
    {
      title: 'Laborbesichtigung',
      description: 'Besichtige die modernen Labore der Hochschule: Robotik-Labor, KI-Labor, Netzwerk-Labor und mehr. Sieh die Ausstattung für dein Studium.',
      date: new Date('2025-09-24'),
      startTime: '13:00',
      endTime: '15:00',
      location: 'Gebäude D, Labore',
      maxGroups: 3,
      groups: [
        { name: 'Gruppe 1', maxSeats: 20 },
        { name: 'Gruppe 2', maxSeats: 20 },
        { name: 'Gruppe 3', maxSeats: 20 }
      ]
    },
    {
      title: 'Studierendenvertretung kennenlernen',
      description: 'Treffe die Fachschaftsvertretung und erfahre, wie du dich selbst engagieren kannst. Alle Infos zu FSR, AStA und Hochschulpolitik.',
      date: new Date('2025-09-24'),
      startTime: '16:00',
      endTime: '17:30',
      location: 'FSR-Raum, Gebäude A.012',
      maxGroups: 1,
      groups: [
        { name: 'Alle Interessierten', maxSeats: 40 }
      ]
    },
    {
      title: 'Sportangebote ausprobieren',
      description: 'Entdecke das Sportangebot der Hochschule! Von Volleyball über Basketball bis hin zu Yoga - hier ist für jeden etwas dabei.',
      date: new Date('2025-09-25'),
      startTime: '10:00',
      endTime: '12:00',
      location: 'Sporthalle',
      maxGroups: 4,
      groups: [
        { name: 'Ballsport', maxSeats: 20 },
        { name: 'Fitness & Yoga', maxSeats: 15 },
        { name: 'Outdoor-Aktivitäten', maxSeats: 25 },
        { name: 'Wassersport', maxSeats: 12 }
      ]
    },
    {
      title: 'Kreativ-Workshop',
      description: 'Gestalte dein eigenes Ersti-T-Shirt oder andere kreative Projekte. Materialien werden gestellt, Kreativität bringst du mit!',
      date: new Date('2025-09-25'),
      startTime: '14:00',
      endTime: '17:00',
      location: 'Kreativraum, Gebäude E.201',
      maxGroups: 2,
      groups: [
        { name: 'Workshop 1', maxSeats: 16 },
        { name: 'Workshop 2', maxSeats: 16 }
      ]
    },
    {
      title: 'Game Night',
      description: 'Entspannter Spieleabend mit Brett- und Videospielen. Perfekt, um neue Freundschaften zu schließen und den Tag ausklingen zu lassen.',
      date: new Date('2025-09-25'),
      startTime: '19:00',
      endTime: '22:00',
      location: 'Studentenclub',
      maxGroups: 1,
      groups: [
        { name: 'Alle Gamer', maxSeats: 60 }
      ]
    },
    {
      title: 'Abschlussfeier der Erstiwoche',
      description: 'Gemeinsamer Abschluss einer aufregenden Woche! Mit Musik, Getränken und der Möglichkeit, alle neuen Kontakte zu feiern.',
      date: new Date('2025-09-26'),
      startTime: '18:00',
      endTime: '23:00',
      location: 'Aula der Hochschule',
      maxGroups: 1,
      groups: [
        { name: 'Alle Erstsemester', maxSeats: 200 }
      ]
    }
  ]

  // Create events with their groups
  for (const eventData of events) {
    const { groups, ...eventInfo } = eventData

    const event = await prisma.event.create({
      data: {
        ...eventInfo,
        groups: {
          create: groups
        }
      },
      include: {
        groups: true
      }
    })

    console.log(`✅ Created event: ${event.title} with ${event.groups.length} groups`)
  }

  // Create some sample registrations
  const sampleRegistrations = [
    {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@student.hs-niederrhein.de',
      phone: '+49 151 12345678',
      status: 'CONFIRMED'
    },
    {
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@student.hs-niederrhein.de',
      phone: '+49 152 87654321',
      status: 'CONFIRMED'
    },
    {
      firstName: 'Tom',
      lastName: 'Weber',
      email: 'tom.weber@student.hs-niederrhein.de',
      status: 'PENDING'
    },
    {
      firstName: 'Lisa',
      lastName: 'Mueller',
      email: 'lisa.mueller@student.hs-niederrhein.de',
      phone: '+49 160 11223344',
      status: 'CONFIRMED'
    },
    {
      firstName: 'David',
      lastName: 'Koch',
      email: 'david.koch@student.hs-niederrhein.de',
      status: 'PENDING'
    }
  ]

  // Get first few events to add registrations to
  const firstEvents = await prisma.event.findMany({
    take: 3,
    include: { groups: true }
  })

  for (const event of firstEvents) {
    for (let i = 0; i < Math.min(sampleRegistrations.length, 3); i++) {
      const registration = sampleRegistrations[i]
      const randomGroup = event.groups[Math.floor(Math.random() * event.groups.length)]

      await prisma.registration.create({
        data: {
          ...registration,
          eventId: event.id,
          groupId: randomGroup.id
        }
      })
    }
    console.log(`✅ Added sample registrations to: ${event.title}`)
  }

  // Create sample contact messages
  const sampleMessages = [
    {
      name: 'Julia Becker',
      email: 'julia.becker@example.com',
      subject: 'Frage zur Anmeldung',
      message: 'Hallo, ich habe eine Frage zur Anmeldung für die Erstiwoche. Ist es möglich, sich für mehrere Veranstaltungen gleichzeitig anzumelden?'
    },
    {
      name: 'Michael Wagner',
      email: 'michael.wagner@example.com',
      subject: 'Parkmöglichkeiten',
      message: 'Gibt es ausreichend Parkplätze auf dem Campus während der Erstiwoche? Sollte ich besser mit öffentlichen Verkehrsmitteln kommen?'
    }
  ]

  for (const message of sampleMessages) {
    await prisma.contactMessage.create({
      data: message
    })
  }

  console.log('✅ Created sample contact messages')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
