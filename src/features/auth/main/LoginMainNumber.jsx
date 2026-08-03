import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import LoginIcon from "@components/svg/LoginIcon";
import { ValidationForms } from "@utils/forms";
import useZeroPhone from "@hooks/validations/useZeroPhone";
import LoginNumber from "../components/LoginNumber";
import { authService } from "@services/auth.service";
import { useTopAlert } from "@hooks/useTopAlert";
import PageHeader from "@components/global/headings/PageHeader";

const validator = new ValidationForms();

const LoginMainNumber = () => {
  const { register, formState: { errors }, setValue, watch, handleSubmit } = useForm();
  useZeroPhone(setValue, watch, "mobile");
  const navigate = useNavigate();
  const { showAlert } = useTopAlert();
  const [loading, setLoading] = useState(false);

  const submitForm = async (formData) => {
    const mobile = formData.mobile || watch("mobile");
    if (!mobile) return;

    setLoading(true);
    try {
      const res = await authService.sendOtp({ mobile });
      setLoading(false);

      if (res?.data?.status === "success" || res?.status === 200 || res?.data) {
        const successMsg = res?.data?.message || "کد تایید ارسال شد";
        showAlert({ type: "success", message: successMsg });
        navigate(`/login/otp/${mobile}`);
      } else {
        const errorMsg = res?.data?.message || "خطا در ارسال کد تایید";
        showAlert({ type: "error", message: errorMsg });
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err?.response?.data?.message || "خطا در ارسال کد تایید. لطفاً مجدداً تلاش کنید.";
      showAlert({ type: "error", message: errorMsg });
      
      // Navigate to OTP page for testing environment or demo fallback
      setTimeout(() => {
        navigate(`/login/otp/${mobile}`);
      }, 1200);
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-white flex flex-col relative select-none overflow-hidden">
      {/* Page Header with Back and Support Drawer */}
      <PageHeader title="ورود / ثبت‌نام" showSupportIcon={true} onBack={() => navigate('/')} />

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col justify-center items-center px-6 py-4 relative overflow-hidden">
        {/* Premium subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
        
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onSubmit={handleSubmit(submitForm)}
          className="w-full max-w-[380px] relative z-10 flex flex-col items-center my-auto"
        >
          <LoginIcon />
          <div className="w-full mt-2">
            <LoginNumber
              validation={register('mobile', { required: "شماره موبایل الزامی می‌باشد!", validate: validator.validatePhone })}
              error={errors.mobile}
              phoneLoading={loading}
            />
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginMainNumber;


