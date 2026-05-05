import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

const BASE = "/Drink-E-commerce"

const heroSlidesMeta = [
  { image: `${BASE}/images/keyvisual1.jpg`, bg: "from-green-900/60" },
  { image: `${BASE}/images/keyvisual2.jpg`, bg: "from-orange-900/60" },
  { image: `${BASE}/images/keyvisual3.jpg`, bg: "from-emerald-900/60" },
  { image: `${BASE}/images/keyvisual4.jpg`, bg: "from-teal-900/60" },
]

const reviews = [
  {
    name: "田中 美咲",
    rating: 5,
    text: "毎朝飲んでいます！甘みが自然でとても美味しい。添加物がないのも安心です。",
    product: "りんごジュース",
  },
  {
    name: "山田 健一",
    rating: 5,
    text: "野菜が苦手な子どももこれなら喜んで飲みます。人参ジュースのファンになりました！",
    product: "人参ジュース",
  },
  {
    name: "佐藤 ゆき",
    rating: 4,
    text: "トマトジュースは本当に濃くて新鮮。無塩なのにしっかりした味わいです。",
    product: "トマトジュース",
  },
]

function SectionHeader({
  label,
  title,
  to,
  linkLabel,
  color = "green",
}: {
  label: string
  title: string
  to: string
  linkLabel: string
  color?: "green" | "orange"
}) {
  const accent = color === "orange" ? "text-orange-500" : "text-green-600"
  const linkColor = color === "orange"
    ? "text-orange-500 hover:text-orange-700 border-orange-400 hover:bg-orange-50"
    : "text-green-600 hover:text-green-800 border-green-400 hover:bg-green-50"

  return (
    <div className="flex flex-col items-center text-center mb-10">
      <p className={`${accent} text-xs font-bold tracking-widest uppercase mb-2`}>{label}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <Link
        to={to}
        className={`inline-flex items-center gap-1 text-sm font-medium border rounded-full px-5 py-1.5 transition-colors ${linkColor}`}
      >
        {linkLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const [heroIndex, setHeroIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlidesMeta.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying])

  const featuredFruits = products.filter((p) => p.category === "fruits").slice(0, 4)
  const featuredVeges = products.filter((p) => p.category === "vegetables").slice(0, 3)

  return (
    <div className="w-full">
      {/* ── Hero Carousel ── */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden w-full">
        {heroSlidesMeta.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={t.home.heroSlides[i]?.title ?? ""}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                const colors = ["16a34a", "ea580c", "059669", "0d9488"]
                el.src = `https://placehold.co/1920x700/${colors[i]}/ffffff?text=U+Ma!+Fruits`
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} to-transparent`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: i === heroIndex ? 1 : 0, y: i === heroIndex ? 0 : 30 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-xl"
                >
                  <p className="text-green-300 text-sm font-medium mb-2 tracking-widest uppercase">
                    U Ma! Fruits
                  </p>
                  <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                    {t.home.heroSlides[i]?.title}
                  </h1>
                  <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow">{t.home.heroSlides[i]?.subtitle}</p>
                  <div className="flex gap-4 flex-wrap">
                    <Link
                      to="/fruits"
                      className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors shadow-lg"
                    >
                      {t.home.heroCta}
                    </Link>
                    <Link
                      to="/brand"
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
                    >
                      {t.home.brandCta}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlidesMeta.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === heroIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50"
              }`}
            />
          ))}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 text-white/70 hover:text-white transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Arrows */}
        <button
          onClick={() => setHeroIndex((i) => (i - 1 + heroSlidesMeta.length) % heroSlidesMeta.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setHeroIndex((i) => (i + 1) % heroSlidesMeta.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* ── Features Bar ── */}
      <section className="bg-green-700 text-white py-4 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { icon: "🌿", key: 0 },
              { icon: "🔥", key: 1 },
              { icon: "🚚", key: 2 },
              { icon: "♻️", key: 3 },
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-center gap-2">
                <span className="text-lg">{f.icon}</span>
                <span className="font-medium">{t.home.features[f.key]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fruits Section ── */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="FRUITS"
            title={t.home.fruitsTitle}
            to="/fruits"
            linkLabel={t.allProducts}
            color="green"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredFruits.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story Banner ── */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-800 to-emerald-600 w-full">
        <div className="absolute inset-0 opacity-10">
          <img
            src={`${BASE}/images/bg.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3">Brand Story</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {t.home.brandTitle}
          </h2>
          <p className="text-white/85 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            {t.home.brandText}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/brand"
              className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              {t.home.brandCta}
            </Link>
            <Link
              to="/company"
              className="border border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              {t.home.companyInfoLink}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Vegetables Section ── */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="VEGETABLES"
            title={t.home.vegeTitle}
            to="/vegetables"
            linkLabel={t.allProducts}
            color="orange"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredVeges.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Knowledge / Seasonal ── */}
      <section className="bg-gray-50 py-16 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-green-600 text-xs font-bold tracking-widest uppercase mb-2">KNOWLEDGE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t.home.seasonalTitle}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n, i) => ({
              img: `${BASE}/images/partners_img${n}.jpg`,
              label: t.home.knowledge[i] ?? "",
            })).map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.src = `https://placehold.co/200x200/d1fae5/065f46?text=${encodeURIComponent(item.label)}`
                    }}
                  />
                </div>
                <p className="text-center text-xs font-medium text-gray-700 py-2 px-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-green-600 text-xs font-bold tracking-widest uppercase mb-2">REVIEWS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t.home.reviewTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-20 text-center w-full">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t.home.ctaTitle}</h2>
          <p className="text-white/90 text-lg mb-8">{t.home.ctaText}</p>
          <Link
            to="/fruits"
            className="inline-block bg-white text-green-700 font-bold px-12 py-4 rounded-full hover:bg-green-50 transition-colors shadow-lg text-lg"
          >
            {t.home.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  )
}
