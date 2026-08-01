import React, { useState, useEffect } from 'react';
import CartItemCard from './components/CartItemCard';
import CartSummary from './components/CartSummary';
import EmptyState from '@components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@utils/formatters';
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '@utils/cartCookie';

function CartMain() {
  const [items, setItems] = useState(() => getCart());
  const navigate = useNavigate();

  // Keep state synchronized with Cookie when component mounts or gains focus
  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleIncrement = (id) => {
    const item = items.find((i) => i.id === id);
    const currentQty = item ? item.quantity || 1 : 1;
    const updated = updateQuantity(id, currentQty + 1);
    setItems(updated);
  };

  const handleDecrement = (id) => {
    const item = items.find((i) => i.id === id);
    const currentQty = item ? item.quantity || 1 : 1;
    let updated;
    if (currentQty > 1) {
      updated = updateQuantity(id, currentQty - 1);
    } else {
      updated = removeFromCart(id);
    }
    setItems(updated);
  };

  const handleCheckout = () => {
    alert('انتقال به درگاه پرداخت و تکمیل خرید...');
    clearCart();
    setItems([]);
  };

  const parseNum = (val) => {
    if (typeof val === 'number' && !isNaN(val)) return val;
    if (typeof val === 'string') {
      const cleaned = val
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        .replace(/[^0-9]/g, '');
      const num = parseInt(cleaned, 10);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  // Dynamic calculations
  const totalOriginalNum = items.reduce((acc, item) => {
    const qty = item.quantity || 1;
    const orig =
      item.originalPriceVal !== undefined
        ? item.originalPriceVal
        : parseNum(item.originalPrice);
    return acc + orig * qty;
  }, 0);

  const totalDiscountedNum = items.reduce((acc, item) => {
    const qty = item.quantity || 1;
    const disc =
      item.discountedPriceVal !== undefined
        ? item.discountedPriceVal
        : parseNum(item.discountedPrice);
    return acc + disc * qty;
  }, 0);

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
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartMain;

