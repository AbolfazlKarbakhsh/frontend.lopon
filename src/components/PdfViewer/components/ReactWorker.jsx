import { Worker, LocalizationContext } from '@react-pdf-viewer/core';
import fa_IR from '../Locale/localeFa.json';
import { useState } from 'react';

function ReactWorker({ children }) {
  const [l10n] = useState(fa_IR);

  return (
    <Worker workerUrl={"http://localhost:3000/storage/react/pdf.worker.min.js"} >
    {/* <Worker workerUrl={"https://sa-app.ir/storage/react/pdf.worker.min.js"} > */}

      
      <LocalizationContext.Provider value={{ l10n, setL10n: () => {} }}>
        {children}
      </LocalizationContext.Provider>
    </Worker>
  );
}

export default ReactWorker;
