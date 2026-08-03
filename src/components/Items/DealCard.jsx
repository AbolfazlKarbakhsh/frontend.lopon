
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BUSINESSES } from '@core/constants';
import { formatPrice } from '@utils/formatters';

export const CarouselDealCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-200 flex flex-col h-full min-w-[190px] w-[190px] sm:min-w-[230px] sm:w-[230px] snap-center animate-pulse">
      <div className="h-32 bg-gray-200 w-full relative" />
      <div className="p-3 pt-2 flex flex-col flex-grow text-right space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
        <div className="h-3 bg-gray-200 rounded w-2/5 mb-2" />
        <div className="flex flex-col items-start pt-2 space-y-1">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export const CarouselDealCard = ({ deal }) => {
  if (!deal) return null;

  const vendorServiceId = deal.vendorServiceId || deal.id || deal._id;
  const businessId = deal.vendorId || deal.businessId || deal.salonId || vendorServiceId;
  const rating = deal.rating ?? 4.8;
  const rawAddress = deal.location || deal.address || 'کرمان';
  const address = rawAddress.includes('،') ? rawAddress.split('،')[1] : rawAddress;
  const imageUrl = deal.image || deal.imageUrl || '/images/header.webp';
  const businessName = deal.vendorTitle || deal.businessName || deal.salonName || 'مجموعه زیبایی';
  const serviceTitle = deal.serviceTitle || deal.title || deal.name || 'خدمات زیبایی';
  const discountPercentage = deal.discountPercent ?? deal.discountPercentage ?? deal.discount ?? 0;
  const originalPrice = deal.price ?? deal.originalPrice ?? 0;
  const discountedPrice = deal.finalPrice ?? deal.discountedPrice ?? 0;

  return (
    <motion.div
      className="bg-white z-20 rounded-2xl overflow-hidden shadow-xs border border-gray-200  shadow-gray shadow  flex flex-col h-full min-w-[190px] w-[190px] sm:min-w-[230px] sm:w-[230px] snap-center select-none "
      id={`carousel-deal-card-${deal.id}`}
    >
      <Link to={`/business/${businessId}`} className="flex flex-col h-full">
        <div className="relative h-32 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={serviceTitle}
            className="w-full h-32 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#6474bb] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-gray-100 font-kal-3">
            <span>{rating}</span>
            <Star size={11} className="fill-[#ffe657] text-[#ffe657] shrink-0" />
          </div>
        </div>

        <div className="p-3 pt-2 flex flex-col flex-grow text-right">
          <p className="text-[12px] text-gray-400 font-kal-2 line-clamp-1 mb-0.5">{businessName}</p>
          <h3 className="text-[13px] font-bold text-gray-800 font-kal-3 line-clamp-1 mb-1">{serviceTitle}</h3>

          <div className="flex items-center gap-1 text-[9px] text-gray-400 font-kal-2 mb-2">
            <FiMapPin size={11} className="shrink-0 text-gray-600" />
            <span className="line-clamp-1">{address}</span>
          </div>

          <div className=" flex items-start justify-end ">

            <div className="flex  flex-col  items-start">

              {/* قیمت اصلی خط خورده */}
              <div className="flex items-center gap-2">
                {discountPercentage > 0 && (
                  <span className=" flex items-center justify-center bg-[#ef4444] w-[37px] h-[24px] text-white text-[12px] font-bold px-[5px] py-[6px] rounded-[13px] font-kal-3 leading-none">
                    {discountPercentage}٪
                  </span>
                )}

                {originalPrice > 0 && (
                  <span className="relative text-[12px] text-[#64748b] font-kal-2">
                    {formatPrice(originalPrice)}
                    <span className="absolute left-0 top-1/2 h-px w-full rotate-[-10deg] bg-[#64748b]"></span>
                  </span>
                )}
              </div>
              {/* قیمت تخفیف خورده + درصد */}

              <span className="text-[18px] font-normal text-gray-900 ">
                {formatPrice(discountedPrice || originalPrice)}
                <span className="text-[12px] font-normal text-gray-500 mr-1 relative inline-block">
                  توما
                  <span className="absolute -top-[10px] right-[9px]">ن</span>
                </span>
              </span>

            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};
