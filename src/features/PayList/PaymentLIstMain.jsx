import React from 'react';
import AppState from '@components/UI/AppState';
import useGet from "@hooks/server/useGet";
import Skeleton from './components/Skeleton';
import MainPayList from './MainPayList';

function PaymentListMain() {
  const { data: payList, isLoading, isError, refetch } = useGet({}, 'payments/my', 'payments/my_Get');

  if (isLoading) return <Skeleton />;
  if (isError) return <AppState state="in" callBack={refetch} />;
  if (!payList?.data || payList.data.length === 0) return <AppState state="pay" />;

  return <MainPayList payList={payList} />;
}

export default PaymentListMain;