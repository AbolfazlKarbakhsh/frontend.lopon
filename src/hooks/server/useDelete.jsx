import { useMutation, useQueryClient } from "@tanstack/react-query"
import { httpsInterceptedService } from "@core/http-service"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

export const useDelete = (key, url, refKey) => {
    const toastIdRef = useRef(null);
    const client = useQueryClient();
    const [loading, setLoading] = useState(null);
    const { mutate, isPaused, isError } = useMutation({
        mutationKey: [key],
        mutationFn: async (id) => {
            setLoading(true);
            const res = await httpsInterceptedService.delete(`${url}/${id}`);
            return res
        }, onSuccess: (res) => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            setLoading(false);

            client.invalidateQueries({ queryKey: [refKey] });
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
    })

    useEffect(() => {
        if (isPaused) {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            setLoading(false);
            toast.error('لطفا از اتصال اینترنت خود مطمعن شوید !');
        }
    }, [isPaused]);


    return {mutate , loading ,isError}
}