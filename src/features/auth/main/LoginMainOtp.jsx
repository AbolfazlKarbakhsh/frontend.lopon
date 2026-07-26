import React, { useEffect } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import LoginIcon from "@components/svg/LoginIcon";
import PhoneOtp from "../components/PhoneOtp";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { usePost } from "@hooks/server/auth/usePost";
import { Link } from "react-router-dom";
import { STORAGE_KEYS } from "@core/constants/storage-keys";

const LoginMainOtp = () => {

  //? use hookFrom
  const { control, handleSubmit, watch, reset } = useForm();

  //? state page
  const params = useParams();
  const navigate = useNavigate();

  //? get otp
  const [getOtpCode] = usePost("users/send-otp_POST", "users/send-otp", "");
  const [sendOtp, tokenAuth, , isError] = usePost("users/login_POST", "users/login", "");

  //*func submit form
  const submitForm = async () => {
    await getOtpCode({ mobile: params.phone });
  }
  //*func send otp server
  const sendOtpServer = async () => {
    // send server
    await sendOtp({
      mobile: params.phone,
      otp: watch("otp")
    });
  }

  //!effect send otp
  useEffect(() => {
    if (watch("otp")?.length == 5) sendOtpServer();
  }, [watch("otp")]);

  //!effect after success
  useEffect(() => {
    if (tokenAuth?.data?.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokenAuth.data.token);
      navigate("/")
    }
  }, [tokenAuth]);

  //! effect after error
  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [isError]);



  return (
    <form onSubmit={handleSubmit(submitForm)} >
      <div className="h-screen w-full flex justify-center items-center bg-white dark:bg-gray-700 ">
        <div className="w-full px-4">

          {/* bacl Arrow */}
          <Link to={"/login"} className="fixed left-3 top-4 flex flex-row-reverse gap-1 cursor-pointer
             items-center text-stone-500  font-kal-3 border-firoze border p-2 rounded-md text-sm" >
            <TbArrowBackUp size={25} className="  font-kal-2" />
          </Link>

          {/* icon  */}
          <LoginIcon />

          {/* otp page  */}
          <PhoneOtp control={control} watch={watch} submitForm={submitForm} />

        </div>
      </div>
    </form>
  );
};

export default LoginMainOtp;
