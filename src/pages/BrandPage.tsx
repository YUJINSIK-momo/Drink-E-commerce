import { useLanguage } from "../context/LanguageContext"
import { Link } from "react-router-dom"

const BASE = "/Drink-E-commerce"

export default function BrandPage() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-br from-green-800 to-emerald-600 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={`${BASE}/images/bg.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-green-300 text-sm tracking-widest uppercase mb-3">Brand Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.brand.title}</h1>
          <p className="text-white/80 text-lg">{t.brand.subtitle}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span className="text-gray-800">{t.brand.title}</span>
        </nav>
      </div>

      {/* Story sections */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-20">

        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-2">01</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">青森の大地から生まれた</h2>
            <p className="text-gray-600 leading-relaxed">
              U Ma! Fruitsは、青森県の豊かな自然の中で育まれた果物や野菜を原材料としています。
              厳しい寒暖差が生み出す甘みと栄養価の高い素材を、生産者と直接連携し調達しています。
              産地との強い絆が、品質を支えています。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
            <img
              src={`${BASE}/images/case1.jpg`}
              alt="青森の大地"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = "https://placehold.co/600x400/e8f5e9/2d6a4f?text=Aomori+Farm"
              }}
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 rounded-2xl overflow-hidden aspect-video bg-gray-100">
            <img
              src={`${BASE}/images/fancy_new.jpg`}
              alt="無加熱製法"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = "https://placehold.co/600x400/d1fae5/065f46?text=Raw+Process"
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-2">02</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">無加熱製法へのこだわり</h2>
            <p className="text-gray-600 leading-relaxed">
              私たちのジュースは、熱を加えない「コールドプレス製法」を採用しています。
              加熱処理をしないことで、ビタミンや酵素をそのままに。
              素材本来の色、香り、栄養価を最大限に生かしたジュースをお届けします。
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-2">03</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">100%国産・無添加</h2>
            <p className="text-gray-600 leading-relaxed">
              使用する原材料はすべて国産。添加物・保存料・着色料は一切不使用です。
              安心して毎日飲んでいただけるよう、素材の厳選から製造まで一貫した品質管理を行っています。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
            <img
              src={`${BASE}/images/bag_new.jpg`}
              alt="100%国産"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = "https://placehold.co/600x400/dcfce7/166534?text=100%25+Japan"
              }}
            />
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">私たちの価値観</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌿",
                title: "自然",
                desc: "自然の恵みを最大限に活かした製品づくり",
              },
              {
                icon: "💚",
                title: "健康",
                desc: "毎日の健康をサポートする栄養価の高いジュース",
              },
              {
                icon: "🤝",
                title: "信頼",
                desc: "生産者・お客様との誠実な関係を大切に",
              },
            ].map((val) => (
              <div
                key={val.title}
                className="bg-green-50 rounded-2xl p-6 text-center border border-green-100"
              >
                <div className="text-4xl mb-3">{val.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-green-700 to-emerald-600 rounded-3xl py-14 px-6">
          <h2 className="text-white text-2xl font-bold mb-4">まずは一度、試してみてください</h2>
          <p className="text-white/80 mb-8">U Ma!Fruitsの本物の味を、あなたの毎日に。</p>
          <Link
            to="/fruits"
            className="inline-block bg-white text-green-700 font-bold px-10 py-3.5 rounded-full hover:bg-green-50 transition-colors"
          >
            商品を見る
          </Link>
        </section>
      </div>
    </div>
  )
}
