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
    const id = item.vendorServiceId || item.id || item._id || item.business_id || item.businessId;
    const businessId = item.vendorId || item.businessId || item.business_id || item.salonId || id;
    const originalPrice = Number(item.price ?? item.originalPrice ?? item.original_price ?? 0);
    const discountedPrice = Number(item.finalPrice ?? item.discountedPrice ?? item.discounted_price ?? item.off_price ?? 0);
    let discountPercent = item.discountPercent ?? item.discount_percent ?? item.discount;

    if (discountPercent === undefined && originalPrice > 0 && discountedPrice > 0 && originalPrice > discountedPrice) {
      discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    return {
      id: id || Math.random().toString(),
      vendorServiceId: item.vendorServiceId || id,
      vendorId: businessId,
      businessId,
      salonId: businessId,
      serviceTitle: item.serviceTitle || item.title || item.name || item.service_name || 'خدمات زیبایی',
      title: item.serviceTitle || item.title || item.name || 'خدمات زیبایی',
      vendorTitle: item.vendorTitle || item.businessName || item.salonName || item.business_name || 'مجموعه زیبایی',
      businessName: item.vendorTitle || item.businessName || item.salonName || item.business_name || 'مجموعه زیبایی',
      salonName: item.vendorTitle || item.salonName || item.businessName || 'مجموعه زیبایی',
      categoryTitle: item.categoryTitle || '',
      imageUrl: item.image || item.imageUrl || item.cover_image || item.banner || item.img || '/images/header.webp',
      image: item.image || item.imageUrl || item.cover_image || item.banner || item.img || '/images/header.webp',
      price: originalPrice,
      originalPrice,
      finalPrice: discountedPrice,
      discountedPrice,
      discountPercent: Number(discountPercent || 0),
      discountPercentage: Number(discountPercent || 0),
      rating: item.rating ?? item.score ?? 4.8,
      reviewsCount: item.reviewsCount || item.reviews_count || item.comments_count || 0,
      address: item.location || item.address || item.city || 'کرمان',
      location: item.location || item.address || item.city || 'کرمان',
      couponValidityDays: item.couponValidityDays,
    };
  });

  return { title, deals };
};
