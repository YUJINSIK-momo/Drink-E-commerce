import { useLanguage } from "../context/LanguageContext"

export default function CompanyPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <a href="/" className="hover:text-gray-700">{t.home2}</a>
        <span>/</span>
        <span className="text-gray-800">{t.company.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-10">{t.company.title}</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {[
              { label: t.company.name, value: t.company.values.name },
              { label: t.company.ceo, value: t.company.values.ceo },
              { label: t.company.founded, value: t.company.values.founded },
              { label: t.company.address, value: t.company.values.address },
              { label: t.company.business, value: t.company.values.business },
            ].map((row, i) => (
              <tr
                key={row.label}
                className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-100 last:border-none`}
              >
                <td className="py-4 px-6 font-medium text-gray-500 w-40">{row.label}</td>
                <td className="py-4 px-6 text-gray-800">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map placeholder */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t.company.access}</h2>
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>{t.company.values.address}</p>
            <a
              href="/Drink-E-commerce/map"
              className="text-green-600 hover:underline text-sm mt-2 inline-block"
            >
              {t.company.mapLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
