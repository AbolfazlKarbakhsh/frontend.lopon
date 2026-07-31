import React, { useState } from 'react'
import { Drawer } from 'vaul';
import SearchPage from '../page/SearchPage';
import { useRegisterModal } from '@core/backButtonManager';

function DrawerSearch({ children , isHeaight = true}) {
  const [isOpen, setIsOpen] = useState(false);
  useRegisterModal(isOpen, () => setIsOpen(false));

  return (
    <div className={` ${isHeaight ? 'h-0' : 'h-fit'} `}>
      <Drawer.Root dismissible={true} open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger className="h-auto">
          {children}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-screen rounded-t-[10px] h-[calc(100%-80px)] z-50">
          <div className=" w-full  overflow-auto p-4 rounded-t-[10px]">
              <Drawer.Handle />
              <SearchPage />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

export default DrawerSearch