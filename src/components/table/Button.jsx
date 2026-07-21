import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, onClick = () => {}, className = '', disabled = false, type = 'button' }) => {
    return (
        <button 
            className={twMerge(`btn w-full disabled:bg-gray-300 disabled:text-gray-400 mt-3
           bg-firoze text-white font-kal-2 text-base border-0 hover:bg-27`, className)}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}

export default React.memo(Button);