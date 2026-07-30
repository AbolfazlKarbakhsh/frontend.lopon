import React from 'react'
import PaymentListMain from '@features/PayList/PaymentLIstMain'
import HeaderTop from '@components/global/headings/HeaderTop';

function PayList() {
  return (
    <>
      <HeaderTop  title="لیست پرداخت من"/>
      <PaymentListMain />
    </>
  )
}

export default PayList