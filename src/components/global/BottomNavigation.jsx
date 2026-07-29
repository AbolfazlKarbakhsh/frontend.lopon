import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ShoppingBag, ClipboardList, User } from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'خانه',
    path: '/',
    icon: Home,
  },
  {
    id: 'cart',
    label: 'سبد خرید',
    path: '/cart',
    icon: ShoppingBag,
  },
  {
    id: 'orders',
    label: 'سفارشات',
    path: '/orders',
    icon: ClipboardList,
  },
  {
    id: 'profile',
    label: 'پروفایل',
    path: '/profile',
    icon: User,
  },
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav
      aria-label="منوی اصلی"
      className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md md:max-w-xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-100 rounded-t-2xl shadow-[0_-8px_25px_rgba(0,0,0,0.06)] px-2 pt-1.5 pb-[calc(0.3rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-4 items-center">
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
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-300 group select-none ${
                active ? 'text-[#ff1461]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active top line indicator */}
              {active && (
                <motion.div
                  layoutId="bottom-nav-active-pill"
                  className="absolute -top-1.5 w-7 h-[3px] bg-[#ff1461] rounded-full shadow-[0_2px_6px_rgba(255,20,97,0.35)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon Container with subtle active glow */}
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`p-1 rounded-lg transition-colors duration-200 ${
                  active ? 'bg-rose-50/80 text-[#ff1461]' : 'group-hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-transform duration-300 ${active ? 'scale-105' : ''}`} />
              </motion.div>

              {/* Label */}
              <span
                className={`text-[10px] leading-none mt-0.5 transition-colors duration-200 font-kal-3 ${
                  active ? 'font-bold text-[#ff1461]' : 'font-medium text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
