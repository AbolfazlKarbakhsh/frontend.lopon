import React from 'react'
import toast from 'react-hot-toast';
import { Drawer } from 'vaul';
import { useRegisterModal } from '@core/backButtonManager';

function DrawerVual({ children, trigger, isHeaight = true }) {
  const [isOpen, setIsOpen] = React.useState(false);
  useRegisterModal(isOpen, () => setIsOpen(false));
  return (
    <>
      <Drawer.Root dismissible={true} open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger   className="w-[calc(33%-0.3rem)] h-auto" >
          {trigger}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-screen rounded-t-[10px] h-auto] z-50">
            <div className=" w-full  overflow-auto p-4 rounded-t-[10px]">
              <Drawer.Handle />
              {children}
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn mx-2 btn-primary" onClick={() => {
                    navigator.clipboard.writeText("09131658627");
                    toast.success("شماره پشتیبانی با موفقیت کپی شد !");
                    setIsOpen(false)
                  }}>کپی کردن شماره</button>
                  <button className="btn mx-2 " onClick={() => setIsOpen(false)}> باشه</button>
                </form>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default DrawerVual