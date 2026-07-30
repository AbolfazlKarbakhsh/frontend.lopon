import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Heart, 
  Award, 
  MapPin, 
  Smile, 
  Play, 
  Pause, 
  Briefcase, 
  User, 
  Phone, 
  Store, 
  Sparkles, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

function AboutUs() {
  // Stats with premium formatting and elegant descriptive tags
  const stats = [
    { label: 'مجموعه‌های همکار', value: '۱۰۰+', labelSub: 'کسب‌وکار معتبر', icon: Award, color: 'text-[#ff2d55]', bg: 'bg-rose-50/70' },
    { label: 'کوپن‌های موفق', value: '۱۰k+', labelSub: 'سفارش ثبت‌شده', icon: Target, color: 'text-pink-500', bg: 'bg-pink-50/70' },
    { label: 'کاربران خوشحال', value: '۵,۰۰۰+', labelSub: 'کرمانی‌های عزیز', icon: Smile, color: 'text-amber-500', bg: 'bg-amber-50/70' },
  ];

  // Video player simulator state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Collaboration / Partner form states
  const [bizName, setBizName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('beauty');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bizName || !ownerName || !phone) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clear fields
      setBizName('');
      setOwnerName('');
      setPhone('');
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-md md:max-w-xl mx-auto px-5 pt-8 pb-28 flex flex-col gap-8 select-none"
      dir="rtl"
    >
      {/* Brand Section */}
      <div className="bg-gradient-to-br from-[#FFF0F2] via-white to-slate-50/40 border border-[#FFE2E6] rounded-[32px] p-8 flex flex-col items-center text-center shadow-[0_6px_30px_rgba(255,45,85,0.03)] relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ff2d55]/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/[0.01] rounded-full blur-3xl"></div>
        
        <img
          src="/images/lopon-logo.png"
          alt="لوگو لوپُن"
          className="w-[78px] h-[78px] object-contain mb-4.5 drop-shadow-md hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-xl font-bold text-slate-800 font-kal-3 mb-2.5">لوپُن؛ جستجوی کسب‌وکارهای محلی کرمان</h2>
        <p className="text-[12.5px] text-slate-500 font-kal-2 leading-[23px] max-w-sm">
          اولین و معتبرترین پلتفرم تخصصی معرفی و ارائه تخفیف خدمات محلی در استان کرمان. ما فاصله‌ی شما را با ممتازترین خدمات شهر کوتاه‌تر کرده‌ایم.
        </p>
      </div>

      {/* Improved Stats Grid - Senior Level Visual Polish */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 rounded-[24px] p-4 flex flex-col items-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.012)] hover:border-pink-100 hover:shadow-[0_8px_24px_rgba(255,45,85,0.02)] transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-lg font-black text-slate-800 font-kal-3 tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-bold text-slate-700 font-kal-3 mt-1.5">{stat.label}</span>
              <span className="text-[9px] text-slate-400 font-kal-2 mt-0.5">{stat.labelSub}</span>
            </div>
          );
        })}
      </div>

      {/* Narrative Card */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-7 flex flex-col gap-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-3.5 border-b border-slate-100/50 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center text-[#ff2d55]">
            <Heart className="w-5.5 h-5.5 fill-[#ff2d55] text-[#ff2d55]" />
          </div>
          <div className="text-right">
            <h3 className="text-[13.5px] font-bold text-slate-800 font-kal-3">داستان لوپُن و اهداف ما</h3>
            <p className="text-[10.5px] text-slate-400 font-kal-2">تعهد به کیفیت و رضایت واقعی شما</p>
          </div>
        </div>

        <div className="space-y-4 text-right">
          <p className="text-[12px] text-slate-600 font-kal-2 leading-[24px] text-justify">
            هدف اصلی ما در لوپُن، خلق یک بازی برنده-برنده است؛ از یک‌سو به همشهریان عزیز کرمانی کمک می‌کنیم تا خدمات باکیفیت و ممتاز (ورزشی، تفریحی، زیبایی و درمانی) را با قیمت‌های ویژه و باورنکردنی تجربه کنند و از سوی دیگر، رونق‌بخش کسب‌وکارهای بومی کرمان هستیم.
          </p>
          <p className="text-[12px] text-slate-600 font-kal-2 leading-[24px] text-justify">
            تمامی خدمات ارائه‌شده در پلتفرم لوپُن، از فیلترهای ارزیابی کیفیت و تعهد عبور کرده‌اند تا خریدی راحت، لذت‌بخش و کاملاً امن را تجربه کنید.
          </p>
        </div>
      </div>

      {/* Video Presentation Section - Highly Minimal & Premium Design */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-6 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex items-center justify-between border-b border-slate-100/50 pb-3">
          <span className="text-[13px] font-bold text-slate-800 font-kal-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            معرفی ویدیویی لوپُن
          </span>
          <span className="text-[10px] text-slate-400 font-kal-2">کرمان در یک نگاه</span>
        </div>

        {/* Video Player Box Mockup */}
        <div className="relative aspect-video w-full rounded-[20px] overflow-hidden bg-slate-950 border border-slate-100/50 group shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-pink-950/30 opacity-95"></div>
          
          <div className="absolute inset-0 flex items-center justify-center flex-col p-5">
            <AnimatePresence mode="wait">
              {!isVideoPlaying ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="flex flex-col items-center text-center gap-3 z-10"
                >
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-14 h-14 rounded-full bg-white text-[#ff2d55] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current translate-x-[-1.5px]" />
                  </button>
                  <p className="text-[11px] text-slate-200 font-kal-2">برای مشاهده ویدیوی کوتاه کلیک کنید</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col justify-between p-4.5 z-10"
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] bg-red-500 text-white px-2.5 py-0.5 rounded-full font-kal-3">پخش زنده معرفی</span>
                    <button 
                      onClick={() => setIsVideoPlaying(false)}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Animated equalizer waves */}
                  <div className="flex gap-1 items-end justify-center h-12">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 4, 3, 4, 5, 2, 1].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [h*3, h*7, h*3] }}
                        transition={{ duration: 1 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 bg-[#ff2d55] rounded-full"
                      />
                    ))}
                  </div>

                  {/* Seekbar */}
                  <div className="w-full flex items-center gap-2">
                    <span className="text-[9px] text-slate-300 font-kal-2">۰۰:۴۵</span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff2d55] rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-[9px] text-slate-300 font-kal-2">۰۱:۴۰</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cooperation & Business Registry ("ثبت مجموعه و همکاری") */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-7 flex flex-col gap-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-3.5 border-b border-slate-100/50 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Briefcase className="w-5.5 h-5.5" />
          </div>
          <div className="text-right">
            <h3 className="text-[13.5px] font-bold text-slate-800 font-kal-3">همکاری با لوپُن و ثبت آرایشگاه</h3>
            <p className="text-[10.5px] text-slate-400 font-kal-2">آرایشگاه خود را رونق دهید</p>
          </div>
        </div>

        <p className="text-[12px] text-slate-500 font-kal-2 leading-[23px] text-right">
          آیا صاحب یک سالن زیبایی یا آرایشگاه در کرمان هستید؟ با ثبت درخواست همکاری، کارشناسان ما جهت هماهنگی و مشاوره با شما تماس خواهند گرفت.
        </p>

        {/* Dynamic Partner Form */}
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="registry-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3.5 mt-2"
            >
              {/* Business Name */}
              <div className="relative">
                <span className="absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <Store className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="نام آرایشگاه / سالن زیبایی"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-100 rounded-xl py-3 pr-11 pl-4 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/10 focus:border-[#ff2d55] focus:bg-white transition-all font-kal-2 text-right"
                />
              </div>

              {/* Owner/Contact Name */}
              <div className="relative">
                <span className="absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="نام و نام خانوادگی مدیریت"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-100 rounded-xl py-3 pr-11 pl-4 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/10 focus:border-[#ff2d55] focus:bg-white transition-all font-kal-2 text-right"
                />
              </div>

              {/* Phone number */}
              <div className="relative">
                <span className="absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  required
                  placeholder="شماره تماس (موبایل)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-100 rounded-xl py-3 pr-11 pl-4 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/10 focus:border-[#ff2d55] focus:bg-white transition-all font-kal-2 text-right"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 bg-[#ff2d55] text-white rounded-xl text-[12.5px] font-bold font-kal-3 shadow-md shadow-[#ff2d55]/10 hover:bg-[#e02047] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : 'ثبت درخواست همکاری'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center gap-2.5 mt-2"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              <h4 className="text-[12.5px] font-bold text-emerald-800 font-kal-3">درخواست شما با موفقیت ثبت شد</h4>
              <p className="text-[11px] text-emerald-600 font-kal-2 max-w-[280px] leading-[18px]">
                کارشناسان لوپُن پس از بررسی اطلاعات اولیه، در اسرع وقت جهت تکمیل فرایند با شما تماس خواهند گرفت. از حسن اعتماد شما متشکریم.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-1 text-[10.5px] font-bold text-emerald-700 hover:underline font-kal-3 cursor-pointer"
              >
                ثبت مجدد درخواست جدید
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Office details */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-[20px] p-5 flex gap-4 items-center shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
        <MapPin className="w-5 h-5 text-[#ff2d55] shrink-0" />
        <div className="text-right">
          <h4 className="text-[11.5px] font-bold text-slate-700 font-kal-3">دفتر مرکزی لوپُن</h4>
          <p className="text-[10.5px] text-slate-500 font-kal-2 mt-0.5">کرمان، خیابان صادقیه، کارخانه نوآوری، شتاب‌دهنده لوپُن</p>
        </div>
      </div>

      {/* Footer support prompt */}
      <div className="text-center py-2">
        <p className="text-[11px] text-slate-400 font-kal-2 leading-relaxed">
          سوالی دارید؟ تیم پشتیبانی لوپُن همیشه آماده شنیدن صدای گرم شماست.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutUs;
