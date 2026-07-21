import React from 'react'
import AppState from '@components/UI/AppState'
import useGet from "@hooks/server/useGet";
import Skeleton from './components/Skeleton';
import MainPayList from './MainPayList';


function PaymentListMain() {
  const { data: payList, isLoading , isError , refetch} = useGet({}, 'payments/my', `payments/my_Get`);
  return (
    <>
      {isLoading && <Skeleton />}
      {isError && <AppState state="in"  callBack={refetch}/>}

      {payList?.data?.length == 0 && <AppState state="pay" />}
      {(payList?.data?.length != 0 && !isLoading ) &&  <MainPayList payList={payList} />}
     
    </>
  )
}

export default PaymentListMain