import { createContext, useContext, useMemo, useState } from 'react'
import { catalogue, turnarounds } from '../data/catalogue'

const OrderContext = createContext(null)

export const FREE_DELIVERY_OVER = 15000

export function OrderProvider({ children }) {
  const [cart, setCart] = useState({}) // { [itemId]: qty }
  const [speed, setSpeed] = useState('standard')

  const multiplier = turnarounds.find((t) => t.id === speed).multiplier

  const setQty = (id, next) =>
    setCart((prev) => {
      const copy = { ...prev }
      if (next <= 0) delete copy[id]
      else copy[id] = next
      return copy
    })

  const value = useMemo(() => {
    const lines = Object.entries(cart).map(([id, qty]) => {
      const item = catalogue.find((i) => i.id === id)
      return { ...item, qty, lineTotal: item.price * multiplier * qty }
    })
    const itemCount = lines.reduce((n, l) => n + l.qty, 0)
    const total = lines.reduce((n, l) => n + l.lineTotal, 0)
    return {
      cart, setQty, clear: () => setCart({}),
      speed, setSpeed, multiplier,
      lines, itemCount, total,
      qualifiesFree: total >= FREE_DELIVERY_OVER,
    }
  }, [cart, speed, multiplier])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>')
  return ctx
}
