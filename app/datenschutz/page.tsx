'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  EyeIcon,
  ServerIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
        <div className="container-wide mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-narrow mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Allgemeine Hinweise */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Allgemeine Hinweise
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                  Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können.
                </p>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
                  aufgeführten Datenschutzerklärung.
                </p>
              </div>
            </div>

            {/* Verantwortliche Stelle */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <UserIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Verantwortliche Stelle
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed mb-0">
                    <strong>Hochschule Niederrhein</strong><br />
                    University of Applied Sciences<br />
                    Reinarzstraße 49<br />
                    47805 Krefeld<br />
                    Deutschland<br /><br />
                    <strong>Telefon:</strong> +49 2151 822-0<br />
                    <strong>E-Mail:</strong>
                    <a
                      href="mailto:datenschutz@hs-niederrhein.de"
                      className="text-orange-600 hover:text-orange-700 transition-colors ml-1"
                    >
                      datenschutz@hs-niederrhein.de
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4 mb-0">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
                  mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                </p>
              </div>
            </div>

            {/* Datenerfassung */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <ServerIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Datenerfassung auf dieser Website
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                      Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Wie erfassen wir Ihre Daten?
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
                      Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben
                      oder bei der Anmeldung zu Veranstaltungen angeben.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
                      durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                      Betriebssystem oder Uhrzeit des Seitenaufrufs).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Wofür nutzen wir Ihre Daten?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                      gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                      Bei Anmeldungen zu Veranstaltungen werden die Daten zur Organisation und Durchführung
                      der Events verwendet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ihre Rechte */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <EyeIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Ihre Rechte bezüglich Ihrer Daten
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                  Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
                  die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-blue-800 font-medium mb-2">Ihre Rechte im Überblick:</p>
                  <ul className="text-blue-700 space-y-1 ml-4">
                    <li>• Recht auf Auskunft</li>
                    <li>• Recht auf Berichtigung</li>
                    <li>• Recht auf Löschung</li>
                    <li>• Recht auf Einschränkung der Verarbeitung</li>
                    <li>• Recht auf Datenübertragbarkeit</li>
                    <li>• Widerspruchsrecht</li>
                    <li>• Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Veranstaltungsanmeldungen */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <EnvelopeIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Veranstaltungsanmeldungen
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Welche Daten erheben wir bei Anmeldungen?
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Bei der Anmeldung zu Veranstaltungen der Erstiwoche erheben wir folgende Daten:
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Vor- und Nachname</li>
                      <li>• E-Mail-Adresse</li>
                      <li>• Telefonnummer (optional)</li>
                      <li>• Gewählte Veranstaltung und Gruppe</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Zweck der Datenverarbeitung
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Die erhobenen Daten verwenden wir ausschließlich für:
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-4 mb-3">
                      <li>• Organisation und Durchführung der Veranstaltungen</li>
                      <li>• Versendung von Bestätigungsmails</li>
                      <li>• Erinnerungsmails vor Veranstaltungen</li>
                      <li>• Kommunikation bei Änderungen oder Absagen</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Speicherdauer
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ihre Anmeldedaten werden bis zum Ende des Semesters (31. März 2026) gespeichert
                      und anschließend automatisch gelöscht. Sie können jederzeit die Löschung Ihrer
                      Daten beantragen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontaktformular */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Kontaktformular
                </h2>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                  der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt
                  auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung
                  eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                  erforderlich ist.
                </p>
              </div>
            </div>

            {/* E-Mail-Kommunikation */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  E-Mail-Kommunikation
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Wenn Sie sich für Veranstaltungen anmelden, erhalten Sie automatisierte E-Mails:
                  </p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Bestätigungsmail nach der Anmeldung</li>
                    <li>• Erinnerungsmail 24 Stunden vor der Veranstaltung</li>
                    <li>• Erinnerungsmail 3 Stunden vor der Veranstaltung</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-800 text-sm">
                        Sie können sich jederzeit über den Link in jeder E-Mail von der Veranstaltung
                        abmelden und damit auch die weitere E-Mail-Kommunikation beenden.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Server-Log-Dateien */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Server-Log-Dateien
                </h2>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in
                  so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
                </p>
                <ul className="text-gray-700 space-y-1 ml-4 mb-4">
                  <li>• Browsertyp und Browserversion</li>
                  <li>• Verwendetes Betriebssystem</li>
                  <li>• Referrer URL</li>
                  <li>• Hostname des zugreifenden Rechners</li>
                  <li>• Uhrzeit der Serveranfrage</li>
                  <li>• IP-Adresse</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                  Die Daten werden nach 7 Tagen automatisch gelöscht.
                </p>
              </div>
            </div>

            {/* SSL-Verschlüsselung */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    SSL- bzw. TLS-Verschlüsselung
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                  Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber
                  senden, eine SSL- bzw. TLS-Verschlüsselung.
                </p>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                  von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </div>

            {/* Änderung der Datenschutzerklärung */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Änderung der Datenschutzerklärung
                </h2>
              </div>
              <div className="card-body">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
                  in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
                  Datenschutzerklärung.
                  <br /><br />
                  <strong>Stand:</strong> Dezember 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
