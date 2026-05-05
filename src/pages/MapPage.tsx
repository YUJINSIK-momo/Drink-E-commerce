import { useLanguage } from "../context/LanguageContext"
import { Link } from "react-router-dom"

export default function MapPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
        <span>/</span>
        <span className="text-gray-800">{t.map.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t.map.title}</h1>

      {/* Map embed */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.4!2d141.2!3d40.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6Z2S森県十和田市!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="U Ma! Fruits 所在地"
        />
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">{t.company.title}</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">📍</span>
              <div>
                <p className="font-medium text-gray-700">{t.company.values.name}</p>
                <p>{t.company.values.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">{t.map.hours}</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{t.map.weekday}</span>
              <span className="font-medium text-gray-800">{t.map.weekdayHours}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.map.saturday}</span>
              <span className="text-gray-400">{t.map.closed}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.map.sundayHoliday}</span>
              <span className="text-gray-400">{t.map.closed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
