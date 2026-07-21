import { useState, useEffect, useRef } from 'react';

export function usePdfPageNavigation(_id, pageNavigationPluginInstance) {
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(localStorage.getItem(`pdfPage_${_id}`)) || 1;
  });

  const [numPages, setNumPages] = useState(0);
  const isSliderChanging = useRef(false);
  const isDocumentLoaded = useRef(false);

  const onDocumentLoad = (e) => {
    setNumPages(e.doc._pdfInfo.numPages);
    isDocumentLoaded.current = true;

    if (pageNavigationPluginInstance) {
      if (typeof pageNavigationPluginInstance.jumpToPage === 'function') {
        pageNavigationPluginInstance.jumpToPage(currentPage - 1);
      } else if (typeof pageNavigationPluginInstance.jump === 'function') {
        pageNavigationPluginInstance.jump(currentPage - 1);
      }
    }
  };

  const onSliderChange = (page) => {
    isSliderChanging.current = true;
    setCurrentPage(page);
  };

  useEffect(() => {
    localStorage.setItem(`pdfPage_${_id}`, currentPage);

    if (isSliderChanging.current && isDocumentLoaded.current && pageNavigationPluginInstance) {
      if (typeof pageNavigationPluginInstance.jumpToPage === 'function') {
        pageNavigationPluginInstance.jumpToPage(currentPage - 1);
      } else if (typeof pageNavigationPluginInstance.jump === 'function') {
        pageNavigationPluginInstance.jump(currentPage - 1);
      }
      isSliderChanging.current = false;
    }
  }, [currentPage, _id, pageNavigationPluginInstance]);

  const onPageChange = (e) => {
    if (!isSliderChanging.current) {
      setCurrentPage(e.currentPage + 1);
    }
  };

  return {
    currentPage,
    numPages,
    onDocumentLoad,
    onSliderChange,
    onPageChange,
  };
}
