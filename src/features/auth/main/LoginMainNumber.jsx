import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import LoginIcon from "@components/svg/LoginIcon";
import { ValidationForms } from "@utils/forms";
import useZeroPhone from "@hooks/validations/useZeroPhone";
import { usePost } from "@hooks/server/auth/usePost";
import LoginNumber from "../components/LoginNumber";

const LoginMainNumber = () => {

  // use hookFrom
  const { register, formState: { errors }, setValue, watch, handleSubmit, } = useForm();

  // phone validation
  const validator = new ValidationForms;
  useZeroPhone(setValue, watch, "mobile");

  //state page
  const navigaite = useNavigate();

  // mutate for post 
  const [getOtpCode, stateOtp, loading] = usePost("users/send-otp_POST", "users/send-otp", "");

  // real-Phone
  const [phone, setPhone] = useState();

  // end-submit 
  const submitForm = async data => {
    const mobile = watch("mobile");
    setPhone(mobile);
    try {
      getOtpCode(data, {
        onSuccess: () => {
          navigaite(`/login/otp/${mobile}`);
        },
        onError: () => {
          navigaite(`/login/otp/${mobile}`);
        }
      });
    } catch {
      navigaite(`/login/otp/${mobile}`);
    }
  }
  // Effect after submit 
  useEffect(() => {
    if (stateOtp?.data?.status == "success" && phone) {
      navigaite(`/login/otp/${phone}`);
    }
  }, [stateOtp, phone]);

  return (
    <form onSubmit={handleSubmit(submitForm)} >
      <div className="h-screen w-full bg-white dark:bg-gray-700 flex justify-center items-center">
        <div className="w-full px-4">
          {/* icon  */}
          <LoginIcon />
          {/* number page  */}
          <LoginNumber
            validation={register('mobile', { required: "شماره موبایل الزامی می باشد ! ", validate: validator.validatePhone })}
            error={errors.mobile} phoneLoading={loading} />
        </div>
      </div>
    </form>
  );
};

export default LoginMainNumber;
