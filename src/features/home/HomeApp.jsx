import React, { useState } from 'react';
import { LuUser } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CarouselDealCard, CarouselDealCardSkeleton } from '@components/Items/DealCard';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';
import { useGetCarousel } from '@hooks/server/carousel/useGetCarousel';
import {
  CreditCard,
  Award,
  Store,
  Headphones,
} from "lucide-react";
import cx from 'clsx';


/* ================= IconButton ================= */
const IconButton = ({
  to,
  onClick,
  icon: Icon,
  label,
  className
}) => {
  const baseClass = cx(
    "w-[48px] h-[48px] border border-gray-200 rounded-[8px]",
    "flex items-center justify-center text-gray-700",
    "hover:bg-gray-50 transition-colors bg-white",
    className
  );

  if (to) {
    return (
      <Link to={to} className={baseClass} aria-label={label}>
        <Icon size={20} />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} aria-label={label}>
      <Icon size={20} />
    </button>
  );
};


/* ================= Banner ================= */
const Banner = ({ src, alt, className }) => (
  <div className={cx("px-4 my-6 mb-4 z-20", className)}>
    <div className="relative -my-2 overflow-hidden rounded-xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
);


/* ================= FeatureItem ================= */
const FeatureItem = ({ title, desc, Icon, className }) => (
  <div className={cx("px-3.5 flex items-center", className)}>
    <div className="grid grid-cols-[1fr_45px] items-center w-full">
      <div className="text-center">
        <h3 className="text-[10.5px] font-bold">{title}</h3>
        <p className="mt-1 text-[9.5px] text-gray-500">{desc}</p>
      </div>

      <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-pink-50">
        <Icon className="w-5 h-5 text-pink-500" />
      </div>
    </div>
  </div>
);


/* ================= FeaturesGrid ================= */
const FeaturesGrid = ({ className }) => {
  const features = [
    {
      title: "پرداخت امن",
      desc: "با درگاه بانکی معتبر",
      Icon: CreditCard,
    },
    {
      title: "دارای نماد اعتماد",
      desc: "مطمئن و امن",
      Icon: Award,
    },
    {
      title: "مجموعه‌ معتبر",
      desc: "بررسی و تایید شده",
      Icon: Store,
    },
    {
      title: "پشتیبانی سریع",
      desc: "همیشه کنار شما",
      Icon: Headphones,
    },
  ];

  return (
    <div className={cx("flex justify-center pt-4 pb-5 z-20", className)}>
      <div className="relative w-[93%] h-[155px] rounded-2xl bg-[#FFFFFF] overflow-hidden shadow border border-gray-200">

        <div className="absolute left-5 right-5 top-1/2 h-px -translate-y-1/2 bg-[#FDF2F8]" />
        <div className="absolute left-1/2 top-5 h-[42px] w-px -translate-x-1/2 bg-[#FDF2F8]" />
        <div className="absolute left-1/2 bottom-5 h-[42px] w-px -translate-x-1/2 bg-[#FDF2F8]" />

        <div className="grid grid-cols-2 grid-rows-2 h-full">
          {features.map((item, i) => (
            <FeatureItem key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};


/* ================= SectionCarousel ================= */
function SectionCarousel({
  title,
  deals,
  id,
  className,
  isLoading
}) {
  if (isLoading) {
    return (
      <section id={id} className={cx("bg-white overflow-hidden text-right py-4 pt-2", className)}>
        <div className="px-4">
          <div className="flex flex-col mb-3">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="w-12 h-1 bg-[#ff0055]/30 rounded-full mt-1" />
          </div>
          <div className="relative -mx-4">
            <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar">
              {[1, 2, 3].map((n) => (
                <CarouselDealCardSkeleton key={n} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!deals?.length) return null;

  return (
    <section
      id={id}
      className={cx(
        "bg-white overflow-hidden text-right py-4 pt-2",
        className
      )}
    >
      <div className="px-4">
        <div className="flex flex-col mb-3">
          <h2 className="text-base font-bold text-gray-900 font-kal-3">
            {title}
          </h2>
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


/* ================= HomeApp ================= */
function HomeApp() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isHeaderImageLoaded, setIsHeaderImageLoaded] = useState(false);

  const carousel1 = useGetCarousel(1, "پیشنهادهای ویژه");
  const carousel2 = useGetCarousel(2, "محبوب‌ترین‌ها");
  const carousel3 = useGetCarousel(3, "نزدیک شما");
  const carousel4 = useGetCarousel(4, "از دست نده!");

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md md:max-w-xl mx-auto shadow-xl relative bg-white">

      <div className="absolute top-0 left-0 right-0 z-30 h-[70px] md:h-[130px] flex justify-between items-center px-5 md:px-10">

        <Link to="/" className="flex items-center py-1">
          <img src="/images/lopon-logo.png" alt="logo" className="h-[60px] w-[60px]" />
        </Link>

        <div className="flex items-center gap-2">
          <IconButton
            onClick={() => setIsSupportOpen(true)}
            icon={BiSupport}
            label="پشتیبانی"
          />
          <IconButton
            to="/profile"
            icon={LuUser}
            label="پروفایل"
          />
        </div>
      </div>

      <div className={`relative w-full mb-4 h-[calc(100dvh-180px)] -mt-14 transition-all duration-300 ${!isHeaderImageLoaded ? 'bg-slate-100/80 animate-pulse' : 'bg-gray-100'}`}>
        <img 
          src="/images/header.webp" 
          onLoad={() => setIsHeaderImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isHeaderImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
          alt="Lopon Header"
        />
        {isHeaderImageLoaded && (
          <div className="absolute -bottom-2 left-0 w-full h-12 bg-gradient-to-t from-red-500/35 via-black/5 to-transparent blur-sm transition-opacity duration-300" />
        )}
      </div>

      <SectionCarousel
        title={carousel1.title}
        deals={carousel1.deals}
        isLoading={carousel1.isLoading}
        id="1"
        className="pt-5 pb-3"
      />

      <div className="w-32 h-32 rounded-full bg-pink-500/30 blur-2xl mt-[-7.5rem] z-10"></div>

      <FeaturesGrid />

      <SectionCarousel
        title={carousel2.title}
        deals={carousel2.deals}
        isLoading={carousel2.isLoading}
        id="2"
        className="mt-[5px]"
      />

      <SectionCarousel
        title={carousel3.title}
        deals={carousel3.deals}
        isLoading={carousel3.isLoading}
        id="3"
        className="mt-[5px]"
      />

      <Banner src="/images/Advertisement.webp" alt="تخفیف ویژه" />

      <div className="w-32 h-32 rounded-full bg-pink-500/50 blur-2xl mt-[-7.5rem] ms-auto z-10"></div>

      <SectionCarousel
        title={carousel4.title}
        deals={carousel4.deals}
        isLoading={carousel4.isLoading}
        id="4"
        className="pt-6"
      />

      <Banner src="/images/present.webp" alt="دوستاتو دعوت کن و جایزه بگیر !" className={"pt-4"}/>

      {/* Support */}
      <SupportDrawer
        isOpen={isSupportOpen}
        setIsOpen={setIsSupportOpen}
      />
    </div>
  );
}

export default HomeApp;
