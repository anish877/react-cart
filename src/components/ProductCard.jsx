import React from 'react';
import { ShoppingCart, Star, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product, setCartItem }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showCartButton, setShowCartButton] = React.useState(false);

  const handleAddToCart = () => {
    setCartItem(product, 1);
    setShowCartButton(true);
    
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <CheckCircle className="h-10 w-10 text-green-500 fill-green-100" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Added to Cart
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {product.title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          {/* <Link
            to="/cart"
            className="w-full border border-transparent flex items-center justify-center p-4 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Cart
          </Link> */}
        </div>
      </div>
    ), {
      duration: 3000
    });
  };

  return (
    <div
      className="group relative w-full max-w-sm rounded-xl bg-white shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
      >
        <Heart
          size={20}
          className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="p-6">
        {/* Product Details */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <h2 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-gray-900">
          {product.title}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>

        {/* Buttons Container */}
        <div className="space-y-2">
          {/* Add to Cart Button */}
          <button
            className="group/btn relative w-full overflow-hidden rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="transition-transform group-hover/btn:animate-bounce" size={20} />
              Add to Cart
            </span>
          </button>

          {/* View Cart Button - Shows after adding item */}
          {/* {showCartButton && (
            <Link
              to="/cart"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 py-3 text-blue-600 transition-colors hover:bg-blue-50"
            >
              View Cart
              <ArrowRight size={20} />
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;