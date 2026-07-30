import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

// Custom exact SVG icons matching the design screenshot
const IconHome = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3.6 10.7L10.2 4.3a2.5 2.5 0 0 1 3.6 0l6.6 6.4c.6.6 1 1.4 1 2.2v5.6a2.5 2.5 0 0 1-2.5 2.5H5.1A2.5 2.5 0 0 1 2.6 18.5v-5.6c0-.8.4-1.6 1-2.2z" />
  </svg>
);

const IconCart = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8.5h12a2 2 0 0 1 2 2v8.5a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 19V10.5a2 2 0 0 1 2-2z" />
    <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
  </svg>
);

const IconOrders = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="4" width="14" height="16" rx="2.5" />
    <path d="M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="13.5" x2="14" y2="13.5" />
  </svg>
);

const IconProfile = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M5.5 19.5c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5" />
  </svg>
);

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'خانه',
    path: '/',
    icon: IconHome,
  },
  {
    id: 'cart',
    label: 'خرید',
    path: '/cart',
    icon: IconCart,
  },
  {
    id: 'orders',
    label: 'سفارشات',
    path: '/orders',
    icon: IconOrders,
  },
  {
    id: 'profile',
    label: 'پروفایل',
    path: '/profile',
    icon: IconProfile,
  },
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav
      aria-label="منوی اصلی"
      className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md md:max-w-xl mx-auto bg-white rounded-none shadow-[0_-6px_25px_rgba(0,0,0,0.06)] border-t border-slate-100 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] transition-all duration-300 select-none"
    >
      <div className="grid grid-cols-4 items-center justify-items-center">
        {NAV_ITEMS.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center w-full group"
            >
              {/* Top pink pill indicator */}
              {active && (
                <motion.div
                  layoutId="bottom-nav-top-pill"
                  className="absolute -top-2 w-6 h-[3.5px] bg-[#ff2d55] rounded-full shadow-[0_1px_4px_rgba(255,45,85,0.4)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Active capsule / item styling */}
              <motion.div
                whileTap={{ scale: 0.94 }}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-[18px] transition-colors duration-200 ${
                  active
                    ? 'bg-[#fef0f3] text-[#ff2d55]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] transition-transform duration-200 ${
                    active ? 'scale-105' : ''
                  }`}
                />
                <span
                  className={`text-[11.5px] leading-tight mt-0.5 font-kal-3 transition-colors duration-200 ${
                    active ? 'font-bold text-[#ff2d55]' : 'font-medium text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


