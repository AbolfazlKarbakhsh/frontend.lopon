import React, { useEffect, useState } from "react";
import HeadPage from "@components/global/headings/headPage";
import BookLib from "./bookLib";
import useIndexDb from "@hooks/viewerBook/useIndexDb"
import useLog from "../../hooks/app/useLog";
import useGet from "@hooks/server/useGet";
import { useLocation } from 'react-router-dom';
import AppState from '@components/UI/AppState'


const useQuery = () => new URLSearchParams(useLocation().search);

const LibHome = () => {
  // index db
  const { dataList } = useIndexDb(0, true);
  const { data: getME } = useGet({}, 'users/getMe', `users/getMe_Get`);
  const [mergeData, setmergeData] = useState([]);
  const isDownload = Boolean(useQuery().get('justDownload'));

  useEffect(() => {
    if (getME?.data?.bookList && dataList && !isDownload) {
      const map = new Map;
      const bookList = getME?.data?.bookList.map(i => ({ name: i._id, ...i, isDownload: false }));

      bookList.forEach(item => {
        map.set(item.name, item);
      })

      dataList.forEach(item => {
        map.set(item.name, item);
      })
      setmergeData(Array.from(map.values()));
    } else {
      setmergeData(dataList);
    }
  }, [getME, dataList , isDownload]);


  return (
    <div className=" px-4 mt-4 mb-4">
      <HeadPage content= {!isDownload ? "کتابخانه من  " : "کتاب های دانلود شده"} className="mr-1" />
      <div className="flex flex-wrap justify-around gap-4 mt-4 ">
        {mergeData?.map(e =>
          <BookLib e={e} key={e.name} />
        )}
      </div>
      
      {mergeData?.length == 0 && <AppState state="book" className="mt-[8vh] "  isDownload={!isDownload}/>}
    </div>
  );
};

export default LibHome;
