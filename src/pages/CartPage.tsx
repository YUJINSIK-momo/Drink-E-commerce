import { useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useCart } from "../context/CartContext"
import { createOrder, type OrderResult } from "../api/client"

export default function CartPage() {
  const { t, lang } = useLanguage()
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const [order, setOrder] = useState<OrderResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0 || submitting) return
    setSubmitting(true)
    try {
      const result = await createOrder(
        items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      )
      setOrder(result)
      clearCart()
    } finally {
      setSubmitting(false)
    }
  }

  // 주문 완료 화면 (서버가 계산한 금액 · 주문번호 표시)
  if (order) {
    const title = { ja: "ご注文ありがとうございます", ko: "주문이 완료되었습니다", en: "Order placed" }[lang]
    const orderNoLabel = { ja: "注文番号", ko: "주문번호", en: "Order No." }[lang]
    const totalLabel = { ja: "合計", ko: "합계", en: "Total" }[lang]
    const demoNote = {
      ja: "※ デモ環境：APIが未接続のため擬似的に生成された注文です。",
      ko: "※ 데모 환경: API가 연결되지 않아 시뮬레이션된 주문입니다.",
      en: "※ Demo: API not connected, so this order was simulated.",
    }[lang]
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{orderNoLabel}</span>
            <span className="font-mono text-gray-800">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-amber-600">{order.status}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800">
            <span>{totalLabel}</span>
            <span>¥{order.totalPrice.toLocaleString()}</span>
          </div>
        </div>
        {order.simulated && <p className="text-xs text-gray-400 mb-6">{demoNote}</p>}
        <Link
          to="/fruits"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          {t.cart.continueShopping}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <Link to="/" className="hover:text-gray-700">{t.home2}</Link>
        <span>/</span>
        <span className="text-gray-800">{t.cart.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t.cart.title}</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 text-lg mb-6">{t.cart.empty}</p>
          <Link
            to="/fruits"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            {t.allProducts}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/80x80/e8f5e9/2d6a4f?text=J"
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-green-600 font-bold">¥{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800">
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4">{t.cart.summary}</h2>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.subtotal}</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.shipping}</span>
                  <span className={total >= 3000 ? "text-green-600" : ""}>
                    {total >= 3000 ? t.cart.free : "¥500"}
                  </span>
                </div>
                {total >= 3000 && (
                  <p className="text-green-600 text-xs">{t.cart.freeShippingNote}</p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 text-base">
                  <span>{t.cart.total}</span>
                  <span>¥{(total >= 3000 ? total : total + 500).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={submitting}
                className="w-full bg-green-600 text-white py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "..." : t.cart.checkout}
              </button>
              <Link
                to="/fruits"
                className="block text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t.cart.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
