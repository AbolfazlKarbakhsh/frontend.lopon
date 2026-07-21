import React from "react";
import ExitProfile from "./ExitProfile";
import DetailsProfile from "./DetailsProfile";
import useGet from "@hooks/server/useGet";
import MainButtons from "./MainButtons";
import Skeleton from "./components/Skeleton";

const ProfileMain = () => {
  const { data: getME, isLoading } = useGet({}, 'users/getMe', `users/getMe_Get`);
  return (
    <div className="px-4 my-4 ">
      {
        isLoading ? <Skeleton /> :
          <>
            {/* details user  */}
            <DetailsProfile data={getME?.data} />

            {/* main buttons  */}
            <MainButtons />

            {/* exit profile   */}
            <ExitProfile />
          </>
      }


    </div >
  );
};

export default ProfileMain;
