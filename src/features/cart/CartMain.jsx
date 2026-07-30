import React, { useState } from 'react';
import CartItemCard from './components/CartItemCard';
import CartSummary from './components/CartSummary';
import EmptyState from '@components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@utils/formatters';

const INITIAL_CART_ITEMS = [];

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
    <div className="w-full max-w-md md:max-w-xl mx-auto px-3 py-2 flex flex-col">

      {items.length === 0 ? (
        <EmptyState
          type="cart"
          badgeText="سبد خرید شما"
          title="سبد خرید شما خالی است!"
          description="هنوز هیچ خدمات تخفیف‌داری به سبد خرید اضافه نکرده‌اید. برترین پیشنهادهای زیبایی کرمان را بررسی و رزرو کنید."
          actionLabel="مشاهده پیشنهادهای تخفیف‌دار"
          onAction={() => navigate('/')}
        />
      ) : (
        /* Responsive Layout Grid: 1 column on mobile/tablet with fixed bottom summary */
        <div className="mt-4 space-y-4 pb-[280px]">
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
