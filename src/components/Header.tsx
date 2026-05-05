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
    { code: "en", label: "EN" },
  ]

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600"

  const navLink = "px-2.5 py-2 text-sm rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
  const dropItem = "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 whitespace-nowrap"

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-xs py-1.5 text-center hidden md:block">
        {t.nav.topBar}
      </div>

      {/* Main header — full width, inner max-w-screen-xl */}
      <div className="w-full px-4 xl:px-8">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-base">U</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-green-700 text-sm leading-tight">U Ma! Fruits</div>
              <div className="text-[10px] text-gray-400">Natural Drink Brand</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            <Link to="/" className={`${navLink} ${isActive("/")}`}>
              {t.nav.home}
            </Link>

            {/* Fruits */}
            <div className="relative" onMouseEnter={() => setFruitsOpen(true)} onMouseLeave={() => setFruitsOpen(false)}>
              <Link to="/fruits" className={`${navLink} ${isActive("/fruits")}`}>
                {t.nav.fruits}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {fruitsOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-44 border border-gray-100 z-50">
                  <Link to="/product/apple" className={dropItem}>🍎 {t.nav.products.apple}</Link>
                  <Link to="/product/watermelon" className={dropItem}>🍉 {t.nav.products.watermelon}</Link>
                  <Link to="/product/orange" className={dropItem}>🍊 {t.nav.products.orange}</Link>
                  <Link to="/product/grape" className={dropItem}>🍇 {t.nav.products.grape}</Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link to="/fruits" className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 font-medium hover:bg-green-50">
                      {t.allProducts} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Vegetables */}
            <div className="relative" onMouseEnter={() => setVegeOpen(true)} onMouseLeave={() => setVegeOpen(false)}>
              <Link to="/vegetables" className={`${navLink} ${isActive("/vegetables")}`}>
                {t.nav.vegetables}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {vegeOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-44 border border-gray-100 z-50">
                  <Link to="/product/carrot" className={dropItem}>🥕 {t.nav.products.carrot}</Link>
                  <Link to="/product/tomato" className={dropItem}>🍅 {t.nav.products.tomato}</Link>
                  <Link to="/product/paprika" className={dropItem}>🫑 {t.nav.products.paprika}</Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link to="/vegetables" className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 font-medium hover:bg-green-50">
                      {t.allProducts} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Brand */}
            <div className="relative" onMouseEnter={() => setBrandOpen(true)} onMouseLeave={() => setBrandOpen(false)}>
              <button className={`${navLink} text-gray-700 hover:text-green-600`}>
                {t.nav.brand}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {brandOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-44 border border-gray-100 z-50">
                  <Link to="/brand" className={dropItem}>🌿 {t.nav.sub.brandStory}</Link>
                  <Link to="/company" className={dropItem}>🏢 {t.nav.sub.companyInfo}</Link>
                </div>
              )}
            </div>

            {/* Guide */}
            <div className="relative" onMouseEnter={() => setGuideOpen(true)} onMouseLeave={() => setGuideOpen(false)}>
              <button className={`${navLink} text-gray-700 hover:text-green-600`}>
                {t.nav.guide}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {guideOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 border border-gray-100 z-50">
                  <Link to="/faq" className={dropItem}>❓ {t.nav.sub.faqLink}</Link>
                  <Link to="/guide/delivery" className={dropItem}>🚚 {t.nav.sub.delivery}</Link>
                  <Link to="/guide/returns" className={dropItem}>🔄 {t.nav.sub.returns}</Link>
                  <Link to="/guide/terms" className={dropItem}>📄 {t.nav.sub.terms}</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className={`${navLink} ${isActive("/contact")}`}>
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language switcher */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-full px-2 py-1 text-xs gap-0.5">
              {langOptions.map((opt, i) => (
                <span key={opt.code} className="flex items-center">
                  <button
                    onClick={() => setLang(opt.code)}
                    className={`px-1 py-0.5 rounded transition-colors ${
                      lang === opt.code ? "text-green-600 font-bold" : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                  {i < langOptions.length - 1 && <span className="text-gray-300">/</span>}
                </span>
              ))}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1 text-xs text-gray-700 hover:text-green-600 px-2.5 py-1.5 border border-gray-200 rounded-full transition-colors whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t.nav.login}
            </Link>

            {/* Mobile hamburger */}
            <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md">
              {t.nav.home}
            </Link>

            <p className="px-3 pt-2 pb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wide">{t.nav.fruits}</p>
            {[
              { to: "/product/apple", icon: "🍎", label: t.nav.products.apple },
              { to: "/product/watermelon", icon: "🍉", label: t.nav.products.watermelon },
              { to: "/product/orange", icon: "🍊", label: t.nav.products.orange },
              { to: "/product/grape", icon: "🍇", label: t.nav.products.grape },
              { to: "/fruits", icon: "→", label: t.allProducts },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">
                {item.icon} {item.label}
              </Link>
            ))}

            <p className="px-3 pt-2 pb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wide">{t.nav.vegetables}</p>
            {[
              { to: "/product/carrot", icon: "🥕", label: t.nav.products.carrot },
              { to: "/product/tomato", icon: "🍅", label: t.nav.products.tomato },
              { to: "/product/paprika", icon: "🫑", label: t.nav.products.paprika },
              { to: "/vegetables", icon: "→", label: t.allProducts },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">
                {item.icon} {item.label}
              </Link>
            ))}

            <p className="px-3 pt-2 pb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wide">{t.nav.brand}</p>
            <Link to="/brand" onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">🌿 {t.nav.sub.brandStory}</Link>
            <Link to="/company" onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">🏢 {t.nav.sub.companyInfo}</Link>

            <p className="px-3 pt-2 pb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wide">{t.nav.guide}</p>
            <Link to="/faq" onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">❓ {t.nav.sub.faqLink}</Link>
            <Link to="/guide/delivery" onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">🚚 {t.nav.sub.delivery}</Link>
            <Link to="/guide/returns" onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">🔄 {t.nav.sub.returns}</Link>

            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">{t.nav.contact}</Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md">{t.nav.login}</Link>

            {/* Mobile lang switcher */}
            <div className="flex gap-2 px-3 pt-3 pb-1 border-t border-gray-100 mt-2">
              {langOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => { setLang(opt.code); setMobileOpen(false) }}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    lang === opt.code
                      ? "bg-green-600 text-white border-green-600"
                      : "text-gray-600 border-gray-300 hover:border-green-400"
                  }`}
                >
                  {opt.code === "ja" ? "日本語" : opt.code === "ko" ? "한국어" : "English"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
