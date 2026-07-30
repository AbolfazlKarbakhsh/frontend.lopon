import { useEffect } from "react";

const useLog = (log) => {
  useEffect(() => {
    if(log) console.log(log);
  }, [log]);
};



export default useLog;
