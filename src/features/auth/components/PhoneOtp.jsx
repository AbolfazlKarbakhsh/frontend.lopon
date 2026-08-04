import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { RotateCw, Timer, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Button from '@components/table/Button';
import useTimer from '@hooks/animations/useTimerOtp';
import LoginHeader from '../components/LoginHeader';
import { authService } from '@services/auth.service';
import { useTopAlert } from '@hooks/useTopAlert';

const PhoneOtp = ({
  control,
  watch,
  setValue,
  register,
  onResend,
  phone,
  loading,
  resending,
  onSubmit,
}) => {
  const { isTimeUp, resetTimer, minutes, seconds } = useTimer(1);
  const { showAlert } = useTopAlert();

  const [showReferral, setShowReferral] = useState(false);
  const [checkingReferral, setCheckingReferral] = useState(false);
  const [referralResult, setReferralResult] = useState(null);

  const otpVal = watch ? watch('otp') : '';
  const referralVal = watch ? watch('referralCode') : '';

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
        // Handle aborts gracefully
      }
    };

    receiveOtp();

    return () => {
      ac.abort();
    };
  }, [setValue]);

  // Resend OTP handler
  const handleResend = () => {
    resetTimer();
    if (onResend) {
      onResend();
    }
  };

  // Check Referral Code Handler (GET /api/v1/users/check-referral/:code)
  const handleCheckReferral = async () => {
    const code = referralVal?.trim();
    if (!code) {
      showAlert({ type: 'error', message: 'لطفاً کد معرف را وارد کنید' });
      return;
    }

    setCheckingReferral(true);
    setReferralResult(null);

    try {
      const res = await authService.checkReferral(code);
      setCheckingReferral(false);

      if (res?.data?.status === 'success' || res?.data?.valid === true) {
        const inviter = res?.data?.data?.inviterName || 'کاربر لوپُن';
        const msg = res?.data?.message || 'کد دعوت معتبر است';
        setReferralResult({ valid: true, inviterName: inviter, message: msg });
        showAlert({ type: 'success', message: msg });
      } else {
        const msg = res?.data?.message || 'کد دعوت نامعتبر است';
        setReferralResult({ valid: false, message: msg });
        showAlert({ type: 'error', message: msg });
      }
    } catch (err) {
      setCheckingReferral(false);
      const errorMsg = err?.response?.data?.message || 'کد دعوت وارد شده معتبر نمی‌باشد';
      setReferralResult({ valid: false, message: errorMsg });
      showAlert({ type: 'error', message: errorMsg });
    }
  };

  const formattedMinutes = String(minutes).padStart(2, '۰');
  const formattedSeconds = String(seconds).padStart(2, '۰');

  return (
    <>
      <LoginHeader
        head="کد تأیید را وارد کنید"
        description={
          phone
            ? `کد ۵ رقمی به شماره ${phone} ارسال شد`
            : 'کد ۵ رقمی ارسال‌شده را وارد کنید'
        }
      />

      {/* OTP Input Fields */}
      <div className="my-5" dir="ltr">
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
      <div className="flex justify-center mb-4">
        {!isTimeUp ? (
          <Button disabled={true} className="h-9 text-xs disabled:bg-slate-100 disabled:text-slate-400 border border-slate-200/80 shadow-none font-normal">
            <Timer className="w-3.5 h-3.5 text-slate-400" />
            <span>ارسال مجدد تا</span>
            <span className="font-mono font-medium text-slate-600 dir-ltr">
              {formattedMinutes}:{formattedSeconds}
            </span>
          </Button>
        ) : (
          <Button onClick={handleResend} disabled={resending} className="h-9 text-xs">
            {resending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RotateCw className="w-3.5 h-3.5" />
            )}
            <span>ارسال مجدد کد</span>
          </Button>
        )}
      </div>

      {/* Referral Code Section (CartSummary Style) */}
      <div className="w-full mt-3 pt-2 pb-1 text-right dir-rtl border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-kal-3 font-medium text-slate-700">کد معرف دارید؟</span>

          {/* Toggle Switch */}
          <button
            type="button"
            dir="ltr"
            onClick={() => {
              setShowReferral(!showReferral);
              if (showReferral) {
                setReferralResult(null);
                if (setValue) setValue('referralCode', '');
              }
            }}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
              showReferral ? 'bg-[#ff2d55]' : 'bg-slate-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out transform ${
                showReferral ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Referral Code Input Box (Visible when toggle is ON) */}
        {showReferral && (
          <div className="mt-3 space-y-2.5">
            {/* Feedback Message Above Input */}
            {referralResult && (
              <div
                className={`px-3 py-2 rounded-xl text-xs font-kal-2 flex items-center justify-between transition-all ${
                  referralResult.valid
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {referralResult.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>
                    {referralResult.valid
                      ? `کد دعوت معتبر است (${referralResult.inviterName})`
                      : referralResult.message || 'کد دعوت معتبر نمی‌باشد'}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                {...(register ? register('referralCode') : {})}
                placeholder="کد معرف را وارد کنید"
                maxLength={15}
                onChange={(e) => {
                  if (register) {
                    const reg = register('referralCode');
                    if (reg && reg.onChange) reg.onChange(e);
                  }
                  if (referralResult) setReferralResult(null);
                }}
                className="flex-1 bg-white border border-slate-300 focus:border-[#ff2d55] rounded-xl px-3.5 py-2 text-[13px] font-kal-2 text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors text-center dir-ltr"
              />
              <button
                type="button"
                onClick={handleCheckReferral}
                disabled={checkingReferral || !referralVal}
                className="bg-[#f0f3f7] hover:bg-slate-200 text-slate-700 font-kal-3 font-semibold px-4 py-2 rounded-xl text-[13px] transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex items-center justify-center min-w-[65px] h-9"
              >
                {checkingReferral ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                ) : (
                  'استعلام'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submit / Login Button */}
      <div className="w-full mt-4">
        <Button
          type="button"
          onClick={onSubmit}
          disabled={loading || !otpVal || otpVal.length < 5}
          className="h-11 text-xs sm:text-sm w-full cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>درحال بررسی...</span>
            </>
          ) : (
            <>
              <span>تأیید و ورود</span>
              <ArrowLeft className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default PhoneOtp;
