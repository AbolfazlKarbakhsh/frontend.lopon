import { httpService } from "@core/http-service";

/**
 * Fetch carousel data by order ID.
 * GET /api/v1/carousels/order/{orderId}
 */
export const getCarouselByOrder = (orderId) => {
  return httpService.get(`carousels/order/${orderId}`);
};

/**
 * Maps API carousel response to standard carousel structure expected by the UI.
 */
export const mapCarouselResponse = (responseData, defaultTitle = "") => {
  if (!responseData) return { title: defaultTitle, deals: [] };

  const rawData = responseData.data || responseData;
  const title = rawData?.title || responseData?.title || defaultTitle;
  const rawItems = rawData?.items || rawData?.deals || (Array.isArray(rawData) ? rawData : []);

  const deals = rawItems.map((item) => {
    const id = item.id || item._id || item.business_id || item.businessId;
    const originalPrice = Number(item.originalPrice || item.original_price || item.price || 0);
    const discountedPrice = Number(item.discountedPrice || item.discounted_price || item.off_price || item.final_price || 0);
    let discountPercent = item.discountPercent || item.discount_percent || item.discount;

    if (!discountPercent && originalPrice > 0 && discountedPrice > 0 && originalPrice > discountedPrice) {
      discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    return {
      id: id || Math.random().toString(),
      businessId: item.businessId || item.business_id || item.salonId || id,
      salonId: item.salonId || item.business_id || item.businessId || id,
      serviceTitle: item.serviceTitle || item.title || item.name || item.service_name || 'خدمات زیبایی',
      title: item.title || item.name || item.serviceTitle || 'خدمات زیبایی',
      businessName: item.businessName || item.salonName || item.business_name || item.name || 'مجموعه زیبایی',
      salonName: item.salonName || item.business_name || item.businessName || 'مجموعه زیبایی',
      imageUrl: item.imageUrl || item.image || item.cover_image || item.banner || item.img || '/images/header.webp',
      image: item.image || item.imageUrl || item.cover_image || item.banner || item.img || '/images/header.webp',
      originalPrice,
      discountedPrice,
      discountPercentage: discountPercent || 0,
      discountPercent: discountPercent || 0,
      rating: item.rating || item.score || 4.8,
      reviewsCount: item.reviewsCount || item.reviews_count || item.comments_count || 0,
      address: item.address || item.location || item.city || 'کرمان',
      location: item.location || item.address || item.city || 'کرمان',
    };
  });

  return { title, deals };
};
