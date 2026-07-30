import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, onClick = () => {}, className = '', disabled = false, type = 'button' }) => {
    return (
        <button 
            className={twMerge(`w-full disabled:bg-slate-200 disabled:text-slate-400 mt-4
           bg-[#ff2d55] hover:bg-[#e02547] active:scale-[0.98] text-white font-kal-3 font-bold text-sm sm:text-base py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(255,45,85,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2`, className)}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}

export default React.memo(Button);
