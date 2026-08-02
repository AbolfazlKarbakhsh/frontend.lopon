import { useQuery } from "@tanstack/react-query";
import { getCarouselByOrder, mapCarouselResponse } from "../../../services/carousel.service";

/**
 * Hook to fetch carousel data by order ID.
 * @param {number|string} orderId - The carousel order number (e.g. 1, 2, 3)
 * @param {string} fallbackTitle - Fallback section title if not provided by API
 */
export const useGetCarousel = (orderId, fallbackTitle = "") => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["carousel", orderId],
    queryFn: async () => {
      const res = await getCarouselByOrder(orderId);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const mapped = mapCarouselResponse(data, fallbackTitle);

  return {
    title: mapped.title || fallbackTitle,
    deals: mapped.deals || [],
    isLoading,
    isError,
    refetch,
  };
};

export default useGetCarousel;
