import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export default function LoginPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ id: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{t.login.title}</h1>
          <p className="text-gray-500 text-sm mt-1">U Ma! Fruitsへようこそ</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.login.id}</label>
              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                required
                placeholder="ユーザーID"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.login.password}</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-green-600 hover:underline">
                {t.login.forgot}
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              {t.login.loginBtn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              アカウントをお持ちでない方は{" "}
              <a href="#" className="text-green-600 font-medium hover:underline">
                {t.login.register}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
