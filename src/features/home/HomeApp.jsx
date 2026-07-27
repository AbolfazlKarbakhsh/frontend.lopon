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
    <div 
className="
flex flex-col 
min-h-screen 
w-full
max-w-md
md:max-w-3xl
lg:max-w-5xl
mx-auto
shadow-xl
relative
bg-white
"
>
      {/* Top Header */}
<div
className="
absolute 
top-0 
left-0 
right-0 
z-30
h-[100px]
md:h-[130px]
flex
justify-between
items-center
px-5
md:px-10
"
>        {/* Left Side Buttons */}
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
      <div className="relative w-full  bg-gray-100">
        <img
          src="/images/header.png"
          alt="سالن زیبایی لوپون"
          className="w-full h-50 sm:h-50 object-cover"
        />

        {/* Floating Chat Location Button */}
        <button
          onClick={() => setIsSupportOpen(true)}
          className="absolute -bottom-4 z-31 left-4 w-[50px] h-[50px]  rounded-full flex items-center justify-center shadow-lg  transition-transform active:scale-95 cursor-pointer"
          aria-label="گفتگو با پشتیبانی"
        >
          
           <img
                  src="/images/suport.png"
                  alt="پشتیبانی"
                  className="w-full h-full object-cover rounded-full"
                />    
        </button>
      </div>

      {/* Section 1: Special Offers */}
      <SectionCarousel
        title="پیشنهادهای ویژه"
        deals={featuredDeals}
        id="deals-1"
      />

      {/* Section 2: 4 Trust / Feature Badges Grid */}
      <div className="px-3 sm:px-4 my-3 sm:my-4">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xs border border-slate-100/80">
          {/* خط عمودی بالا */}
          <div className="absolute left-1/2 top-3 h-[calc(50%-8px)] w-px -translate-x-1/2 bg-pink-100/80" />

          {/* خط عمودی پایین */}
          <div className="absolute left-1/2 bottom-3 h-[calc(50%-8px)] w-px -translate-x-1/2 bg-pink-100/80" />

          {/* خط افقی سمت چپ */}
          <div className="absolute left-3 top-1/2 w-[calc(50%-8px)] h-px -translate-y-1/2 bg-pink-100/80" />

          {/* خط افقی سمت راست */}
          <div className="absolute right-3 top-1/2 w-[calc(50%-8px)] h-px -translate-y-1/2 bg-pink-100/80" />

          <div className="grid grid-cols-2">
            {/* پرداخت امن */}
            <div className="flex items-center justify-between w-full p-2.5 sm:p-3.5 px-3 sm:px-4">
              <div className="text-right flex-1 min-w-0">
                <h3 className="font-kal-3 text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  پرداخت امن
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 leading-tight truncate">
                  درگاه بانکی معتبر
                </p>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 mr-2">
                <LuLock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>

            {/* دارای نماد اعتماد */}
            <div className="flex items-center justify-between w-full p-2.5 sm:p-3.5 px-3 sm:px-4">
              <div className="text-right flex-1 min-w-0">
                <h3 className="font-kal-3 text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  نماد اعتماد
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 leading-tight truncate">
                  خریدی مطمئن
                </p>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 mr-2">
                <LuShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>

            {/* پشتیبانی سریع */}
            <div className="flex items-center justify-between w-full p-2.5 sm:p-3.5 px-3 sm:px-4">
              <div className="text-right flex-1 min-w-0">
                <h3 className="font-kal-3 text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  پشتیبانی سریع
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 leading-tight truncate">
                  همیشه کنار شما
                </p>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 mr-2">
                <BiSupport className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>

            {/* مجموعه‌های معتبر */}
            <div className="flex items-center justify-between w-full p-2.5 sm:p-3.5 px-3 sm:px-4">
              <div className="text-right flex-1 min-w-0">
                <h3 className="font-kal-3 text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  مجموعه‌ معتبر
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 leading-tight truncate">
                  بررسی و تأیید شده
                </p>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 mr-2">
                <LuAward className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Special Offers */}
      <SectionCarousel
        title="محبوب ترین "
        deals={nailDeals.length > 0 ? nailDeals : featuredDeals}
        id="deals-2"
      />

      {/* Section 4: Special Offers */}
      <SectionCarousel
        title="نزدیک شما "
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
        title="جست و جو های اخیر "
        deals={medicalDeals.length > 0 ? medicalDeals : featuredDeals}
        id="deals-4"
      />

      {/* Section 7: Promo Discount Code Banner */}
      <div className="px-4 my-3">
         
        

          {/* Model Image Accent */}
          <div className="relative   shrink-0 -my-2 overflow-hidden rounded-xl">
            <img
              src="images/present.png"
              alt="پر فروش ترین ها " 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        
      </div>

      {/* Support Drawer */}
      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </div>
  );
}

export default HomeApp;

