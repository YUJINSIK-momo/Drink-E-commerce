import { useParams, Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

type GuideSection = "delivery" | "returns" | "terms" | "privacy"

export default function GuidePage() {
  const { type } = useParams<{ type: string }>()
  const { t } = useLanguage()

  const sectionKey = type as GuideSection | undefined
  const section = sectionKey ? t.guide.sections[sectionKey] : null

  const menuItems = [
    { to: "/faq", label: t.guide.faq, icon: "❓" },
    { to: "/guide/delivery", label: t.guide.delivery, icon: "🚚" },
    { to: "/guide/returns", label: t.guide.returns, icon: "🔄" },
    { to: "/guide/terms", label: t.guide.terms, icon: "📄" },
  ]

  if (!section) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
          <span>/</span>
          <span className="text-gray-800">{t.guide.title}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.guide.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-green-200"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-800">{item.label}</span>
              <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8 flex-wrap">
        <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
        <span>/</span>
        <Link to="/guide" className="hover:text-gray-700">{t.guide.breadcrumb}</Link>
        <span>/</span>
        <span className="text-gray-800">{section.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">{section.title}</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
          {section.content.map((line, i) => {
            if (line === "") return <div key={i} className="h-2" />
            const isBold = line.startsWith("【") || line.startsWith("第") || line.startsWith("[") || line.startsWith("제")
            return (
              <p key={i} className={isBold ? "font-bold text-gray-800 mt-4 first:mt-0" : ""}>
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
