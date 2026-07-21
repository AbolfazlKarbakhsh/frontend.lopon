import React from 'react'
import Button from '@components/table/Button';
import BadInternet from './ImageInternet';
import NoPayment from '@assets/images/appState/noPayment.svg';
import NoBook from '@assets/images/appState/noBook.svg';
import { twMerge } from 'tailwind-merge';


function AppState({ state, callBack, className, isDownload = false }) {
  const stateProject = () => {
    switch (state) {
      case "in":
        return <>
          <BadInternet className='mx-auto' />
          <p className='text-md mt-1 font-kal-2'>به اینترنت وصل نیستی.</p>

          <Button className="w-auto max-h-0 min-h-9  text-sm px-5 !rounded-2xl mt-5 bg-d-firoze" onClick={callBack}>تلاش دوباره</Button>
        </>
      case "pay":
        return <>
          <img src={NoPayment} className='mx-auto' />
          <p className='text-md mt-1 font-kal-2'> فعلا چیزی رو نخریدی  ، هیچ پرداختی   یافت نشد .</p>
        </>
      case "book":
        return <>
          <img src={NoBook} className='mx-auto h-64' />
          {isDownload ? <p className='text-md mt-1 font-kal-2'>سبد کتاب شما خالیه ، بهتره پرش کنی .</p> : <p className='text-md mt-1 font-kal-2'>هیچ کتابی هنوز دانلود نشده است !</p>}

        </>
      case "no":
        return <div className='text-center flex justify-center flex-col items-center  w-full'>
          <img src={NoBook} className='mx-auto h-64' />
          <p className='text-md mt-1 font-kal-2'>   هیچ موردی یافت نشد   !</p>

        </div>
    }
  }
  return (
    <div className={twMerge(' mt-[20vh] text-center w-full', className)}>
      {
        stateProject()
      }
    </div>
  )
}

export default AppState