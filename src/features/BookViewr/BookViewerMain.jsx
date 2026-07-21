import useIndexDb from "@hooks/viewerBook/useIndexDb"
import { useParams } from 'react-router';
import ReactPdfProvider from '@components/PdfViewer/ReactPdfProvider';
import { useEffect } from "react";

function BookViewerMain() {

  const { id } = useParams();

  // index db
  const { hasFile } = useIndexDb(id);

  useEffect(() => {
    if (hasFile?.file) {
      // if(Android != undefined) Android?.setOrientation();
    }
  }, [hasFile]);

  return (
    <ReactPdfProvider file={hasFile?.file} _id={id} />
  )

}

export default BookViewerMain