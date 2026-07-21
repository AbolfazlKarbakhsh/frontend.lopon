import React from "react";
import CategoryBox from "@components/global/box/CategoryBox";
import HeadPage from "@components/global/headings/headPage";
import useGet from "@hooks/server/useGet";
import Skeleton from "./Skeleton";
import AppState from '@components/UI/AppState'

const CategoryMain = () => {
  const { data: cateGorys, isLoading: loadCateGorys, isError: errCategorys,
    refetch: refetchCategorys } = useGet({ sort: "-title" }, 'categorys', `categorys/my_Get`);

  return (
    <div className=" px-4 mt-4 mb-4">
      <HeadPage content="دسته بندی ها" className="mr-1" />
      <div className="flex flex-wrap justify-around gap-3 mt-4 ">

        {
          (!loadCateGorys && !errCategorys && cateGorys?.data?.length != 0) && cateGorys?.data?.map(e => (
              <CategoryBox className="w-[48%] [&>p]:text-base" size="42" data={e} />
          ))
        }
      </div>
      {(!cateGorys?.data && errCategorys && !loadCateGorys) && <AppState state="in" className="mt-[10vh]" callBack={refetchCategorys} />}
      {loadCateGorys && <Skeleton />}
    </div>
  );
};

export default CategoryMain;
