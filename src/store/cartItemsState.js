import { create } from "zustand"

export const useCartItems = create((set, get) => ({
    carts: JSON.parse(localStorage.getItem("cartItem") || "[]"),
    setCartItem: (item, quantity = 1) => {
        var carts = get().carts
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].item.title == item.title) {
                carts[i].item = item
                carts[i].quantity += quantity
                if (carts[i].quantity == 0) {
                    carts.splice(i, 1)
                }
                localStorage.setItem("cartItem", JSON.stringify(carts))
                set({ carts: carts })
                return
            }
        }
        carts = [...carts, { item: item, quantity: 1 }]
        localStorage.setItem("cartItem", JSON.stringify(carts))
        set({ carts: carts })
    },
    deleteCartItem: (index) => {
        var carts = get().carts
        carts.splice(index, 1)
        localStorage.setItem("cartItem", JSON.stringify(carts))
        set({ carts: carts })
    }
}))