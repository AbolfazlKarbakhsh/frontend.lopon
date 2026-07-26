import React from 'react';
import CartHeader from './components/CartHeader';
import CartItemCard from './components/CartItemCard';
import CartSummary from './components/CartSummary';

const MOCK_CART_ITEMS = [
  {
    id: 1,
    title: 'خدمات کاشت ناخن پدیکور با بهترین مواد اولیه',
    businessName: 'مجموعه بیوتی ایران',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
    originalPrice: '۴۵۰,۰۰۰',
    discountPercent: '۴۰',
    discountedPrice: '۲۷۷,۵۰۰',
    quantity: 1,
  },
  {
    id: 2,
    title: 'خدمات کاشت ناخن پدیکور با بهترین مواد اولیه',
    businessName: 'مجموعه بیوتی ایران',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400',
    originalPrice: '۴۵۰,۰۰۰',
    discountPercent: '۴۰',
    discountedPrice: '۲۷۷,۵۰۰',
    quantity: 1,
  },
];

function CartMain() {
  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between max-w-md mx-auto relative shadow-xl">
      {/* Top Navigation Header */}
      <CartHeader title="سبد خرید" />

      {/* Cart Content Area */}
      <div className="px-4 py-4 space-y-3 flex-1 overflow-y-auto no-scrollbar">
        {MOCK_CART_ITEMS.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Fixed Checkout Summary */}
      <CartSummary
        summaryData={{
          totalOriginal: '۲۷۷,۵۰۰',
          totalDiscount: '۲۷۷,۵۰۰',
          totalPayable: '۱۲,۵۰۰,۰۰۰',
        }}
      />
    </div>
  );
}

export default CartMain;
