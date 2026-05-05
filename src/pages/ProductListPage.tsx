import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

interface Props {
  category: "fruits" | "vegetables"
}

const BASE = "/Drink-E-commerce"

export default function ProductListPage({ category }: Props) {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState<"all" | "new" | "sale">("all")

  const categoryProducts = products.filter((p) => p.category === category)
  const filtered = categoryProducts.filter((p) => {
    if (filter === "new") return p.isNew
    if (filter === "sale") return p.isSale
    return true
  })

  const isFruits = category === "fruits"
  const title = isFruits ? "U Ma! Fruits" : "Vegetable Series"
  const subtitle = isFruits
    ? lang === "ja"
      ? "厳選された国産フルーツを使用したジュース"
      : lang === "ko"
      ? "엄선된 국산 과일을 사용한 주스"
      : "Juices made from carefully selected domestic fruits"
    : lang === "ja"
    ? "新鮮な野菜の栄養をそのまま"
    : lang === "ko"
    ? "신선한 채소의 영양을 그대로"
    : "All the nutrition of fresh vegetables"

  return (
    <div>
      {/* Page Hero */}
      <div
        className={`relative py-20 text-center text-white ${
          isFruits
            ? "bg-gradient-to-br from-green-700 to-emerald-500"
            : "bg-gradient-to-br from-orange-600 to-amber-500"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src={isFruits ? `${BASE}/images/Fruits1.jpg` : `${BASE}/images/carrot.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        </div>
        <div className="relative">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-2">
            {isFruits ? "FRUITS" : "VEGETABLES"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-white/90 text-lg">{subtitle}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span>/</span>
          <span className="text-gray-800">{isFruits ? t.nav.fruits : t.nav.vegetables}</span>
        </nav>
      </div>

      {/* Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">フィルター:</span>
          {(["all", "new", "sale"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? isFruits
                    ? "bg-green-600 text-white"
                    : "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? t.allProducts : f === "new" ? t.new : t.sale}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">{filtered.length}件</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">該当する商品がありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
