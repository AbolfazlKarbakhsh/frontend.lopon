import React from 'react'
import { Controller } from 'react-hook-form'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { TbDeviceMobileMessage } from 'react-icons/tb';
import Button from '@components/table/Button';
import useTimer from '@hooks/animations/useTimerOtp';
import LoginHeader from '../components/LoginHeader';

const PhoneOtp = ({ control, submitForm }) => {
  const { isTimeUp, resetTimer, minutes, seconds } = useTimer(1);
  const getNewOtp = () => {
    resetTimer();
    submitForm();
  }


  return (
    <>

      <LoginHeader head={"ورود به اپلیکیشن"} description={"کد ارسال شده را وارد کنید :"} />
      <div className="my-6" dir="ltr">
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <div className='OtpFont'>
              <MuiOtpInput
              
                {...field}
                length={5}
                inputMode='numeric'
                type='tel'
                TextFieldsProps={{ inputMode: 'numeric', type: 'tel', className: 'OtpFont ' , autoComplete:"one-time-code"}}

                inputProps={{
                  inputMode: 'numeric',
                  type: 'tel',
                  className: 'OtpFont',
                  autoComplete:"one-time-code",
                }}
                
              />
              {/* {fieldState.invalid && <ErrorText value={'! کد ورود الزامی می باشد'} className="text-right" />} */}
            </div>
          )}
        />
      </div>
      {
        !isTimeUp ? (
          
          <Button className="disabled:bg-gray-200 disabled:text-stone-500" disabled={true} >
            درخواست مجدد تا  &nbsp; |  &nbsp; {seconds} : {minutes}  
          </Button>) : (<div >

            <Button onClick={getNewOtp}>
              درخواست مجدد <TbDeviceMobileMessage size={25} />
            </Button>

          </div>)
      }

    </>

  )
}

export default PhoneOtp