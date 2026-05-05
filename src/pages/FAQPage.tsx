import { useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

type Category = "account" | "payment" | "delivery" | "returns" | "general"

export default function FAQPage() {
  const { t } = useLanguage()
  const [openCategory, setOpenCategory] = useState<Category>("account")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const categories: { key: Category; label: string }[] = [
    { key: "account", label: t.faq.categoryLabels.account },
    { key: "payment", label: t.faq.categoryLabels.payment },
    { key: "delivery", label: t.faq.categoryLabels.delivery },
    { key: "returns", label: t.faq.categoryLabels.returns },
    { key: "general", label: t.faq.categoryLabels.general },
  ]

  const currentItems = t.faq.items[openCategory] ?? []

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
        <span>/</span>
        <span className="text-gray-800">{t.faq.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.faq.title}</h1>
      <p className="text-gray-500 mb-10">{t.faq.subtitle}</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setOpenCategory(key); setOpenItems(new Set()) }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              openCategory === key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-3">
        {currentItems.map((item, i) => {
          const key = `${openCategory}-${i}`
          const isOpen = openItems.has(key)
          return (
            <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleItem(key)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-sm mt-0.5 flex-shrink-0">Q.</span>
                  <span className="text-gray-800 font-medium text-sm">{item.q}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 flex gap-3">
                  <span className="text-orange-400 font-bold text-sm flex-shrink-0">A.</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center border border-green-100">
        <h3 className="text-lg font-semibold text-green-800 mb-2">{t.faq.contactTitle}</h3>
        <p className="text-green-700 text-sm mb-4">{t.faq.contactText}</p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          {t.faq.contactBtn}
        </Link>
      </div>
    </div>
  )
}
