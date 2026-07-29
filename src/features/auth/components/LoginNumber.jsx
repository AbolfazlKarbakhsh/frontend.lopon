import PhoneInput from '@components/forms/PhoneInput'
import ErrorText from "@components/forms/errorText";
import Button from '@components/table/Button';
import { BiArrowBack } from 'react-icons/bi';
import LoginHeader from '../components/LoginHeader';
function LoginNumber({ validation, error, phoneLoading }) {
  return (
    <>
      <LoginHeader head={"شروع کار با لوپُن"} description={"با شمارۀ موبایل‌تان وارد شوید:"} />
      {/* input  */}
      <PhoneInput validation={validation} />
      {error && <ErrorText value={error.message} />}

      {
        phoneLoading ? <Button key="loading" disabled={true}>
          در حال بارگیری
        </Button> : <Button type={"submit"} >
          دریافت کد
          <BiArrowBack size={22} />
        </Button>
      }
  
    </>
  )
}

export default LoginNumber