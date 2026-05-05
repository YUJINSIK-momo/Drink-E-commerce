import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function FloatingMenu() {
  const { count } = useCart()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="fixed right-4 bottom-6 flex flex-col gap-2 z-40">
      <Link
        to="/cart"
        className="relative w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-green-700 transition-colors group"
        title="カート"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="text-[9px] leading-none mt-0.5">カート</span>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </Link>

      <Link
        to="/login"
        className="w-12 h-12 bg-white text-gray-600 border border-gray-200 rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-green-50 hover:text-green-700 transition-colors"
        title="ページ"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[9px] leading-none mt-0.5">ページ</span>
      </Link>

      <Link
        to="/faq"
        className="w-12 h-12 bg-white text-gray-600 border border-gray-200 rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-green-50 hover:text-green-700 transition-colors"
        title="ガイド"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[9px] leading-none mt-0.5">ガイド</span>
      </Link>

      <Link
        to="/contact"
        className="w-12 h-12 bg-white text-gray-600 border border-gray-200 rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-green-50 hover:text-green-700 transition-colors"
        title="問い合わせ"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-[9px] leading-none mt-0.5">問合せ</span>
      </Link>

      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-gray-700 transition-colors"
        title="Top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="text-[9px] leading-none mt-0.5">TOP</span>
      </button>
    </div>
  )
}
