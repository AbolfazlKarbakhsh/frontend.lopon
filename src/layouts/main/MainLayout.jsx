import MainHeader from "./MainHeader"
import MainFooter from "./MainFooter"
import { Outlet } from "react-router"
import useHeaderShow from "@store/app/appLayout"
import useFooterShow from "@store/app/appFooter"
import useHideWithRoute from "@hooks/app/useHideWithRoute"
import { Link } from "react-router-dom"
import { User } from "lucide-react"

function MainLayout() {
  const { data: hideHeader, changeData: setHideHeader } = useHeaderShow();
  const { data: hideFooter, changeData: setHideFooter } = useFooterShow();


  useHideWithRoute(setHideHeader, ["/books/", "/profile/myPaymentList", "/categorypage/"]);
  useHideWithRoute(setHideFooter, ["/books/BookViewer"]);

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
        className={`${checkClassForApp()} bg-[#fff] border-slate-100 overflow-y-auto no-scrollbar`}
      >
    
        <Outlet />
        <MainFooter />

      </div>
      {/* {!hideFooter && } */}
    </div>
  )
}

export default MainLayout

