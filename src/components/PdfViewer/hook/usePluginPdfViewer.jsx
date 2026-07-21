//core
import { SpecialZoomLevel } from '@react-pdf-viewer/core';

// toolbar 
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

//search plugin 
import { searchPlugin } from '@react-pdf-viewer/search';



const usePluginPdfViewer = () => {
// toolBar Plugin 
const toolbarPluginInstance = toolbarPlugin();

// nav plugin
const pageNavigationPluginInstance = pageNavigationPlugin();


// zoom plugin for toolBar
const { zoomPluginInstance: { ZoomInButton, ZoomOutButton, ZoomPopover , zoomTo } } = toolbarPluginInstance;



  return { ZoomInButton, ZoomOutButton, ZoomPopover, zoomTo , toolbarPluginInstance  ,  pageNavigationPluginInstance
    , SpecialZoomLevel 
  }
}



export default usePluginPdfViewer;
