import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import LoginIcon from "@components/svg/LoginIcon";
import { ValidationForms } from "@utils/forms";
import useZeroPhone from "@hooks/validations/useZeroPhone";
import { usePost } from "@hooks/server/auth/usePost";
import LoginNumber from "../components/LoginNumber";

const validator = new ValidationForms();

const LoginMainNumber = () => {
  const { register, formState: { errors }, setValue, watch, handleSubmit } = useForm();

  useZeroPhone(setValue, watch, "mobile");

  const navigate = useNavigate();

  const [getOtpCode, stateOtp, loading] = usePost("users/send-otp_POST", "users/send-otp", "");

  const [phone, setPhone] = useState("");

  const submitForm = async (data) => {
    const mobile = watch("mobile");
    setPhone(mobile);
    try {
      getOtpCode(data, {
        onSuccess: () => {
          navigate(`/login/otp/${mobile}`);
        },
        onError: () => {
          navigate(`/login/otp/${mobile}`);
        }
      });
    } catch {
      navigate(`/login/otp/${mobile}`);
    }
  };

  useEffect(() => {
    if (stateOtp?.data?.status === "success" && phone) {
      navigate(`/login/otp/${phone}`);
    }
  }, [stateOtp, phone, navigate]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-6 py-12 relative select-none overflow-hidden">
      {/* Premium subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onSubmit={handleSubmit(submitForm)}
        className="w-full max-w-[380px] relative z-10 flex flex-col items-center"
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
  );
};

export default LoginMainNumber;


