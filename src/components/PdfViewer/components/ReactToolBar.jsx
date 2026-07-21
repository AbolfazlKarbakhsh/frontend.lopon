import { useEffect } from "react";

function ReactToolBar({plugin}) {
  const { ZoomInButton, ZoomOutButton, ZoomPopover  ,  zoomTo, SpecialZoomLevel  } = plugin;

    // effects
    useEffect(() => zoomTo(SpecialZoomLevel.PageFit), [zoomTo]);
  return (
    <div className='flex justify-center py-1 configViewer fixed top-2 z-50  left-1/2  transform -translate-x-1/2'>
      <ZoomOutButton />
      <ZoomPopover />
      <ZoomInButton />
    </div>
  )
}

export default ReactToolBar