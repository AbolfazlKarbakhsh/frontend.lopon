import React from 'react';
import { Drawer } from 'vaul';
import { BiSupport } from 'react-icons/bi';
import { BsQuestionCircle } from 'react-icons/bs';

function SupportDrawer({ isOpen, setIsOpen }) {
  return (
    <Drawer.Root dismissible={true} open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity" />
        <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl z-50 p-5 shadow-2xl border-t border-gray-100 outline-none">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
          
          <Drawer.Title className="text-center font-kal-3 font-bold text-gray-900 text-base mb-4">
            پشتیبانی
          </Drawer.Title>

          <div className="space-y-1">
            <a
              href="tel:09103748047"
              className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-gray-50 text-gray-800 transition-colors border-b border-gray-100"
            >
              <div className="w-9 h-9 rounded-full bg-pink-50 text-[#ff0055] flex items-center justify-center shrink-0">
                <BiSupport size={20} />
              </div>
              <span className="font-kal-2 text-sm font-medium">تماس با پشتیبانی</span>
            </a>

            <div
              className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-gray-50 text-gray-800 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BsQuestionCircle size={18} />
              </div>
              <span className="font-kal-2 text-sm font-medium">سوالات متداول</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full py-3 rounded-2xl border border-gray-200 text-gray-700 font-kal-3 font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer active:scale-[0.99]"
          >
            بستن
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default SupportDrawer;
