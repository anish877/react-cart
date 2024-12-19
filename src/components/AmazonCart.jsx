import React, { useState } from 'react';
import { useCartItems } from '../store/cartItemsState';
import { MinusIcon, PlusIcon, ShoppingCart, CreditCard, Package, Truck, Check, Loader2, TrashIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AmazonCart = () => {
    const { carts, setCartItem, deleteCartItem } = useCartItems();
    const [checkoutState, setCheckoutState] = useState('idle');
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const calculateSubtotal = () => {
        return carts.reduce((total, item) => total + (item.item.price * item.quantity), 0);
    };
    
    const shipping = 4.99;
    const tax = calculateSubtotal() * 0.1;
    const total = calculateSubtotal() + shipping + tax;

    const handleCheckout = () => {
        setCheckoutState('processing');
        setTimeout(() => {
            setCheckoutState('success');
        }, 2000);
    };

    if (checkoutState === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="w-full max-w-lg mx-auto p-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-100">
                        <div className="mb-8">
                            <div className="mx-auto w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-scale-check">
                                    <Check className="w-12 h-12 text-white animate-check" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-up">
                            Thank You for Your Order!
                        </h2>
                        
                        <div className="space-y-4 mb-8 animate-fade-up delay-200">
                            <p className="text-gray-600 text-lg">
                                Your order has been successfully placed and will be processed shortly.
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                                <p className="text-blue-800 font-semibold text-xl">Order Total: ${total.toFixed(2)}</p>
                                <p className="text-blue-600 mt-2">Order #AZ{Math.random().toString().slice(2, 10)}</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-left mb-8 animate-fade-up delay-300">
                            <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                                <Truck className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-medium">Estimated Delivery</p>
                                    <p className="text-sm text-gray-600">2-4 business days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                                <Package className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-medium">Shipping Confirmation</p>
                                    <p className="text-sm text-gray-600">Will be sent to your email</p>
                                </div>
                            </div>
                        </div>
                        
                        <Link to={'/'} className="block">
                            <button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] animate-fade-up delay-400 shadow-md hover:shadow-lg"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                Your Cart ({carts.length} {carts.length === 1 ? 'item' : 'items'})
            </h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        {carts.map((item, index) => (
                            <div 
                                key={item.item.id || index} 
                                className="p-6 transition-all hover:bg-blue-50"
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100 p-2">
                                        <img
                                            src={item.item.thumbnail}
                                            alt={item.item.title}
                                            className="object-contain w-full h-full transition-transform hover:scale-110"
                                        />
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-gray-900 text-xl">{item.item.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <p className="text-green-600 text-sm font-medium">In Stock</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 mt-4">
                                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                                                <button 
                                                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-white transition-colors"
                                                    onClick={() => setCartItem(item.item, -1)}
                                                >
                                                    <MinusIcon className="h-4 w-4 text-gray-600" />
                                                </button>
                                                <span className="w-10 text-center font-medium">{item.quantity}</span>
                                                <button 
                                                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-white transition-colors"
                                                    onClick={() => setCartItem(item.item, 1)}
                                                >
                                                    <PlusIcon className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>
                                            <span className="font-semibold text-xl">
                                                ${(item.item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button 
                                                className={`text-red-500 hover:text-red-600 transition-opacity ${hoveredItem === index ? 'opacity-100' : 'opacity-0'}`}
                                                onClick={() => deleteCartItem(index)}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {index < carts.length - 1 && <div className="h-px bg-gray-100 mt-6" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-medium">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Estimated tax</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between text-xl font-semibold text-gray-900">
                                <span>Order total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            disabled={checkoutState === 'processing' || carts.length === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
                        >
                            {checkoutState === 'processing' ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing Order...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    Proceed to Checkout
                                </>
                            )}
                        </button>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-sm">Free returns on all eligible items</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                                <Truck className="h-5 w-5 text-blue-500" />
                                <span className="text-sm">Delivery in 2-4 business days</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                                <ShieldCheck className="h-5 w-5 text-blue-500" />
                                <span className="text-sm">Secure checkout with SSL encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scale-check {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                @keyframes check {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes fade-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                .animate-scale-check {
                    animation: scale-check 0.5s ease-out forwards;
                }
                
                .animate-check {
                    animation: check 0.5s ease-out forwards;
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                
                .animate-fade-up {
                    animation: fade-up 0.5s ease-out forwards;
                }
                
                .delay-200 {
                    animation-delay: 0.2s;
                }
                
                .delay-300 {
                    animation-delay: 0.3s;
                }
                
                .delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    );
};

export default AmazonCart;