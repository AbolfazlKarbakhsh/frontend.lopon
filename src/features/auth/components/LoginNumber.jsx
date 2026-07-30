import React, { useState } from 'react';
import PhoneInput from '@components/forms/PhoneInput';
import ErrorText from "@components/forms/errorText";
import Button from '@components/table/Button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import LoginHeader from '../components/LoginHeader';
import TermsModal from '@components/Items/TermsModal';

function LoginNumber({ validation, error, phoneLoading }) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <LoginHeader
        head="ورود یا ثبت‌نام"
        description="برای ادامه شماره همراه خود را وارد کنید"
      />

      {/* Input Field */}
      <PhoneInput validation={validation} />
      {error && <ErrorText value={error.message} className="text-right mt-1.5 pr-1 text-xs" />}

      {/* Action Button */}
      {phoneLoading ? (
        <Button key="loading" disabled={true} className="opacity-80 h-11 text-xs sm:text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>ارسال کد...</span>
        </Button>
      ) : (
        <Button type="submit" className="h-11 text-xs sm:text-sm">
          <span>ادامه</span>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Footer & Terms Link */}
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={() => setIsTermsOpen(true)}
          className="text-[11px] font-kal-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          ورود شما به معنای پذیرش <span className="underline text-slate-500 hover:text-[#ff2d55]">شرایط و قوانین</span> است
        </button>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}

export default LoginNumber;

