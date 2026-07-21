// components 
import ReactPdfViewer from './components/ReactPdfViewer';
import ReactWorker from './components/ReactWorker';
import ReactToolBar from './components/ReactToolBar';


// hook
import usePluginPdfViewer from './hook/usePluginPdfViewer';
// css lib 
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import './assets/index.css';
import { useEffect, useState } from 'react';


function ReactPdfProvider({ file, _id }) {
  const plugin = usePluginPdfViewer();
  const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);
  return (
    <ReactWorker plugin={plugin}>

      <ReactToolBar plugin={plugin} />

      {pdfUrl && <ReactPdfViewer pdfUrl={pdfUrl} plugin={plugin} _id={_id} />} 

    </ReactWorker>
  );
}

export default ReactPdfProvider