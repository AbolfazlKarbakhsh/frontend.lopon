import MainHeader from "./MainHeader"
import MainFooter from "./MainFooter"
import BottomNavigation from "@components/global/BottomNavigation"
import { Outlet, useLocation } from "react-router-dom"
import useHeaderShow from "@store/app/appLayout"
import useFooterShow from "@store/app/appFooter"
import useHideWithRoute from "@hooks/app/useHideWithRoute"
import React, { useEffect, useRef } from "react"

function MainLayout() {
  const { data: hideHeader, changeData: setHideHeader } = useHeaderShow();
  const { data: hideFooter, changeData: setHideFooter } = useFooterShow();
  const location = useLocation();
  const mainContentRef = useRef(null);

  useHideWithRoute(setHideHeader, ["/books/", "/profile/myPaymentList", "/categorypage/"]);
  useHideWithRoute(setHideFooter, ["/books/BookViewer" ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    const scrollables = document.querySelectorAll('.overflow-y-auto');
    scrollables.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [location.pathname, location.search]);

  const checkClassForApp = () => {
    if (hideHeader && hideFooter) return "h-[calc(100vh-0px)]"
    if (hideHeader) return "h-[calc(100vh-65.1px)]";
    if (hideFooter) return "h-[calc(100vh-62px)]";
    // return "h-[calc(100vh-124px)]";
    return "h-[calc(100vh)]"
  }

  return (
    <div className="h-screen overflow-y-auto no-scrollbar dark:bg-gray-700">
      {!hideHeader && <MainHeader />}
      <div
        ref={mainContentRef}
        className={`${checkClassForApp()} bg-[#fff] border-slate-100 overflow-y-auto no-scrollbar`}
      >
        <Outlet />
        
        {!hideFooter && location.pathname === '/' && <MainFooter />}
      </div>
      {!hideFooter && <BottomNavigation />}
    </div>
  )
}

export default MainLayout

