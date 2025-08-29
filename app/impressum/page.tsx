'use client'

import { motion } from 'framer-motion'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function ImpressumPage() {
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
              Impressum
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rechtliche Angaben gemäß § 5 TMG
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
            {/* Angaben gemäß § 5 TMG */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Angaben gemäß § 5 TMG
                  </h2>
                </div>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-800 leading-relaxed mb-0">
                  <strong>Hochschule Niederrhein</strong><br />
                  University of Applied Sciences<br />
                  Reinarzstraße 49<br />
                  47805 Krefeld<br />
                  Deutschland
                </p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <EnvelopeIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Kontakt
                  </h2>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-medium">Telefon:</span>
                    </div>
                    <p className="text-gray-700 ml-7">+49 2151 822-0</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-medium">E-Mail:</span>
                    </div>
                    <p className="text-gray-700 ml-7">
                      <a
                        href="mailto:erstiwoche@hs-niederrhein.de"
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        erstiwoche@hs-niederrhein.de
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertreten durch */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <UserIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Vertreten durch
                  </h2>
                </div>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-800 leading-relaxed mb-4">
                  <strong>Präsidentin:</strong><br />
                  Prof. Dr. Susanne Staude
                </p>
                <p className="text-gray-800 leading-relaxed mb-0">
                  <strong>Verantwortlich für den Inhalt der Erstiwoche-Website:</strong><br />
                  Fachschaftsrat Informatik<br />
                  Hochschule Niederrhein<br />
                  Reinarzstraße 49<br />
                  47805 Krefeld
                </p>
              </div>
            </div>

            {/* Umsatzsteuer-ID */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Umsatzsteuer-ID
                  </h2>
                </div>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-800 leading-relaxed mb-0">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  <strong>DE 122 094 813</strong>
                </p>
              </div>
            </div>

            {/* Aufsichtsbehörde */}
            <div className="card mb-8">
              <div className="card-header">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">
                    Aufsichtsbehörde
                  </h2>
                </div>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-800 leading-relaxed mb-0">
                  Ministerium für Kultur und Wissenschaft<br />
                  des Landes Nordrhein-Westfalen<br />
                  Völklinger Straße 49<br />
                  40221 Düsseldorf
                </p>
              </div>
            </div>

            {/* Haftungsausschluss */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Haftungsausschluss
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Haftung für Inhalte
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                      allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
                      nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen
                      oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Haftung für Links
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                      verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Urheberrecht
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                      deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                      Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                      des jeweiligen Autors bzw. Erstellers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Streitschlichtung */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Streitschlichtung
                </h2>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 transition-colors ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br /><br />
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>

            {/* Technische Realisierung */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  Technische Realisierung
                </h2>
              </div>
              <div className="card-body prose-sm">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Diese Website wurde vom Fachschaftsrat Informatik der Hochschule Niederrhein entwickelt
                  und wird von der Hochschule Niederrhein betrieben.
                  <br /><br />
                  <strong>Design und Entwicklung:</strong><br />
                  Fachschaftsrat Informatik<br />
                  Hochschule Niederrhein
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
