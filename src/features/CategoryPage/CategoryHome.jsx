import React from "react";
import HeadPage from "@components/global/headings/headPage";
import BookLib from "./bookLib";
import { useParams } from "react-router";
import useGet from "@hooks/server/useGet";
import AppState from '@components/UI/AppState'

const CategoryHome = () => {
  const params = useParams();

  const { data: bookData, isLoading: loadBooks  } = useGet({ category: params.id }
    , 'books', `books/my_Get_${params.id}`);

  const { data: cateGory  , isError} = useGet({ _id: params.id }
    , 'categorys', `categorys/one_Get_${params.id}`);

  return (
    <div className=" px-4 mt-4 mb-4">
      <HeadPage content={cateGory?.data[0].title || "در حال بارگیری ..."} className="mr-1" />
      <div className="flex flex-wrap justify-between gap-4 mt-4 ">
        {
          bookData?.data?.map(e => <BookLib key={e._id} e={e} />)
        }

        {
          (loadBooks) && <>
            <div className="skeleton  h-[240px] w-[46%] rounded-lg"></div>
            <div className="skeleton  h-[240px] w-[46%] rounded-lg"></div>
            <div className="skeleton  h-[240px] w-[46%] rounded-lg"></div>
            <div className="skeleton  h-[240px] w-[46%] rounded-lg"></div>
          </>
        }

        {
          (!loadBooks && !bookData)  && <AppState state="no" className="mt-[8vh] "  />
        }

      </div>
    </div>
  );
};

export default CategoryHome;
