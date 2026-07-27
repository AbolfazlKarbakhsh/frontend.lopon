
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BUSINESSES } from '../../core/constants';



export const CarouselDealCard = ({ deal }) => {
  const business = BUSINESSES.find(b => b.id === deal.businessId);
  const rating = business?.rating || 4.5;
  const address = business?.address ? business.address.split('،')[1] || business.address : 'خیابان جهاد';

  const formatPrice = (price) => {
    return price ? price.toLocaleString('fa-IR') : '۰';
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 flex flex-col h-full min-w-[210px] w-[210px] sm:min-w-[230px] sm:w-[230px] snap-center select-none"
      id={`carousel-deal-card-${deal.id}`}
    >
      <Link to={`/business/${deal.businessId}?dealId=${deal.id}`} className="flex flex-col h-full">
        <div className="relative h-36 overflow-hidden bg-gray-100">
          <img
            src={deal.imageUrl}
            alt={deal.serviceTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#6474bb] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-gray-100 font-kal-3">
            <span>{rating}</span>
            <Star size={11} className="fill-[#ffe657] text-[#ffe657] shrink-0" />
          </div>
        </div>

        <div className="p-3 flex flex-col flex-grow text-right">
          <p className="text-[10px] text-gray-400 font-kal-2 line-clamp-1 mb-0.5">{deal.businessName || 'مجموعه زیبا بیوتی کرمان کریمان'}</p>
          <h3 className="text-xs font-bold text-gray-800 font-kal-3 line-clamp-1 mb-1">{deal.serviceTitle}</h3>

          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-kal-2 mb-2">
            <FiMapPin size={11} className="shrink-0 text-gray-400" />
            <span className="line-clamp-1">{address}</span>
          </div>

    <div className="mt-auto flex items-start justify-end pt-1">

  <div className="flex  flex-col  items-start">

    {/* قیمت اصلی خط خورده */}
     <div className="flex items-center gap-2">
      <span className="bg-[#ef4444] text-white text-[10px] font-bold px-[5px] py-[6px] rounded-[13px] font-kal-3 leading-none">
        {deal.discountPercentage}٪
      </span>

    <span className="relative text-[10px] text-[#64748b] font-kal-2">
      {formatPrice(deal.originalPrice)}
      <span className="absolute left-0 top-1/2 h-px w-full rotate-[-10deg] bg-[#64748b]"></span>
    </span>


    </div>
    {/* قیمت تخفیف خورده + درصد */}
   

      <span className="text-xs sm:text-sm font-bold text-gray-900 font-kal-3">
        {formatPrice(deal.discountedPrice)}
        <span className="text-[9px] font-normal text-gray-500">
          تومان
        </span>
      </span>



  </div>

</div>
        </div>
      </Link>
    </motion.div>
  );
};
