import { useLanguage } from "../context/LanguageContext"
import { Link } from "react-router-dom"

const BASE = "/Drink-E-commerce"

export default function BrandPage() {
  const { t } = useLanguage()

  const sectionImages = [
    `${BASE}/images/case1.jpg`,
    `${BASE}/images/fancy_new.jpg`,
    `${BASE}/images/bag_new.jpg`,
  ]
  const sectionFallbacks = [
    "Aomori+Farm",
    "Raw+Process",
    "100%25+Japan",
  ]
  const sectionColors = ["e8f5e9/2d6a4f", "d1fae5/065f46", "dcfce7/166534"]

  return (
    <div>
      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-br from-green-800 to-emerald-600 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={`${BASE}/images/bg.jpg`} alt="" className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3">Brand Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.brand.title}</h1>
          <p className="text-white/80 text-lg">{t.brand.subtitle}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
          <span>/</span>
          <span className="text-gray-800">{t.brand.breadcrumb}</span>
        </nav>
      </div>

      {/* Story sections */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {t.brand.sections.map((section, i) => (
          <section
            key={section.num}
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "" : ""}`}
          >
            <div className={i % 2 === 1 ? "order-2 md:order-2" : ""}>
              <p className="text-green-600 text-xs font-bold tracking-widest uppercase mb-2">{section.num}</p>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </div>
            <div className={`rounded-2xl overflow-hidden aspect-video bg-gray-100 ${i % 2 === 1 ? "order-1 md:order-1" : ""}`}>
              <img
                src={sectionImages[i]}
                alt={section.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.src = `https://placehold.co/600x400/${sectionColors[i]}?text=${encodeURIComponent(sectionFallbacks[i])}`
                }}
              />
            </div>
          </section>
        ))}

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t.brand.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.brand.values.map((val) => (
              <div key={val.title} className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                <div className="text-4xl mb-3">{val.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-green-700 to-emerald-600 rounded-3xl py-14 px-6">
          <h2 className="text-white text-2xl font-bold mb-4">{t.brand.ctaTitle}</h2>
          <p className="text-white/80 mb-8">{t.brand.ctaText}</p>
          <Link
            to="/fruits"
            className="inline-block bg-white text-green-700 font-bold px-10 py-3.5 rounded-full hover:bg-green-50 transition-colors"
          >
            {t.brand.ctaBtn}
          </Link>
        </section>
      </div>
    </div>
  )
}
