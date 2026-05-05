import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">U Ma! Fruits</div>
                <div className="text-xs text-gray-500">Natural Drink Brand</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              100%国産フルーツ&ベジタブルジュース。<br />
              自然の恵みをそのままお届けします。
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Blog"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.73a4.85 4.85 0 01-1-.04z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">商品</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/fruits" className="hover:text-green-400 transition-colors">🍎 U Ma! Fruits</Link></li>
              <li><Link to="/product/apple" className="hover:text-green-400 transition-colors">りんご</Link></li>
              <li><Link to="/product/watermelon" className="hover:text-green-400 transition-colors">スイカ</Link></li>
              <li><Link to="/product/orange" className="hover:text-green-400 transition-colors">オレンジ</Link></li>
              <li><Link to="/product/grape" className="hover:text-green-400 transition-colors">ブドウ</Link></li>
              <li><Link to="/vegetables" className="hover:text-green-400 transition-colors mt-2 block">🥕 ベジタブル</Link></li>
              <li><Link to="/product/carrot" className="hover:text-green-400 transition-colors">人参</Link></li>
              <li><Link to="/product/tomato" className="hover:text-green-400 transition-colors">トマト</Link></li>
              <li><Link to="/product/paprika" className="hover:text-green-400 transition-colors">パプリカ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">ブランド</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/brand" className="hover:text-green-400 transition-colors">ブランドストーリー</Link></li>
              <li><Link to="/company" className="hover:text-green-400 transition-colors">会社情報</Link></li>
              <li><Link to="/map" className="hover:text-green-400 transition-colors">アクセス</Link></li>
            </ul>
            <h3 className="text-white font-semibold mb-4 mt-6 text-sm">ガイド</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-green-400 transition-colors">よくある質問</Link></li>
              <li><Link to="/guide/delivery" className="hover:text-green-400 transition-colors">配送・送金</Link></li>
              <li><Link to="/guide/returns" className="hover:text-green-400 transition-colors">返金について</Link></li>
              <li><Link to="/guide/terms" className="hover:text-green-400 transition-colors">利用規約</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">お問い合わせ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t.footer.address}</span>
              </li>
              <li>
                <Link to="/map" className="text-green-400 hover:text-green-300 transition-colors text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {t.footer.map}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors mt-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">{t.footer.copyright}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/guide/terms" className="hover:text-gray-300 transition-colors">利用規約</Link>
            <Link to="/guide/privacy" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
