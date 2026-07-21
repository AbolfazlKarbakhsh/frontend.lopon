import { Viewer, TextDirection } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { usePdfPageNavigation } from '../hook/usePdfPageNavigation';
import RangeSlider from './RangeSlider';

function ReactPdfViewer({ pdfUrl, plugin, _id }) {
  const { toolbarPluginInstance, pageNavigationPluginInstance   } = plugin;
  const {
    currentPage,
    numPages,
    onDocumentLoad,
    onSliderChange,
    onPageChange,
  } = usePdfPageNavigation(_id, pageNavigationPluginInstance);
    

  return (
    <div>

      <div className="h-[calc(100vh-125px)]  shadow overflow-x-auto overflow-y-auto scrollbar">
        <Viewer
          fileUrl={pdfUrl}
          theme={{ direction: TextDirection.RightToLeft }}
          initialPage={currentPage - 1}
          onDocumentLoad={onDocumentLoad}
          onPageChange={onPageChange}
          plugins={[toolbarPluginInstance, pageNavigationPluginInstance]}
        />
      </div>
      <div className="bg-white w-full h-[66px] flex justify-center items-center border border-t-2 shadow-md">
        <RangeSlider numPages={numPages} currentPage={currentPage} onSliderChange={onSliderChange} />
      </div>
    </div>
  );
}

export default ReactPdfViewer;
