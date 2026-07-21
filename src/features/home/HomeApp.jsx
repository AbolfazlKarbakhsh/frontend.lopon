import { motion } from 'motion/react';
import { MousePointerClick, CreditCard, UserCheck, ShieldCheck, Ticket, Star, User } from 'lucide-react';
import { DEALS, BUSINESSES } from '@core/constants';
import { CarouselDealCard } from '../../components/Items/DealCard';
import { Link } from 'react-router-dom';


function SectionCarousel({ title, subtitle, deals, icon, id }) {
  if (deals.length === 0) return null;

  return (
    <section id={id} className="py-6 bg-white overflow-hidden text-right">
      <div className="px-4">
        <div className="flex justify-between items-end mb-4 px-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-black text-slate-900 font-kal-3">{title}</h2>
            <div className="w-10 h-1 bg-primary-s-light rounded-full"></div>
          </div>
        </div>

        <div className="relative -mx-4 group">
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth">
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
  // Logic: Get highest discount deal for each business (Today's Specials)
  const featuredDeals = BUSINESSES.map(business => {
    const businessDeals = DEALS.filter(d => d.businessId === business.id);
    return businessDeals.sort((a, b) => b.discountPercentage - a.discountPercentage)[0];
  }).filter(Boolean);

  // SnappPay Deals
  const snappPayDeals = DEALS.filter(deal => {
    const business = BUSINESSES.find(b => b.id === deal.businessId);
    return business?.hasSnappPay;
  });

  // Nails Category
  const nailDeals = DEALS.filter(deal => deal.category === 'nail');

  // Medical/Botox Category
  const medicalDeals = DEALS.filter(deal => deal.category === 'medical');

  return (
    <div className="flex flex-col">
      <div className="w-full h-[62px] flex justify-between items-center px-3 border-b border-slate-100">

        <Link to="/" className="text-xl font-black text-primary-s-light tracking-tighter font-kal-3" >
          کرمان تخفیف
        </Link>

        <Link to="/login" className="p-2 text-slate-600 hover:text-primary-s transition-colors">
          <User size={22} />
        </Link>
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-8 bg-gradient-to-br from-white to-primary-s-light/10 text-center">
        <div className="px-4 relative z-10 flex flex-col items-center gap-8">
          <div className="w-full relative px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://shimenshop.com/uploads/article/1401-06/29/image1.jpg"
                  alt="Beauty Service"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-black text-slate-900 leading-tight mb-4 font-kal-4">
                تخفیف بهترین <br />
                <span className="text-primary-s-light italic font-kal-4">خدمات زیبایی</span> کرمان
              </h1>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 px-10 font-medium font-kal-3">
                بهترین مجموعه‌های شهر کرمان با قیمت‌های استثنایی در انتظار شماست. کیفیت را ارزان‌تر تجربه کنید.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Deals Section */}
      <SectionCarousel
        title="پیشنهادهای ویژه امروز"
        deals={featuredDeals}
        id="deals"
      />

      {/* SnappPay Section */}
      <SectionCarousel
        title="پرداخت در ۴ قسط (اسنپ‌پی)"
        deals={snappPayDeals}
      />

      {/* Nails Section */}
      <SectionCarousel
        title="خدمات حرفه‌ای ناخن"
        subtitle="مانیکور و پدیکور"
        deals={nailDeals}
      />

      {/* Medical/Botox Section */}
      <SectionCarousel
        title="کلینیک‌های زیبایی و بوتاکس"
        subtitle="پزشک متخصص"
        deals={medicalDeals}
      />

      {/* Trust Section */}
      <section className="py-16 bg-white relative overflow-hidden text-right">
        <div className="px-4">
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">چرا کرمان تخفیف؟</h2>
            <p className="text-slate-500 text-xs font-medium">ما کیفیت و قیمت را همزمان تضمین می‌کنیم</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: <ShieldCheck size={32} />,
                title: 'مجموعه‌های برگزیده',
                desc: 'ما فقط با بهترین سالن‌ها و کلینیک‌های کرمان همکاری می‌کنیم تاخیال شما از کیفیت راحت باشد.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: <Star size={32} />,
                title: 'قیمت‌های واقعی',
                desc: 'تلاش ما این است که همیشه کمترین قیمت ممکن را برای بهترین خدمات شهر فراهم کنیم.',
                color: 'bg-amber-50 text-amber-600'
              },
              {
                icon: <Ticket size={32} />,
                title: 'پشتیبانی سریع',
                desc: 'تیم پشتیبانی ما در تمام مراحل خرید و استفاده از کوپن در کنار شماست.',
                color: 'bg-emerald-50 text-emerald-600'
              }
            ].map((point, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden"
              >
                <div className={`inline-flex p-4 rounded-2xl ${point.color} mb-6`}>
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed max-w-[80%]">{point.desc}</p>
                <div className="absolute -bottom-6 -left-6 opacity-[0.03] scale-150 rotate-12">
                  {point.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-slate-50 text-right">
        <div className="px-4">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-xl font-black text-slate-900 mb-2">چطور استفاده کنم؟</h2>
            <p className="text-slate-500 text-[10px]">سه قدم ساده تا دریافت خدمات</p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: <MousePointerClick className="text-primary-s" size={20} />,
                title: 'انتخاب مجموعه',
                desc: 'از بین مجموعه‌های منتخب کرمان، خدمت را انتخاب کنید.'
              },
              {
                icon: <CreditCard className="text-primary-s" size={20} />,
                title: 'خرید کوپن',
                desc: 'کوپن تخفیف را به صورت آنلاین تهیه کنید.'
              },
              {
                icon: <UserCheck className="text-primary-s" size={20} />,
                title: 'مراجعه و استفاده',
                desc: 'در تاریخ مشخص به مجموعه مراجعه کنید.'
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-2 bg-primary-s-light rounded-xl shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-sm font-bold mb-0.5">{step.title}</h3>
                  <p className="text-slate-600 text-[10px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeApp;
