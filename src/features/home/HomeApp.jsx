import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LuUser, LuLock, LuShieldCheck, LuAward } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';
import { BsChatDotsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { DEALS, BUSINESSES } from '@core/constants';
import { CarouselDealCard } from '../../components/Items/DealCard';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';
import {
  ShieldCheck,Headphones,BadgeCheck, Circle,
  ShieldAlert,
  ShieldBan,
  ShieldIcon,
  ShieldPlus,} from "lucide-react";

function SectionCarousel({ title, deals, id, className = "py-4" }) {
  if (!deals || deals.length === 0) return null;

  return (
    <section id={id} className={`bg-white overflow-hidden text-right ${className}`}>
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


          <button
            onClick={() => setIsSupportOpen(true)}
            className="w-[48px] h-[48px] border border-gray-200 rounded-[8px] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            aria-label="پشتیبانی"
          >
            <BiSupport size={20} />
          </button>

                    <Link
            to="/profile"
            className="w-[48px] h-[48px] border border-gray-200 rounded-[8px] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            aria-label="پروفایل"
          >
            <LuUser size={20} />
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full  bg-gray-100 mb-4">
        <img
          src="/images/header.webp"
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
        className="pt-8 pb-3"
      />

      {/* Section 2: 4 Trust / Feature Badges Grid */}

      <div className="flex justify-center pt-1 pb-6">
  <div className="relative w-[90%] h-[174px] rounded-[32px] bg-white overflow-hidden shadow-gray shadow-md">

    {/* خط افقی */}
    <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-[#FDF2F8]" />

    {/* خط عمودی بالا */}
    <div className="absolute left-1/2 top-6 h-[50px] w-px -translate-x-1/2 bg-[#FDF2F8]" />

    {/* خط عمودی پایین */}
    <div className="absolute left-1/2 bottom-6 h-[50px] w-px -translate-x-1/2 bg-[#FDF2F8]" />

    {/* چهار قسمت */}
    <div className="grid grid-cols-2 grid-rows-2 h-full">

      {/* بالا راست */}
      <div className="px-4 flex items-center">
        <div className="grid grid-cols-[1fr_50px] items-center  w-full">

          <div className="text-center">
            <h3 className="text-[12px] font-bold">
              پرداخت امن
            </h3>

            <p className="mt-1 text-[11px] text-gray-500">
              با درگاه بانکی معتبر
            </p>
          </div>

          <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center rounded-full bg-pink-50">
            <ShieldCheck className="w-6 h-6 text-pink-500" />
          </div>

        </div>
      </div>

      {/* بالا چپ */}
      <div className="px-4 flex items-center">
        <div className="grid grid-cols-[1fr_50px] items-center gap-3 w-full">

          <div className="text-center">
            <h3 className="text-[12px] font-bold">
              دارای نماد اعتماد
            </h3>

            <p className="mt-1 text-[11px] text-gray-500">
               مطمئن و امن
            </p>
          </div>

          <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center rounded-full bg-pink-50">
            <ShieldPlus className="w-6 h-6 text-pink-500" />
          </div>

        </div>
      </div>

      {/* پایین راست */}
      <div className="px-4 flex items-center">
        <div className="grid grid-cols-[1fr_50px] items-center gap-3 w-full">

          <div className="text-center">
            <h3 className="text-[12px] font-bold">
              مجموعه‌ معتبر
            </h3>

            <p className="mt-1 text-[11px] text-gray-500">
              بررسی و تایید شده
            </p>
          </div>

          <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center rounded-full bg-pink-50">
            <BadgeCheck className="w-6 h-6 text-pink-500" />
          </div>

        </div>
      </div>

      {/* پایین چپ */}
      <div className="px-4 flex items-center">
        <div className="grid grid-cols-[1fr_50px] items-center gap-3 w-full">

          <div className="text-center">
            <h3 className="text-[12px] font-bold">
              پشتیبانی سریع
            </h3>

            <p className="mt-1 text-[11px] text-gray-500">
              همیشه کنار شما
            </p>
          </div>

          <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center rounded-full bg-pink-50">
            <Headphones className="w-6 h-6 text-pink-500" />
          </div>

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
              src="/images/Advertisement.png"
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
              src="/images/off.png"
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

