import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpsInterceptedService } from "@core/http-service";
import toast from "react-hot-toast";

export const usePost = (key, url, refKey, headers = "") => {
    const toastIdRef = useRef(null);
    const client = useQueryClient();
    const [loading, setLoading] = useState(null);
    const { mutate, isPaused, isError, error, isLoading, isSuccess, data  } = useMutation({
        mutationKey: [key],
        mutationFn: async (data) => {
            toastIdRef.current = toast.loading("در حال بارگیری", {
                duration: Infinity,
            });
            setLoading(true);
            
            const res = await httpsInterceptedService.put(`${url}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        },
        onSuccess: (res) => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            setLoading(false);
            
            client.invalidateQueries({ queryKey: [refKey] });
            client.invalidateQueries({ queryKey: "item_modal" });
            toast.success(res.data.message);

            return res;
        },
        onError: (error) => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            setLoading(false);
            toast.error(error.response?.data?.message || 'خطا در انجام عملیات !');
        },
    });

    useEffect(() => {
        if (isPaused) {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            setLoading(false);
            toast.error('لطفا از اتصال اینترنت خود مطمعن شوید !');
        }
    }, [isPaused]);

//  return [mutate, data, loading , isError, isSuccess];
    return {mutate, data, loading, isError, isSuccess};
};

