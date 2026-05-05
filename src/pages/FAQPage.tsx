import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"

interface FAQItem {
  question: string
  answer: string
}

const faqData: Record<string, FAQItem[]> = {
  account: [
    {
      question: "アカウントを作成するにはどうすればいいですか？",
      answer: "ページ右上の「ログイン」から「新規会員登録」をお選びください。メールアドレスとパスワードを設定するだけで簡単に登録できます。",
    },
    {
      question: "パスワードを忘れてしまいました。",
      answer: "ログインページの「パスワードを忘れた方」リンクからパスワードの再設定が可能です。登録メールアドレスに再設定リンクをお送りします。",
    },
    {
      question: "メールアドレスを変更したい場合は？",
      answer: "マイページの「アカウント設定」からメールアドレスの変更が可能です。変更後は確認メールが送信されます。",
    },
  ],
  payment: [
    {
      question: "使用可能な決済方法を教えてください。",
      answer: "クレジットカード（VISA・MasterCard・JCB・AMEX）、銀行振込、コンビニ決済、PayPayに対応しています。",
    },
    {
      question: "領収書は発行できますか？",
      answer: "はい、マイページの注文履歴から領収書のPDFをダウンロードいただけます。宛名の変更も可能です。",
    },
  ],
  delivery: [
    {
      question: "配送にどのくらいかかりますか？",
      answer: "通常3〜5営業日でお届けします。お急ぎの場合は速達便（追加料金）もご利用いただけます。",
    },
    {
      question: "送料はいくらですか？",
      answer: "全国一律500円（税込）です。3,000円以上のご購入で送料無料となります。",
    },
    {
      question: "配送状況を確認できますか？",
      answer: "発送後にお送りするメールに追跡番号が記載されています。配送会社のサイトで確認可能です。",
    },
  ],
  returns: [
    {
      question: "返品・交換はできますか？",
      answer: "商品到着後7日以内の未開封・未使用品に限り、返品・交換を承ります。お問い合わせフォームよりご連絡ください。",
    },
    {
      question: "商品が破損していた場合はどうすればいいですか？",
      answer: "商品到着後すぐにご連絡ください。写真をご提出いただいた上で、代替品の送付または返金対応いたします。送料は当社負担です。",
    },
  ],
  general: [
    {
      question: "賞味期限はどれくらいですか？",
      answer: "商品によって異なりますが、製造より180〜240日が目安です。各商品ページでご確認いただけます。",
    },
    {
      question: "開封後はどのくらいで飲み切ればいいですか？",
      answer: "開封後は冷蔵保存のうえ、1〜2日以内にお飲みください。",
    },
    {
      question: "アレルギー情報はありますか？",
      answer: "各商品ページの「原材料・成分」タブにアレルギー情報を記載しております。ご確認の上ご購入ください。",
    },
  ],
}

const categoryLabels = {
  account: "アカウント・ログイン",
  payment: "お支払い",
  delivery: "配送",
  returns: "返品・交換",
  general: "商品全般",
}

export default function FAQPage() {
  const { t } = useLanguage()
  const [openCategory, setOpenCategory] = useState<string>("account")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <a href="/" className="hover:text-gray-700">Home</a>
        <span>/</span>
        <span className="text-gray-800">{t.faq.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.faq.title}</h1>
      <p className="text-gray-500 mb-10">よくいただくご質問をまとめました。</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setOpenCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              openCategory === key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-3">
        {faqData[openCategory]?.map((item, i) => {
          const key = `${openCategory}-${i}`
          const isOpen = openItems.has(key)
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(key)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-sm mt-0.5 flex-shrink-0">Q.</span>
                  <span className="text-gray-800 font-medium text-sm">{item.question}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 flex gap-3">
                  <span className="text-orange-400 font-bold text-sm flex-shrink-0">A.</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center border border-green-100">
        <h3 className="text-lg font-semibold text-green-800 mb-2">解決しない場合は？</h3>
        <p className="text-green-700 text-sm mb-4">お気軽にお問い合わせください。</p>
        <a
          href="/Drink-E-commerce/contact"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          お問い合わせへ
        </a>
      </div>
    </div>
  )
}
