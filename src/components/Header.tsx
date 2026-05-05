import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useCart } from "../context/CartContext"
import type { Language } from "../i18n"

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const { count } = useCart()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [fruitsOpen, setFruitsOpen] = useState(false)
  const [vegeOpen, setVegeOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)

  const langOptions: { code: Language; label: string }[] = [
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
  ]

  const isActive = (path: string) =>
    location.pathname === path ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-xs py-1.5 text-center hidden md:block">
        🌿 100%国産フルーツ&ベジタブルジュース | 3000円以上購入で送料無料
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <div className="font-bold text-green-700 text-sm leading-tight">U Ma! Fruits</div>
              <div className="text-xs text-gray-400">Natural Drink Brand</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className={`px-3 py-2 text-sm rounded-md transition-colors ${isActive("/")}`}>
              {t.nav.home}
            </Link>

            {/* Fruits dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFruitsOpen(true)}
              onMouseLeave={() => setFruitsOpen(false)}
            >
              <Link
                to="/fruits"
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1 ${isActive("/fruits")}`}
              >
                {t.nav.fruits}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {fruitsOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 border border-gray-100">
                  <Link
                    to="/product/apple"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🍎 りんご
                  </Link>
                  <Link
                    to="/product/watermelon"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🍉 スイカ
                  </Link>
                  <Link
                    to="/product/orange"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🍊 オレンジ
                  </Link>
                  <Link
                    to="/product/grape"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🍇 ブドウ
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      to="/fruits"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 font-medium hover:bg-green-50"
                    >
                      {t.allProducts} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Vegetables dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setVegeOpen(true)}
              onMouseLeave={() => setVegeOpen(false)}
            >
              <Link
                to="/vegetables"
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1 ${isActive("/vegetables")}`}
              >
                {t.nav.vegetables}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {vegeOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 border border-gray-100">
                  <Link
                    to="/product/carrot"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🥕 人参
                  </Link>
                  <Link
                    to="/product/tomato"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🍅 トマト
                  </Link>
                  <Link
                    to="/product/paprika"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🫑 パプリカ
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      to="/vegetables"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 font-medium hover:bg-green-50"
                    >
                      {t.allProducts} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Brand dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandOpen(true)}
              onMouseLeave={() => setBrandOpen(false)}
            >
              <button
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1 text-gray-700 hover:text-green-600`}
              >
                {t.nav.brand}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {brandOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 border border-gray-100">
                  <Link
                    to="/brand"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🌿 ブランドストーリー
                  </Link>
                  <Link
                    to="/company"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🏢 会社情報
                  </Link>
                </div>
              )}
            </div>

            {/* Guide dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGuideOpen(true)}
              onMouseLeave={() => setGuideOpen(false)}
            >
              <button
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1 text-gray-700 hover:text-green-600`}
              >
                {t.nav.guide}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {guideOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 border border-gray-100">
                  <Link
                    to="/faq"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    ❓ よくある質問
                  </Link>
                  <Link
                    to="/guide/delivery"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🚚 配送・送金
                  </Link>
                  <Link
                    to="/guide/returns"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    🔄 返金について
                  </Link>
                  <Link
                    to="/guide/terms"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    📄 利用規約
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`px-3 py-2 text-sm rounded-md transition-colors ${isActive("/contact")}`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 text-xs border border-gray-200 rounded-full px-2 py-1">
              {langOptions.map((opt, i) => (
                <span key={opt.code} className="flex items-center">
                  <button
                    onClick={() => setLang(opt.code)}
                    className={`px-1 transition-colors ${
                      lang === opt.code
                        ? "text-green-600 font-bold"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                  {i < langOptions.length - 1 && <span className="text-gray-300 mx-0.5">/</span>}
                </span>
              ))}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition-colors px-3 py-1.5 border border-gray-200 rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {t.nav.login}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
            >
              {t.nav.home}
            </Link>
            <div className="px-3 py-1 text-xs text-gray-400 font-semibold uppercase tracking-wide">
              {t.nav.fruits}
            </div>
            {[
              { to: "/product/apple", label: "🍎 りんご" },
              { to: "/product/watermelon", label: "🍉 スイカ" },
              { to: "/product/orange", label: "🍊 オレンジ" },
              { to: "/product/grape", label: "🍇 ブドウ" },
              { to: "/fruits", label: `→ ${t.allProducts}` },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-1 text-xs text-gray-400 font-semibold uppercase tracking-wide">
              {t.nav.vegetables}
            </div>
            {[
              { to: "/product/carrot", label: "🥕 人参" },
              { to: "/product/tomato", label: "🍅 トマト" },
              { to: "/product/paprika", label: "🫑 パプリカ" },
              { to: "/vegetables", label: `→ ${t.allProducts}` },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/brand"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
            >
              {t.nav.brand}
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
            >
              {t.nav.guide}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
            >
              {t.nav.contact}
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md"
            >
              {t.nav.login}
            </Link>

            {/* Mobile lang switcher */}
            <div className="flex items-center gap-2 px-3 pt-2 pb-1 border-t border-gray-100 mt-2">
              {langOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLang(opt.code)
                    setMobileOpen(false)
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    lang === opt.code
                      ? "bg-green-600 text-white border-green-600"
                      : "text-gray-600 border-gray-300 hover:border-green-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
