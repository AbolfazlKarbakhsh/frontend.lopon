import React from 'react'
import IranNumber from "./IranNumber";


function PhoneInput({validation}) {
  return (
    <>
      <div className="relative mt-6 w-full  border p-2 rounded flex items-center  focus-within:border-firoze focus-within:text-firoze">
        <div className="flex-1">
          <input
            id="username"
            name="username"
            type="text"
            inputMode="numeric"
            dir="ltr"
            autoComplete="new-password"

            placeholder="9*********"
            {...validation}
            className="w-full border-gray-300 py-1 transition-colors focus:outline-none  peer bg-inherit text-sm text-27 font-kal-2 tracking-wider"
          />
        </div>
        <label className="absolute right-5 text-xs font-kal-2 text-stone-800 -top-3 bg-white dark:bg-gray-700 dark:text-white p-1 ">شماره موبایل *</label>
        <IranNumber />
      </div>
    </>
  )
}

export default PhoneInput