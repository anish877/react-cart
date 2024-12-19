import { create } from 'zustand'

export const wishlistItemStore = create((set) => ({
    products: [],
    isProductLoading: false,
    getProduct: async(input) => {
        set({isProductLoading: true})
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${input}`)
            const data = await response.json()
            set({products: data.products}) 
        } catch (error) {
            console.log(error)
        } finally {
            set({isProductLoading: false})
        }
    }
}))