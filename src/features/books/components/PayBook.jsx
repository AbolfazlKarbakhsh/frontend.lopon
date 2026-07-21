import React from 'react'
import PayButton from './PayItems/PayButton';
import DownloadBook from './PayItems/DownloadBook';

function PayBook({ data }) {

  return (
    <div className="flex-center flex-col px-8 border-b-2 border-gray-200 pb-6">
      <h2 className="text-27 font-kal-3 mb-8"> {data?.title}</h2>

      {data?.hasPurchased == false ?
        <PayButton data={data} /> : <DownloadBook data={data}/>
      }
    </div>

  )
}

export default PayBook