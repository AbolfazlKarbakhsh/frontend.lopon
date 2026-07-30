import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditProfileModal({ isOpen, onClose, initialData, onSave }) {
  const [name, setName] = useState(initialData?.name || 'سارا احمدی');
  const mobile = initialData?.mobile || '۰۹۳۸۱۷۷۸۹۲۰';

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('لطفاً نام و نام خانوادگی را وارد کنید');
      return;
    }

    onSave({ name, mobile });
    toast.success('اطلاعات کاربری با موفقیت به‌روزرسانی شد');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-3xl w-full max-w-sm p-6 text-right relative shadow-2xl border border-slate-100"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center border border-slate-200/60 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header without Icon */}
          <div className="mb-5 pr-1">
            <h3 className="text-base font-kal-3 font-bold text-slate-800">ویرایش پروفایل</h3>
            <p className="text-xs font-kal-2 text-slate-400 mt-0.5">ویرایش نام و نام خانوادگی حساب کاربری</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-kal-3 font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>نام و نام خانوادگی</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: سارا احمدی"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-kal-2 text-slate-800 focus:outline-none focus:border-[#ff2d55] focus:bg-white transition-all"
              />
            </div>

            {/* Mobile Input (Read-only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-kal-3 font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>شماره همراه (غیرقابل تغییر)</span>
              </label>
              <input
                type="text"
                value={mobile}
                readOnly
                dir="ltr"
                className="w-full bg-slate-100 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-kal-2 text-slate-500 cursor-not-allowed select-none text-left font-mono"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 bg-[#ff2d55] hover:bg-[#e02547] text-white text-sm font-kal-3 font-bold rounded-2xl transition-all shadow-[0_6px_20px_rgba(255,45,85,0.22)] cursor-pointer text-center"
              >
                ذخیره تغییرات
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
