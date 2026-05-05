import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

const BASE = "/Drink-E-commerce"

const heroSlides = [
  {
    image: `${BASE}/images/keyvisual1.jpg`,
    titleJa: "自然の恵みを、そのまま。",
    subtitleJa: "100%国産フルーツジュース",
    bg: "from-green-900/60",
  },
  {
    image: `${BASE}/images/keyvisual2.jpg`,
    titleJa: "新鮮な野菜を、毎日に。",
    subtitleJa: "U Ma! Vegetable Series",
    bg: "from-orange-900/60",
  },
  {
    image: `${BASE}/images/keyvisual3.jpg`,
    titleJa: "青森の大地から届ける。",
    subtitleJa: "無加熱・無添加・国産素材",
    bg: "from-emerald-900/60",
  },
  {
    image: `${BASE}/images/keyvisual4.jpg`,
    titleJa: "体に優しい、本物の味。",
    subtitleJa: "U Ma! Fruits Premium Line",
    bg: "from-teal-900/60",
  },
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

export default function HomePage() {
  const { t } = useLanguage()
  const [heroIndex, setHeroIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying])

  const featuredFruits = products.filter((p) => p.category === "fruits").slice(0, 4)
  const featuredVeges = products.filter((p) => p.category === "vegetables").slice(0, 3)

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.titleJa}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                const colors = ["16a34a", "ea580c", "059669", "0d9488"]
                t.src = `https://placehold.co/1920x700/${colors[i]}/ffffff?text=U+Ma!+Fruits`
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} to-transparent`} />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: i === heroIndex ? 1 : 0, y: i === heroIndex ? 0 : 30 }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-green-300 text-sm font-medium mb-2 tracking-widest uppercase">
                    U Ma! Fruits
                  </p>
                  <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                    {slide.titleJa}
                  </h1>
                  <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow">{slide.subtitleJa}</p>
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

        {/* Carousel controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides.map((_, i) => (
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

        {/* Arrow buttons */}
        <button
          onClick={() => setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setHeroIndex((i) => (i + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Features bar */}
      <section className="bg-green-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { icon: "🌿", text: "100%国産素材" },
              { icon: "🔥", text: "無加熱製法" },
              { icon: "🚚", text: "3000円以上送料無料" },
              { icon: "♻️", text: "添加物不使用" },
            ].map((f) => (
              <div key={f.text} className="flex items-center justify-center gap-2">
                <span className="text-lg">{f.icon}</span>
                <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fruits Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-green-600 text-sm font-medium tracking-wide mb-1">FRUITS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t.home.fruitsTitle}</h2>
          </div>
          <Link
            to="/fruits"
            className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-1"
          >
            {t.allProducts}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredFruits.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-800 to-emerald-600">
        <div className="absolute inset-0 opacity-10">
          <img
            src={`${BASE}/images/bg.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-green-300 text-sm tracking-widest uppercase mb-3">Brand Story</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t.home.brandTitle}
            </h2>
            <p className="text-white/85 text-base leading-relaxed mb-8">
              {t.home.brandText}
            </p>
            <div className="flex gap-4 flex-wrap">
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
                会社情報
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vegetables Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-orange-500 text-sm font-medium tracking-wide mb-1">VEGETABLES</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t.home.vegeTitle}</h2>
          </div>
          <Link
            to="/vegetables"
            className="text-orange-500 font-medium text-sm hover:text-orange-600 flex items-center gap-1"
          >
            {t.allProducts}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featuredVeges.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seasonal / Food Know How */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-green-600 text-sm font-medium tracking-wide mb-1 text-center">KNOWLEDGE</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
            {t.home.seasonalTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { img: `${BASE}/images/partners_img1.jpg`, label: "りんごの秘密" },
              { img: `${BASE}/images/partners_img2.jpg`, label: "ビタミンC" },
              { img: `${BASE}/images/partners_img3.jpg`, label: "無加熱製法" },
              { img: `${BASE}/images/partners_img4.jpg`, label: "産地直送" },
              { img: `${BASE}/images/partners_img5.jpg`, label: "健康習慣" },
            ].map((item, i) => (
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

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-green-600 text-sm font-medium tracking-wide mb-1 text-center">REVIEWS</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
          {t.home.reviewTitle}
        </h2>
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
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
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
