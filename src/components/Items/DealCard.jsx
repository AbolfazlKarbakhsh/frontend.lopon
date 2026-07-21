
import { motion } from 'motion/react';
import {  Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESSES } from '../../core/constants';

export const DealCard = ({ deal }) => {
  const business = BUSINESSES.find(b => b.id === deal.businessId);
  const rating = business?.rating || 0;

  const formatPrice = (price) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-soft border border-slate-50 flex flex-col h-full"
      id={`deal-card-${deal.id}`}
    >
      <Link to={`/business/${deal.businessId}`} className="flex flex-col h-full">
        <div className="relative h-56 overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.serviceTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-6 flex flex-col flex-grow text-right">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-slate-400 font-medium">{deal.businessName}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star size={12} className="fill-amber-500" />
              <span>{rating.toLocaleString('fa-IR')}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-6">{deal.serviceTitle}</h3>

          <div className="mt-auto flex items-end justify-between text-right">
            <span className="bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
              {deal.discountPercentage}٪ تخفیف
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-400 line-through mb-0.5">{formatPrice(deal.originalPrice)} تومان</span>
              <span className="text-xl font-black text-slate-900">{formatPrice(deal.discountedPrice)} <span className="text-xs font-normal">تومان</span></span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const CarouselDealCard = ({ deal }) => {
  const business = BUSINESSES.find(b => b.id === deal.businessId);
  const rating = business?.rating || 0;

  const formatPrice = (price) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-soft border border-slate-50 flex flex-col h-full min-w-[240px] w-[240px] snap-center select-none "
      id={`carousel-deal-card-${deal.id}`}
    >
      <Link to={`/business/${deal.businessId}`} className="flex flex-col h-full">
        <div className="relative h-40 overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.serviceTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow text-right">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[10px] text-slate-400 font-medium">{deal.businessName}</p>
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star size={10} className="fill-amber-500" />
              <span>{rating.toLocaleString('fa-IR')}</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-4 line-clamp-1">{deal.serviceTitle}</h3>

          <div className="mt-auto flex flex-col">
            <span className="text-[10px] text-slate-400 line-through mb-0.5">{formatPrice(deal.originalPrice)} تومان</span>
            <div className="flex items-center justify-between text-right">
              <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                {deal.discountPercentage}٪ تخفیف
              </span>
              <span className="text-base font-black text-slate-900">{formatPrice(deal.discountedPrice)} <span className="text-[10px] font-normal">تومان</span></span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};