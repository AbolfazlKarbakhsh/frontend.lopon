import MainHeader from "./MainHeader"
import MainFooter from "./MainFooter"
import BottomNavigation from "@components/global/BottomNavigation"
import PageHeader from "@components/global/headings/PageHeader"
import { Outlet, useLocation } from "react-router-dom"
import useHeaderShow from "@store/app/appLayout"
import useFooterShow from "@store/app/appFooter"
import useHideWithRoute from "@hooks/app/useHideWithRoute"
import React, { useEffect, useRef } from "react"
import { useBackButtonHandler } from "@core/backButtonManager"

function MainLayout() {
  useBackButtonHandler();
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
    if (hideHeader && hideFooter) return "h-[calc(100vh-0px)]";
    if (hideHeader) return "h-[calc(100vh-65.1px)]";
    if (hideFooter) return "h-[calc(100vh-62px)]";
    return "h-[calc(100vh)]";
  };

  const hasPageHeader = ["/cart", "/orders", "/profile/orders", "/profile", "/faq", "/about-us"].includes(location.pathname);

  const getHeaderTitle = () => {
    if (location.pathname === "/cart") return "سبد خرید";
    if (location.pathname === "/orders" || location.pathname === "/profile/orders") return "سفارشات من";
    if (location.pathname === "/profile") return "حساب کاربری";
    if (location.pathname === "/faq") return "سوالات متداول";
    if (location.pathname === "/about-us") return "درباره لوپُن";
    return "";
  };

  return (
    <div className="h-screen overflow-hidden dark:bg-gray-700 flex flex-col">
      {hasPageHeader && <PageHeader title={getHeaderTitle()} />}
      {!hideHeader && !hasPageHeader && <MainHeader />}
      <div
        ref={mainContentRef}
        className={`bg-[#fff] border-slate-100 overflow-y-auto no-scrollbar flex-1 ${(hideFooter || location.pathname === '/' || location.pathname === '/faq' || location.pathname === '/about-us') ? '' : 'pb-[72px]'}`}
      >
        <Outlet />
        
        {!hideFooter && location.pathname === '/' && <MainFooter />}
      </div>
      {!hideFooter && <BottomNavigation />}
    </div>
  )
}

export default MainLayout

