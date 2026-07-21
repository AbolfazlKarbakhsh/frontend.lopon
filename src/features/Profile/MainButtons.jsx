import { MdArticle } from "react-icons/md";
import { BsBrowserChrome } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import React from 'react'
import Button from '@components/table/Button';
import DrawerVual from "@components/global/Drawers/Drawer";
import { MdOutlinePayment } from "react-icons/md";
import { Link } from "react-router-dom";
function ButtonLink({ children, title, className, to }) {
  return (
    <Link className={className} to={to}>
      <Button className="bg-white mt-0 flex flex-col items-start text-gray-800 p-4  rounded-xl h-full   hover:!text-white ps-4">
        {children}
        <h2 className="font-kal-2 text-sm">  {title} </h2>
      </Button>
    </Link>
  )
}
function ButtonA({ children, title, className, href, onClick = () => { } }) {
  return (
    <a className={className} href={href} onClick={onClick}
      target="_blank" rel="noopener noreferrer">
      <Button className="bg-white mt-0 flex flex-col items-center justify-evenly text-gray-800 p-4
        rounded-xl h-full   hover:!text-white ps-4 ">
        {children}
        <h2 className="font-kal-2 text-sm text-nowrap ">  {title} </h2>
      </Button>
    </a>
  )
}


function MainButtons() {
  return (
    <div >
      <div className="flex gap-2 w-full flex-wrap items-stretch  h-full ">

        <ButtonLink title="لیست پرداخت من" className="w-[calc(45%-0.3rem)] h-full" to="/profile/myPaymentList">
          <MdOutlinePayment size={25} className="text-firoze" />
        </ButtonLink>

        <ButtonLink title="کتاب های دانلود شده " className="w-[calc(55%-0.3rem)]" to='/mylib?justDownload=true'>
          <ImBooks size={25} className="text-firoze" />
        </ButtonLink>

        <ButtonA title=" وب سایت SA" className="w-[calc(33%-0.3rem)]" href={"https://sa-iran.org/"}>
          <BsBrowserChrome size={25} className="text-yellow-300" />
        </ButtonA>
        <ButtonA title=" درباره SA" className="w-[calc(33%-0.3rem)]" href={"https://sa-iran.org/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d9%85%d8%a7/"}>
          <MdArticle size={25} className="text-purple-500" />
        </ButtonA>

        <DrawerVual
          isHeaight={true}
          trigger={<ButtonA title="پشتیبانی تلفنی" className="w-[calc(33%-0.3rem)]" >
            <BiSupport size={25} className="text-green-400" />
          </ButtonA>}>
          <h3 className="font-bold text-lg">پشتیبانی تلفنی</h3>
          <p className="py-4"> جهت گزارش و رفع مشکلات با شماره <span>09103748047 </span> تماس بگیرید ! </p>
        </DrawerVual>



      </div>

    </div>
  )
}

export default MainButtons