import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FloatingMenu from "./components/FloatingMenu"
import HomePage from "./pages/HomePage"
import ProductListPage from "./pages/ProductListPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ContactPage from "./pages/ContactPage"
import FAQPage from "./pages/FAQPage"
import CompanyPage from "./pages/CompanyPage"
import BrandPage from "./pages/BrandPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import MapPage from "./pages/MapPage"
import GuidePage from "./pages/GuidePage"

export default function App() {
  return (
    <BrowserRouter basename="/Drink-E-commerce">
      <LanguageProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fruits" element={<ProductListPage category="fruits" />} />
                <Route path="/vegetables" element={<ProductListPage category="vegetables" />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/brand" element={<BrandPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/guide/:type" element={<GuidePage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingMenu />
          </div>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
