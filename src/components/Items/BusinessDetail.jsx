
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Instagram, Info, ChevronRight, X, Sparkles } from 'lucide-react';
import { BUSINESSES, DEALS } from '../../core/constants';

export function BusinessDetail() {
  const { id } = useParams();
  const business = BUSINESSES.find(b => b.id === id);
  const deal = DEALS.find(d => d.businessId === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!business || !deal) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold">مجموعه مورد نظر یافت نشد.</h2>
        <Link to="/" className="text-primary-s mt-4 inline-block">بازگشت به صفحه اصلی</Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <div className="pt-8 min-h-screen bg-slate-50">
      {/* Header Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={business.coverUrl}
          alt={business.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center gap-1 text-sm mb-4 hover:underline">
              <ChevronRight size={16} />
              بازگشت به همه تخفیف‌ها
            </Link>
            <h1 className="text-3xl md:text-5xl font-black">{business.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Main Info Card */}
          <section className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="text-primary-s" size={20} />
              درباره مجموعه
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{business.description}</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin className="text-primary-s shrink-0" size={18} />
                <div className="text-xs">
                  <p className="font-bold mb-0.5">آدرس:</p>
                  <p className="text-slate-600">{business.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Instagram className="text-primary-s shrink-0" size={18} />
                <div className="text-xs">
                  <p className="font-bold mb-0.5">اینستاگرام:</p>
                  <a href="#" className="text-slate-600 hover:text-primary-s transition-colors">{business.instagram}</a>
                </div>
              </div>
            </div>
          </section>

          {/* Service Details Card */}
          <section className="bg-white p-6 rounded-[2rem] shadow-xl border border-primary-s/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">{deal.serviceTitle}</h3>
              <span className="inline-block px-2.5 py-1 bg-primary-s text-white text-[10px] font-bold rounded-full">
                {deal.discountPercentage}٪ تخفیف
              </span>
            </div>
            
            <div className="flex flex-col mb-6">
              <span className="text-xs text-slate-400 line-through mb-0.5">{formatPrice(deal.originalPrice)} تومان</span>
              <span className="text-2xl font-black text-slate-900">{formatPrice(deal.discountedPrice)} <span className="text-xs font-normal">تومان</span></span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary-s hover:bg-primary-s-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary-s/20 transition-all flex items-center justify-center gap-2"
              id="buy-coupon-btn"
            >
              خرید کوپن
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 italic">ارائه شده توسط {business.name}</p>
          </section>

          {/* Rules Card */}
          <section className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100 mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-primary-s" size={20} />
              قوانین
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-xs leading-relaxed">
              <li>انقضا تا {deal.expiryDate}</li>
              <li>حتما از قبل تماس بگیرید.</li>
              <li>هر کوپن مخصوص یک نفر است.</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl text-center"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                id="close-modal-btn"
              >
                <X />
              </button>
              
              <div className="w-20 h-20 bg-primary-s-light text-primary-s rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles size={40} />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4">به زودی!</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                این سرویس به زودی فعال می‌شود. کرمان تخفیف در حال تکمیل همکاری با مجموعه‌های برتر شهر است.
              </p>
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-4 rounded-2xl font-bold transition-all"
              >
                متوجه شدم
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}