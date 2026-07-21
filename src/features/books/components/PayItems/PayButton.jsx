import React, { useEffect } from 'react'
import usePost from "@hooks/server/usePost"

function PayButton({ data }) {

  const {
    mutate: createPayment,
    data: createPayData,
  } = usePost({}, `payments`, `payments_Create/Post${data._id}`, '', false);

  // create payment
  const createPaymentFN = () => createPayment({ id: data._id });




  useEffect(() => {
    createPayData?.data?.data && window.location.replace(createPayData.data.data.paymentLink);
  }, [createPayData]);

  return (
    <button className="btn btn-wide bg-firoze border-0 text-white " onClick={createPaymentFN}>
      <div className="font-kal-2">خرید</div>|
      <div>
        <span className="ml-1 font-kal-2 ">
          {data.discountPrice?.toLocaleString()}
        </span>
        <span className="font-kal-2">ریال</span>
      </div>
    </button>
  )
}

export default PayButton