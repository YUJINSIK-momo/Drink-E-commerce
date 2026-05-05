import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useCart } from "../context/CartContext"
import type { Product } from "../data/products"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { lang, t } = useLanguage()
  const { addItem } = useCart()

  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/400x400/e8f5e9/2d6a4f?text=${encodeURIComponent(product.flavor[lang])}`
            }}
          />
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              SALE
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">
          {product.category === "fruits" ? "U Ma! Fruits" : "Vegetable"}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 hover:text-green-600 transition-colors line-clamp-2">
            {product.name[lang]}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description[lang]}</p>

        <div className="flex items-center justify-between">
          <div>
            {product.isSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">¥{product.salePrice.toLocaleString()}</span>
                <span className="text-xs text-gray-400 line-through">¥{product.price.toLocaleString()}</span>
              </div>
            ) : (
              <span className="font-bold text-gray-800">¥{product.price.toLocaleString()}</span>
            )}
            <span className="text-xs text-gray-400 ml-1">{t.product.taxIncluded}</span>
          </div>

          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name[lang],
                price: displayPrice,
                image: product.image,
              })
            }
            className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-700 transition-colors"
          >
            + {t.nav.cart}
          </button>
        </div>
      </div>
    </div>
  )
}
