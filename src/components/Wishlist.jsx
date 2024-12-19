import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { wishlistItemStore } from '../store/wishlistItemsState';
import { useCartItems } from '../store/cartItemsState';
import { Loader } from 'lucide-react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

// Main Wishlist Component
const Wishlist = () => {
  const { products, getProduct, isProductLoading } = wishlistItemStore();
  const [inputValue, setInputValue] = useState("");
  const { carts, setCartItem } = useCartItems();

  useEffect(() => {
    getProduct(inputValue);
  }, [inputValue, getProduct]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartCount={carts?.length || 0}
        onSearch={setInputValue}
        searchValue={inputValue}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
          <p className="mt-2 text-gray-600">Discover and save your favorite items</p>
        </div>

        {isProductLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading your wishlist...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setCartItem={setCartItem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Wishlist;
