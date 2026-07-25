import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LuUser, LuLock, LuShieldCheck, LuAward } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';
import { BsChatDotsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { DEALS, BUSINESSES } from '@core/constants';
import { CarouselDealCard } from '../../components/Items/DealCard';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';

function SectionCarousel({ title, deals, id }) {
  if (!deals || deals.length === 0) return null;

  return (
    <section id={id} className="py-4 bg-white overflow-hidden text-right">
      <div className="px-4">
        <div className="flex flex-col mb-3">
          <h2 className="text-base font-bold text-gray-900 font-kal-3">{title}</h2>
          <div className="w-12 h-1 bg-[#ff0055] rounded-full mt-1" />
        </div>

        <div className="relative -mx-4">
          <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {deals.map((deal) => (
              <CarouselDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeApp() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Sample deal groups to populate multiple offer sections
  const featuredDeals = BUSINESSES.map(business => {
    const businessDeals = DEALS.filter(d => d.businessId === business.id);
    return businessDeals.sort((a, b) => b.discountPercentage - a.discountPercentage)[0];
  }).filter(Boolean);

  const nailDeals = DEALS.filter(deal => deal.category === 'nail');
  const skinDeals = DEALS.filter(deal => deal.category === 'skin' || deal.category === 'hair');
  const medicalDeals = DEALS.filter(deal => deal.category === 'medical');

  return (
    <div className="flex flex-col  min-h-screen max-w-md mx-auto shadow-xl relative ">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[110px] flex justify-between items-center px-6">
        {/* Left Side Buttons */}
          <Link to="/" className="flex items-center cursor-pointer py-1">
          <img
            src="/images/lopon-logo.png"
            alt="lopon logo"
            className="h-[70px] w-[70px]  object-contain"
          />
        </Link>

        {/* Right Side Brand Logo */}
     
         <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="w-[48px] h-[48px] border border-gray-200 rounded-[8px] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            aria-label="پروفایل"
          >
            <LuUser size={20} />
          </Link>

          <button
            onClick={() => setIsSupportOpen(true)}
            className="w-[48px] h-[48px] border border-gray-200 rounded-[8px] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            aria-label="پشتیبانی"
          >
            <BiSupport size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        <img
          src="/images/header.png"
          alt="سالن زیبایی لوپون"
          className="w-full h-50 sm:h-50 object-cover"
        />

        {/* Floating Chat Location Button */}
        <button
          onClick={() => setIsSupportOpen(true)}
          className="absolute bottom-4 left-4 w-11 h-11 bg-amber-400 hover:bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform active:scale-95 cursor-pointer"
          aria-label="گفتگو با پشتیبانی"
        >
          <BsChatDotsFill size={19} className="text-white" />
        </button>
      </div>

      {/* Section 1: Special Offers */}
      <SectionCarousel
        title="پیشنهادهای ویژه"
        deals={featuredDeals}
        id="deals-1"
      />

      {/* Section 2: 4 Trust / Feature Badges Grid */}
      <div className="px-4 my-2">
        <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 grid grid-cols-2 gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-100/80 text-[#ff0055] flex items-center justify-center shrink-0">
              <LuLock size={15} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-kal-3 font-bold text-xs text-gray-800 leading-tight">پرداخت امن</span>
              <span className="font-kal-2 text-[10px] text-gray-400 truncate mt-0.5">با درگاه‌های معتبر</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-100/80 text-[#ff0055] flex items-center justify-center shrink-0">
              <LuShieldCheck size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-kal-3 font-bold text-xs text-gray-800 leading-tight">دارای نماد اعتماد</span>
              <span className="font-kal-2 text-[10px] text-gray-400 truncate mt-0.5">خریدی مطمئن و امن</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-100/80 text-[#ff0055] flex items-center justify-center shrink-0">
              <LuAward size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-kal-3 font-bold text-xs text-gray-800 leading-tight">مجموعه‌های معتبر</span>
              <span className="font-kal-2 text-[10px] text-gray-400 truncate mt-0.5">بررسی و تأیید شده</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-100/80 text-[#ff0055] flex items-center justify-center shrink-0">
              <BiSupport size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-kal-3 font-bold text-xs text-gray-800 leading-tight">پشتیبانی سریع</span>
              <span className="font-kal-2 text-[10px] text-gray-400 truncate mt-0.5">همیشه کنار شما</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Special Offers */}
      <SectionCarousel
        title="پیشنهادهای ویژه"
        deals={nailDeals.length > 0 ? nailDeals : featuredDeals}
        id="deals-2"
      />

      {/* Section 4: Special Offers */}
      <SectionCarousel
        title="پیشنهادهای ویژه"
        deals={skinDeals.length > 0 ? skinDeals : featuredDeals}
        id="deals-3"
      />

      {/* Section 5: Promo Discount Code Banner */}
      <div className="px-4 my-3">
         
        

          {/* Model Image Accent */}
          <div className="relative   shrink-0 -my-2 overflow-hidden rounded-xl">
            <img
              src="images/Advertisement.png"
              alt="تخفیف لوپون"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        
      </div>

      {/* Section 6: Special Offers */}
      <SectionCarousel
        title="پیشنهادهای ویژه"
        deals={medicalDeals.length > 0 ? medicalDeals : featuredDeals}
        id="deals-4"
      />

      {/* Support Drawer */}
      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </div>
  );
}

export default HomeApp;

