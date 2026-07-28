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
    <div className="min-h-screen bg-white py-3 sm:py-6 px-3 sm:px-6 lg:py-8 lg:px-8">
      <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto  rounded-3xl  shadow-xs ">
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
          /* Responsive Layout Grid: 1 column on mobile/tablet with fixed bottom summary, 2 columns on Laptop */
          <div className="mt-2 lg:mt-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start pb-52 lg:pb-0">
            {/* Cart Items List */}
            <div className="lg:col-span-7 divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              ))}
            </div>

            {/* Cart Summary Box & Payment Button - Fixed above bottom navigation on mobile, sticky side column on laptop */}
            <div className="max-lg:fixed max-lg:bottom-[56px] max-lg:left-0 max-lg:right-0 max-lg:z-40 max-lg:bg-white max-lg:p-3.5 max-lg:px-4 m  max-lg:rounded-t-2xl max-lg:max-w-md max-lg:mx-auto lg:col-span-5 lg:sticky lg:top-8">
              <CartSummary
                summaryData={summaryData}
                onCheckout={() => alert('انتقال به درگاه پرداخت...')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartMain;
