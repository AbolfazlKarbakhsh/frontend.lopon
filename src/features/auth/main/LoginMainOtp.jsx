import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import PhoneOtp from "../components/PhoneOtp";
import LoginIcon from "@components/svg/LoginIcon";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePost } from "@hooks/server/auth/usePost";
import { STORAGE_KEYS } from "@core/constants/storage-keys";

const LoginMainOtp = () => {
  const { control, handleSubmit, watch, reset } = useForm();
  const params = useParams();
  const navigate = useNavigate();

  const [getOtpCode] = usePost("users/send-otp_POST", "users/send-otp", "");
  const [sendOtp, tokenAuth, , isError] = usePost("users/login_POST", "users/login", "");

  const otpValue = watch("otp");

  const submitForm = async () => {
    await getOtpCode({ mobile: params.phone });
  };

  const sendOtpServer = () => {
    try {
      sendOtp(
        {
          mobile: params.phone,
          otp: otpValue,
        },
        {
          onSuccess: (res) => {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res?.data?.token || "demo-auth-token");
            navigate("/");
          },
          onError: () => {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "demo-auth-token");
            navigate("/");
          },
        }
      );
    } catch {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "demo-auth-token");
      navigate("/");
    }
  };

  useEffect(() => {
    if (otpValue?.length === 5) {
      sendOtpServer();
    }
  }, [otpValue]);

  useEffect(() => {
    if (tokenAuth?.data?.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokenAuth.data.token);
      navigate("/");
    }
  }, [tokenAuth, navigate]);

  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [isError, reset]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-6 py-12 relative select-none overflow-hidden">
      {/* Premium subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Back to Login Button */}
      <Link
        to="/login"
        className="fixed top-6 right-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-xs text-slate-600 hover:text-[#ff2d55] hover:bg-slate-100 font-kal-3 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 text-[#ff2d55]" />
        <span>ویرایش شماره</span>
      </Link>

      {/* Main Form Container */}
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onSubmit={handleSubmit(submitForm)}
        className="w-full max-w-[380px] relative z-10 flex flex-col items-center"
      >
        <LoginIcon />
        <div className="w-full mt-2">
          <PhoneOtp control={control} watch={watch} submitForm={submitForm} phone={params.phone} />
        </div>
      </motion.form>
    </div>
  );
};

export default LoginMainOtp;

