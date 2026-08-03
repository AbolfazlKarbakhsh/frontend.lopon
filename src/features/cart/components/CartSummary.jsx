import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { discountService } from '@services/discount.service';
import { STORAGE_KEYS } from '@core/constants/storage-keys';
import { getCart } from '@utils/cartCookie';
import { formatPrice } from '@utils/formatters';

function CartSummary({ summaryData, onCheckout, items, isSubmittingPayment }) {
  const {
    totalOriginal = '۲۷۷.۵۰۰',
    totalDiscount = '۲۷۷.۵۰۰',
    totalPayable = '۱۲,۵۰۰,۰۰۰',
  } = summaryData || {};

  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedCode = discountCode.trim();
    if (!trimmedCode) {
      setFeedback({
        type: 'error',
        message: 'لطفاً کد تخفیف را وارد کنید.',
      });
      return;
    }

    // Require Auth Token
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) {
      setFeedback({
        type: 'error',
        message: 'برای استفاده از کد تخفیف باید ابتدا وارد حساب کاربری خود شوید.',
      });
      return;
    }

    // Extract current cart items
    const currentItems = items && items.length > 0 ? items : getCart();
    if (!currentItems || currentItems.length === 0) {
      setFeedback({
        type: 'error',
        message: 'سبد خرید شما خالی است.',
      });
      return;
    }

    const payloadItems = currentItems.map((item) => ({
      id: item.id || item.serviceId || item._id,
      serviceId: item.serviceId || item.id || item._id,
      quantity: Number(item.quantity) || 1,
    }));

    setIsLoading(true);

    try {
      const response = await discountService.validateDiscountCode({
        code: trimmedCode,
        items: payloadItems,
      });

      const resData = response?.data;
      if (resData?.status === 'success' || response?.status === 200 || response?.status === 201) {
        const discountInfo = resData?.data || resData;
        const successMsg = resData?.message || 'کد تخفیف با موفقیت اعمال شد';
        setFeedback({
          type: 'success',
          message: successMsg,
          data: discountInfo,
        });
        setAppliedDiscount(discountInfo);
      } else {
        setFeedback({
          type: 'error',
          message: resData?.message || 'اعتبارسنجی کد تخفیف ناموفق بود.',
        });
        setAppliedDiscount(null);
      }
    } catch (err) {
      console.error('Validate discount error:', err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'کد تخفیف وارد شده معتبر نیست یا منقضی شده است.';
      setFeedback({
        type: 'error',
        message: errorMsg,
      });
      setAppliedDiscount(null);
    } finally {
      setIsLoading(false);
    }
  };

  const displayPayable =
    appliedDiscount?.newPayablePrice !== undefined
      ? formatPrice(appliedDiscount.newPayablePrice)
      : totalPayable;

  return (
    <div className="w-full space-y-3 font-kal-2">
      {/* Discount Code Row */}
      <div className="pt-1 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-normal text-slate-700">کد تخفیف دارید؟</span>

          {/* Toggle Switch */}
          <button
            type="button"
            dir="ltr"
            onClick={() => {
              setShowDiscount(!showDiscount);
              if (showDiscount) setFeedback(null);
            }}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
              showDiscount ? 'bg-[#334155]' : 'bg-slate-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out transform ${
                showDiscount ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Discount Code Input Box (Visible when toggle is ON) */}
        {showDiscount && (
          <div className="mt-3 space-y-2">
            {/* Feedback Message Above Input */}
            {feedback && (
              <div
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                <span>{feedback.message}</span>
                {feedback.type === 'success' && feedback.data?.discountPercent && (
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {feedback.data.discountPercent}% تخفیف
                  </span>
                )}
              </div>
            )}

            <form onSubmit={handleApplyDiscount} className="flex items-center gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder="کد تخفیف خود را وارد کنید"
                className="flex-1 bg-white border border-slate-400 rounded-[8px] px-3.5 py-2.5 text-[13px] font-normal text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-slate-600 transition-colors text-right"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#f0f3f7] hover:bg-slate-200 text-slate-500 font-kal-3 font-normal px-5 py-2.5 rounded-[8px] text-[13px] transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex items-center justify-center min-w-[65px]"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'اعمال'
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Row 1: Total Orders */}
      <div className="flex items-center justify-between py-1">
        <span className="text-slate-600 font-normal text-[13px]">جمع کل سفارشات:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-slate-800 text-[13px]">{totalOriginal}</span>
          <span className="text-[13px] text-slate-400 font-normal">تومان</span>
        </div>
      </div>

      {/* Row 2: Savings Pill (Green Box with 8px border radius) */}
      <div className="bg-[#e8f8ee] rounded-[8px] px-3.5 py-2.5 flex items-center justify-between text-[#1e8e4a] my-1.5">
        <span className="font-normal text-[13px]">سود شما از خرید:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-[#1e8e4a] text-[13px]">
            {appliedDiscount?.appliedDiscountAmount !== undefined
              ? formatPrice(appliedDiscount.appliedDiscountAmount)
              : totalDiscount}
          </span>
          <span className="text-[13px] text-[#1e8e4a]/70 font-normal">تومان</span>
        </div>
      </div>

      {/* Dashed Line Divider with wide dashes */}
      <div
        className="my-3 h-[1px] w-full"
        style={{
          backgroundImage: 'linear-gradient(to right, #cbd5e1 50%, rgba(255,255,255,0) 0%)',
          backgroundSize: '16px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Row 3: Payable Amount */}
      <div className="flex items-center justify-between py-1">
        <span className="font-normal text-slate-700 text-[13px]">مبلغ قابل پرداخت:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-slate-900 text-[13px]">{displayPayable}</span>
          <span className="text-[13px] text-slate-400 font-normal">تومان</span>
        </div>
      </div>

      {/* Row 4: Payment Button */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: isSubmittingPayment ? 1 : 1.02 }}
          whileTap={{ scale: isSubmittingPayment ? 1 : 0.97 }}
          type="button"
          disabled={isSubmittingPayment}
          onClick={() => onCheckout && onCheckout(discountCode)}
          className="w-full bg-[#ff2d55] hover:bg-[#e02547] text-white font-kal-3 font-bold text-base py-3.5 rounded-xl shadow-[0_6px_20px_rgba(255,45,85,0.25)] text-center transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmittingPayment ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>درحال انتقال به درگاه...</span>
            </>
          ) : (
            'پرداخت'
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default CartSummary;

