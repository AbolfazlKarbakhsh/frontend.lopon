import React from "react";
import useHeaderShow from "@store/app/appLayout";
import HeaderSearch from "@components/global/headings/HeaderSearch";
function MainHeader() {
  const { data } = useHeaderShow()

  return (
    <div className={data ? 'hidden' : ''}>
        {/* <HeaderSearch /> */}

    </div>
  );
}

export default MainHeader;
