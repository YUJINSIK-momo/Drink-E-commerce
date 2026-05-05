import { useParams, Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

const guideContent: Record<string, { title: string; content: string[] }> = {
  delivery: {
    title: "配送・送金について",
    content: [
      "【配送について】",
      "・通常3〜5営業日でお届けします。",
      "・送料は全国一律500円（税込）です。",
      "・3,000円以上のご購入で送料無料となります。",
      "・離島・一部地域は別途料金が発生する場合があります。",
      "",
      "【お支払い方法】",
      "・クレジットカード（VISA・MasterCard・JCB・AMEX）",
      "・銀行振込",
      "・コンビニ決済",
      "・PayPay",
      "",
      "【タヌキ便について】",
      "・お急ぎの場合は特急便（追加料金800円）をご利用いただけます。",
      "・通常配達3〜5日 → タヌキ便1〜4日に短縮されます。",
    ],
  },
  returns: {
    title: "返金について",
    content: [
      "【返品・交換について】",
      "・商品到着後7日以内にお申し出ください。",
      "・未開封・未使用の商品に限り、返品・交換を承ります。",
      "",
      "【返送料について】",
      "・お客様都合の場合：お客様負担",
      "・不良品・誤送品の場合：当社負担",
      "",
      "【返金について】",
      "・返品確認後、5〜7営業日以内にご返金いたします。",
      "・返金方法はご購入時の決済方法に準じます。",
    ],
  },
  terms: {
    title: "利用規約",
    content: [
      "第1条（目的）",
      "本規約は、(株)U Ma!Fruits（以下「当社」）が提供するサービスの利用条件を定めるものです。",
      "",
      "第2条（会員登録）",
      "会員登録はメールアドレスとパスワードにより行います。登録情報は正確にご入力ください。",
      "",
      "第3条（禁止事項）",
      "・虚偽の情報の登録",
      "・他者への成りすまし",
      "・不正な注文・購入",
      "・当社システムへの不正アクセス",
      "",
      "第4条（免責事項）",
      "当社は、サービスの中断・停止等により生じた損害について、責任を負いかねる場合があります。",
      "",
      "第5条（規約の変更）",
      "本規約は予告なく変更される場合があります。変更後はサイト上で告知いたします。",
    ],
  },
  privacy: {
    title: "プライバシーポリシー",
    content: [
      "当社は、お客様の個人情報の保護に努めています。",
      "",
      "【収集する情報】",
      "・氏名、メールアドレス、電話番号",
      "・配送先住所",
      "・ご注文・購入履歴",
      "",
      "【利用目的】",
      "・商品の発送・配送",
      "・お問い合わせへの対応",
      "・サービス改善のための分析",
      "",
      "【第三者提供】",
      "法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
    ],
  },
}

export default function GuidePage() {
  const { type } = useParams<{ type: string }>()
  const { t } = useLanguage()

  const content = type ? guideContent[type] : null

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.guide.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { to: "/faq", label: t.guide.faq, icon: "❓" },
            { to: "/guide/delivery", label: t.guide.delivery, icon: "🚚" },
            { to: "/guide/returns", label: t.guide.returns, icon: "🔄" },
            { to: "/guide/terms", label: t.guide.terms, icon: "📄" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-green-200"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-800">{item.label}</span>
              <svg
                className="w-4 h-4 ml-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link to="/guide" className="hover:text-gray-700">{t.guide.title}</Link>
        <span>/</span>
        <span className="text-gray-800">{content.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">{content.title}</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
          {content.content.map((line, i) => (
            <p
              key={i}
              className={`${line === "" ? "mt-4" : ""} ${
                line.startsWith("【") ? "font-bold text-gray-800 mt-6 first:mt-0" : ""
              } ${line.startsWith("第") ? "font-bold text-gray-800 mt-6 first:mt-0" : ""}`}
            >
              {line || <br />}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
