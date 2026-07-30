import { useEffect } from "react"

//phone validation
const useZeroPhone = (setValue, watch, feild) => {

  useEffect(() => {
    if (watch(feild) != undefined && watch(feild) != null) {
      if (!watch(feild)?.startsWith('0') && watch(feild).trim() && watch(feild) != undefined) {
        setValue(feild, "0" + watch(feild));
      }
      if (!watch(feild).trim() && watch(feild) != undefined) {
        setValue(feild, "");
      }
    }

  }, [watch(feild) || 0]);
}

export default useZeroPhone