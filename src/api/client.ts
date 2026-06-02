import {
  products as staticProducts,
  getProductBySlug,
  getProductsByCategory,
  type Product,
} from "../data/products"

// 백엔드 API 주소. .env 의 VITE_API_BASE_URL 로 주입한다.
// 비어 있거나 API가 죽어 있으면 정적 데이터(products.ts)로 폴백 →
// GitHub Pages 데모는 백엔드 없이도 항상 동작한다.
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "")

async function tryFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_BASE) return null
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as T
  } catch (err) {
    console.warn(`[api] ${path} 실패 → 정적 데이터로 폴백`, err)
    return null
  }
}

export async function fetchProducts(category?: "fruits" | "vegetables"): Promise<Product[]> {
  const query = category ? `?category=${category}` : ""
  const data = await tryFetch<Product[]>(`/api/products${query}`)
  if (data) return data
  return category ? getProductsByCategory(category) : staticProducts
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  const data = await tryFetch<Product>(`/api/products/${slug}`)
  if (data) return data
  return getProductBySlug(slug)
}

export interface OrderItemInput {
  productId: string
  quantity: number
}

export interface OrderResult {
  id: string
  status: string
  totalPrice: number
  items: { productId: string; unitPrice: number; quantity: number }[]
  simulated?: boolean
}

function unitPriceOf(productId: string): number {
  const p = staticProducts.find((sp) => sp.id === productId)
  if (!p) return 0
  return p.isSale && p.salePrice ? p.salePrice : p.price
}

export async function createOrder(
  items: OrderItemInput[],
  customer?: { customerName?: string; customerEmail?: string },
): Promise<OrderResult> {
  const data = await tryFetch<OrderResult>("/api/orders", {
    method: "POST",
    body: JSON.stringify({ items, ...customer }),
  })
  if (data) return data

  // API 미연결 시: 서버와 동일한 규칙(세일가 우선)으로 주문을 시뮬레이션한다.
  const resolved = items.map((it) => ({
    productId: it.productId,
    unitPrice: unitPriceOf(it.productId),
    quantity: it.quantity,
  }))
  return {
    id: `demo-${Date.now()}`,
    status: "PENDING",
    totalPrice: resolved.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0),
    items: resolved,
    simulated: true,
  }
}

export const isApiConfigured = Boolean(API_BASE)
