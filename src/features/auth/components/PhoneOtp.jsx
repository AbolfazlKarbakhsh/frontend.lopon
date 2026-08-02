import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { RotateCw, Timer } from 'lucide-react';
import Button from '@components/table/Button';
import useTimer from '@hooks/animations/useTimerOtp';
import LoginHeader from '../components/LoginHeader';

const PhoneOtp = ({ control, setValue, submitForm, phone }) => {
  const { isTimeUp, resetTimer, minutes, seconds } = useTimer(1);

  // WebOTP API Auto Fill Implementation
  useEffect(() => {
    if (!('OTPCredential' in window)) return;

    const ac = new AbortController();

    const receiveOtp = async () => {
      try {
        const otpCredential = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        });

        if (otpCredential && otpCredential.code) {
          const cleanCode = otpCredential.code.replace(/[^0-9]/g, '').slice(0, 5);
          if (setValue) {
            setValue('otp', cleanCode);
          }
        }
      } catch (err) {
        // Handle aborts gracefully (e.g. unmount, user manual entry, or unsupported environment)
      }
    };

    receiveOtp();

    return () => {
      ac.abort();
    };
  }, [setValue]);

  const getNewOtp = () => {
    resetTimer();
    submitForm();
  };

  const formattedMinutes = String(minutes).padStart(2, '۰');
  const formattedSeconds = String(seconds).padStart(2, '۰');

  return (
    <>
      <LoginHeader
        head="کد تأیید را وارد کنید"
        description={phone ? `کد ۵ رقمی به شماره ${phone} ارسال شد` : "کد ۵ رقمی ارسال‌شده را وارد کنید"}
      />

      {/* OTP Input Fields */}
      <div className="my-8" dir="ltr">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => {
            const val = field.value || '';
            return (
              <div className="relative w-full max-w-[280px] mx-auto h-12 flex justify-between gap-3.5" dir="ltr">
                <input
                  value={val}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
                    field.onChange(cleanVal);
                  }}
                  maxLength={5}
                  autoFocus
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {[0, 1, 2, 3, 4].map((index) => {
                  const char = val[index] || '';
                  const isFocused = val.length === index || (val.length === 5 && index === 4);
                  return (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-lg transition-all duration-200 ${
                        isFocused
                          ? 'border-[#ff2d55] bg-white ring-2 ring-[#ff2d55]/10 shadow-xs'
                          : char
                          ? 'border-slate-300 bg-slate-50 text-slate-900'
                          : 'border-slate-200 bg-slate-50/60 text-slate-300'
                      }`}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </div>

      {/* Timer & Resend Button */}
      {!isTimeUp ? (
        <Button disabled={true} className="h-10 text-xs disabled:bg-slate-100 disabled:text-slate-400 border border-slate-200/80 shadow-none font-normal">
          <Timer className="w-3.5 h-3.5 text-slate-400" />
          <span>ارسال مجدد تا</span>
          <span className="font-mono font-medium text-slate-600 dir-ltr">{formattedMinutes}:{formattedSeconds}</span>
        </Button>
      ) : (
        <div>
          <Button onClick={getNewOtp} className="h-10 text-xs">
            <RotateCw className="w-3.5 h-3.5" />
            <span>ارسال مجدد کد</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default PhoneOtp;

