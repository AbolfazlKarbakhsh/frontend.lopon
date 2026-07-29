import React, { useState } from 'react';
import CartHeader from './components/CartHeader';
import CartItemCard from './components/CartItemCard';
import CartSummary from './components/CartSummary';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    title: 'خدمات کاشت ناخن پدیکور با بهترین مواد اولیه',
    businessName: 'مجموعه بیوتی ایران',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
    originalPriceVal: 460500,
    originalPrice: '۴۶۰,۵۰۰',
    discountPercent: '۶۰',
    discountedPriceVal: 277500,
    discountedPrice: '۲۷۷,۵۰۰',
    quantity: 1,
  },
  {
    id: 2,
    title: 'خدمات کاشت ناخن پدیکور با بهترین مواد اولیه',
    businessName: 'مجموعه بیوتی ایران',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
    originalPriceVal: 460500,
    originalPrice: '۴۶۰,۵۰۰',
    discountPercent: '۶۰',
    discountedPriceVal: 277500,
    discountedPrice: '۲۷۷,۵۰۰',
    quantity: 1,
  },
];

const toPersianDigits = (num) => {
  if (num === null || num === undefined) return '۰';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

const formatPrice = (num) => {
  if (!num) return '۰';
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(formatted);
};

function CartMain() {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null; // remove if quantity reaches 0
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Dynamic calculations
  const totalOriginalNum = items.reduce(
    (acc, item) => acc + item.originalPriceVal * item.quantity,
    0
  );
  const totalDiscountedNum = items.reduce(
    (acc, item) => acc + item.discountedPriceVal * item.quantity,
    0
  );
  const totalDiscountNum = Math.max(0, totalOriginalNum - totalDiscountedNum);

  const summaryData = {
    totalOriginal: formatPrice(totalOriginalNum),
    totalDiscount: formatPrice(totalDiscountNum),
    totalPayable: formatPrice(totalDiscountedNum),
  };

  return (
    <div className="min-h-screen pb-24 max-w-md md:max-w-xl mx-auto px-3 py-2">
      {/* Header */}
      <CartHeader title="سبد خرید" />

      {items.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <ShoppingBag size={32} />
          </div>
          <p className="font-kal-3 font-bold text-slate-700 text-base">سبد خرید شما خالی است</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#ff0055] text-white px-6 py-2.5 rounded-xl font-kal-3 font-bold text-sm shadow-sm hover:bg-[#e0004c] transition-colors cursor-pointer"
          >
            مشاهده پیشنهادها
          </button>
        </div>
      ) : (
        /* Responsive Layout Grid: 1 column on mobile/tablet with fixed bottom summary */
        <div className="mt-2 space-y-4 pb-[280px]">
          {/* Cart Items List */}
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>

          {/* Cart Summary Box & Payment Button - Fixed above bottom navigation */}
          <div className="fixed bottom-[58px] left-0 right-0 z-40 bg-white p-3.5 px-4 rounded-t-2xl max-w-md md:max-w-xl mx-auto border-t border-slate-100 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
            <CartSummary
              summaryData={summaryData}
              onCheckout={() => alert('انتقال به درگاه پرداخت...')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartMain;
