import { useQuery } from "@tanstack/react-query";
import { businessService } from "../../../services/business.service";

/**
 * Hook to fetch vendor details by vendor ID.
 * GET /api/v1/vendors/details/{id}
 */
export const useGetVendorDetails = (vendorId) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["vendorDetails", vendorId],
    queryFn: async () => {
      if (!vendorId) return null;
      const res = await businessService.getVendorDetails(vendorId);
      return res.data;
    },
    enabled: Boolean(vendorId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const rawData = data?.data || data;

  const vendor = rawData?.vendor || null;
  const vendorServices = rawData?.vendorServices || [];
  const rating = rawData?.rating ?? vendor?.rating ?? 4.8;
  const commentsCount = rawData?.commentsCount ?? 0;
  const recentComments = rawData?.recentComments || [];

  return {
    data: rawData,
    vendor,
    vendorServices,
    rating,
    commentsCount,
    recentComments,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetVendorDetails;
