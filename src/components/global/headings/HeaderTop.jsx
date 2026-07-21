import { CiSearch } from "react-icons/ci";
import { HiChevronRight } from "react-icons/hi2";
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';
import DrawerSearch from '../Drawers/DrawerSearch';
function HeaderTop({ title, className, classPage }) {
  const navigaite = useNavigate();
  const location = useLocation();
  const uiLogic = location.pathname.startsWith("/books/BookViewer/");
  return (
    <div>

      <div className={twMerge('h-[58.9px]', classPage)}></div>
      <div className={twMerge('fixed top-0 left-0  w-full z-20  h-[58.9px] border-b  bg-white  shadow-sm ', className)}>

        <div className="px-3 flex justify-between items-center wh-full">
          <div className='hover:bg-slate-200  hover:bg-opacity-60 p-1 hover:rounded-lg transition-all ease-in-out delay-100 hover:scale-110' onClick={() => navigaite(-1)}>
            <HiChevronRight size={30} className="text-gray-500 " />
          </div>
          {!uiLogic && 
         <div className="font-kal-2">{title}</div>
         } 
          <DrawerSearch isHeaight={false}>
            <div className="hover:bg-slate-200  hover:bg-opacity-60 p-1 hover:rounded-lg transition-all ease-in-out delay-100 hover:scale-110">
              <CiSearch size={30} className="text-gray-500 " />
            </div>
          </DrawerSearch>


        </div>

      </div>
    </div>
  )
}

export default HeaderTop