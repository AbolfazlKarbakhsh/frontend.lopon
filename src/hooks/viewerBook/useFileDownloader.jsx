import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useFileDownloader = (key, url, refKey, id) => {
  // const client = useQueryClient();
  const [loading, setLoading] = useState(null);
  const { mutate, isError, isSuccess, data } = useMutation({
    mutationKey: [key],
    mutationFn: async (data) => {
      setLoading(true);

      // اضافه کردن پارامتر timestamp برای جلوگیری از کش
      const timestamp = new Date().getTime();
      const urlWithTimestamp = `${url}${url.includes('?') ? '&' : '?'}_t=${timestamp}`;

      const res = await axios.get(urlWithTimestamp, {
        ...data,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          // برای اطمینان از عدم استفاده از کش
          "If-Modified-Since": "0",
          "If-None-Match": ""
        },
        responseType: 'blob'
      });
      return res;
    },
    onSuccess: (res) => {
      setLoading(false);
      // client.invalidateQueries({ queryKey: [refKey] });
      const blob = res.data;
      const newFile = new File([blob], `${id}.pdf`, { type: blob.type });
      return newFile;
    },
    onError: () => {
      setLoading(false);
    },
  });

  return [mutate, data, loading, isError, isSuccess];
};

export default useFileDownloader;