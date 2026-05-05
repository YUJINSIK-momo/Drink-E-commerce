import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useCart } from "../context/CartContext"
import { getProductBySlug, getRelatedProducts } from "../data/products"
import ProductCard from "../components/ProductCard"

type Tab = "detail" | "ingredients" | "returns" | "reviews"

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useLanguage()
  const { addItem } = useCart()
  const navigate = useNavigate()

  const product = getProductBySlug(slug || "")
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<Tab>("detail")
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">商品が見つかりません</p>
        <Link to="/" className="text-green-600 hover:underline mt-4 block">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product)
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name[lang],
        price: displayPrice,
        image: product.image,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "detail", label: t.product.detail },
    { key: "ingredients", label: t.product.ingredients },
    { key: "returns", label: t.product.returns },
    { key: "reviews", label: t.product.reviews },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8 flex-wrap">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link
          to={product.category === "fruits" ? "/fruits" : "/vegetables"}
          className="hover:text-gray-700"
        >
          {product.category === "fruits" ? t.nav.fruits : t.nav.vegetables}
        </Link>
        <span>/</span>
        <span className="text-gray-800">{product.name[lang]}</span>
      </nav>

      {/* Product main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name[lang]}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = `https://placehold.co/600x600/e8f5e9/2d6a4f?text=${encodeURIComponent(product.flavor[lang])}`
              }}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/80x80/e8f5e9/2d6a4f?text=${i + 1}`
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400">
              {product.id}
            </span>
            {product.isNew && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
            )}
            {product.isSale && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name[lang]}</h1>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description[lang]}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            {product.isSale && product.salePrice ? (
              <>
                <span className="text-3xl font-bold text-red-600">¥{product.salePrice.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">¥{product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-800">¥{product.price.toLocaleString()}</span>
            )}
            <span className="text-sm text-gray-500">{t.product.taxIncluded}</span>
          </div>
          <p className="text-xs text-green-600 mb-6">🚚 {t.product.freeShipping}</p>

          {/* Product info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-2">
            <div className="flex gap-3">
              <span className="text-gray-500 w-20 flex-shrink-0">種類</span>
              <span className="text-gray-800">通常品</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-500 w-20 flex-shrink-0">{t.product.volume}</span>
              <span className="text-gray-800">{product.volume}（x1）</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-500 w-20 flex-shrink-0">容器種類</span>
              <span className="text-gray-800">ペットボトル</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-500 w-20 flex-shrink-0">配送</span>
              <span className="text-gray-800">{t.product.deliveryDays}</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-600">{t.product.quantity}</span>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-full font-semibold transition-all ${
                added
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {added ? "✓ カートに追加しました" : `🛒 ${t.product.addToCart}`}
            </button>
            <button className="w-full py-3.5 rounded-full font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              ❤️ {t.product.addToFavorite}
            </button>
            <button
              onClick={() => {
                handleAddToCart()
                navigate("/cart")
              }}
              className="w-full py-3.5 rounded-full font-semibold bg-gray-800 text-white hover:bg-gray-900 transition-colors"
            >
              {t.product.buy}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-0">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === tabItem.key
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mb-16">
        {tab === "detail" && (
          <div className="max-w-2xl">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">商品情報</h3>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  { label: "商品名", value: product.name[lang] },
                  { label: "フレーバー", value: product.flavor[lang] },
                  { label: "容量", value: product.volume },
                  { label: "製造", value: product.origin },
                  { label: "賞味期限", value: product.expiry },
                  { label: "JANコード", value: product.jan },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-gray-100">
                    <td className="py-3 pr-6 text-gray-500 w-32 font-medium">{row.label}</td>
                    <td className="py-3 text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "ingredients" && (
          <div className="max-w-2xl">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">栄養成分表示（100mlあたり）</h3>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  { label: t.product.energy, value: product.nutrition.energy },
                  { label: t.product.protein, value: product.nutrition.protein },
                  { label: t.product.fat, value: product.nutrition.fat },
                  { label: t.product.carbs, value: product.nutrition.carbs },
                  { label: t.product.salt, value: product.nutrition.salt },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-gray-100">
                    <td className="py-3 pr-6 text-gray-500 w-40 font-medium">{row.label}</td>
                    <td className="py-3 text-gray-800 font-semibold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-4">
              ※ 栄養成分値は目安です。商品によって多少異なる場合があります。
            </p>
          </div>
        )}

        {tab === "returns" && (
          <div className="max-w-2xl prose prose-sm text-gray-600 space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">返品・交換について</h3>
            <p>
              商品到着後7日以内にお申し出ください。未開封・未使用の商品に限り、返品・交換を承ります。
            </p>
            <p>
              お客様のご都合による返品・交換の場合、返送料はお客様のご負担となります。
              不良品・誤送品の場合は当社が送料を負担いたします。
            </p>
            <p>
              詳細は<Link to="/contact" className="text-green-600 hover:underline">お問い合わせ</Link>よりご連絡ください。
            </p>
          </div>
        )}

        {tab === "reviews" && (
          <div className="max-w-2xl">
            <div className="text-center py-10 text-gray-400">
              <p>まだレビューはありません</p>
              <p className="text-sm mt-1">最初のレビューを書いてみませんか？</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{t.product.relatedProducts}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
