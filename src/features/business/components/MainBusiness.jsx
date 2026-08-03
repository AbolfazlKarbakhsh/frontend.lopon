import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import HeaderImageSlider from '@components/Items/HeaderImageSlider';
import SalonInfoCard from '@components/Items/SalonInfoCard';
import ServicesList from '@components/Items/ServicesList';
import ConfidenceCard from '@components/Items/ConfidenceCard';
import ReviewsSection from '@components/Items/ReviewsSection';
import StickyFooterBar from '@components/Items/StickyFooterBar';
import TermsModal from '@components/Items/TermsModal';
import ReceiptModal from '@components/Items/ReceiptModal';
import { INITIAL_SERVICES, getReviewsByServiceCategory, SALON_IMAGES } from '@core/data';
import { BUSINESSES, DEALS } from '@core/constants';
import { formatPrice } from '@utils/formatters';
import { useGetVendorDetails } from '@hooks/server/business/useGetVendorDetails';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@utils/cartCookie';

// Map day numbers: 1=شنبه, 2=یکشنبه, 3=دوشنبه, 4=سه‌شنبه, 5=چهارشنبه, 6=پنج‌شنبه, 7=جمعه
const DAY_NAMES = {
  1: 'شنبه',
  2: 'یکشنبه',
  3: 'دوشنبه',
  4: 'سه‌شنبه',
  5: 'چهارشنبه',
  6: 'پنج‌شنبه',
  7: 'جمعه',
};

// Helper to format working days (1=شنبه to 7=جمعه) into readable string
const formatWorkingHours = (workingDays) => {
  if (!workingDays || !Array.isArray(workingDays) || workingDays.length === 0) return null;

  const validDays = workingDays
    .map((w) => ({
      day: Number(w.day),
      from: w.from || '',
      to: w.to || '',
    }))
    .filter((w) => w.day >= 1 && w.day <= 7)
    .sort((a, b) => a.day - b.day);

  if (validDays.length === 0) return null;

  const groups = [];
  let currentGroup = null;

  for (const item of validDays) {
    if (
      currentGroup &&
      currentGroup.to === item.to &&
      currentGroup.from === item.from &&
      item.day === currentGroup.endDay + 1
    ) {
      currentGroup.endDay = item.day;
    } else {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = {
        startDay: item.day,
        endDay: item.day,
        from: item.from,
        to: item.to,
      };
    }
  }
  if (currentGroup) groups.push(currentGroup);

  return groups
    .map((g) => {
      const timeStr = g.from && g.to ? `(${g.from} الی ${g.to})` : '';
      if (g.startDay === g.endDay) {
        return `${DAY_NAMES[g.startDay]} ${timeStr}`.trim();
      } else {
        return `${DAY_NAMES[g.startDay]} تا ${DAY_NAMES[g.endDay]} ${timeStr}`.trim();
      }
    })
    .join(' ، ');
};

// Skeleton loader for Business page
const BusinessSkeleton = () => (
  <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto pb-16 bg-white animate-pulse">
    <div className="w-full h-80 bg-slate-200" />
    <div className="mx-4 -mt-[70px] bg-white rounded-2xl p-6 border border-slate-100 shadow-md space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto" />
    </div>
    <div className="mx-4 mt-6 bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
      <div className="h-5 bg-slate-200 rounded w-1/4" />
      <div className="h-12 bg-slate-100 rounded-xl w-full" />
      <div className="h-12 bg-slate-100 rounded-xl w-full" />
    </div>
  </div>
);

export default function MainBusiness() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dealIdFromQuery = searchParams.get('dealId');

  // Fetch dynamic vendor details from GET /api/v1/vendors/details/:id
  const {
    vendor,
    vendorServices,
    rating: apiRating,
    recentComments,
    isLoading: isVendorLoading,
  } = useGetVendorDetails(id);

  // Fallback deal or business from static data if API hasn't loaded or id matches deal
  const activeDeal =
    DEALS.find((d) => d.id === dealIdFromQuery) ||
    DEALS.find((d) => d.id === id);

  let fallbackBusiness = activeDeal
    ? BUSINESSES.find((b) => b.id === activeDeal.businessId)
    : BUSINESSES.find((b) => b.id === id);

  if (!fallbackBusiness) {
    fallbackBusiness = BUSINESSES[0];
  }

  // Cart state stored as array of item objects (persisted in Cookie)
  const [cartItems, setCartItems] = useState(() => getCart());
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  // Extract dynamic fields from vendor or fallback
  const rawCat = vendor?.category;
  const vendorCategory =
    typeof rawCat === 'object'
      ? rawCat?.title || 'خدمات زیبایی'
      : rawCat || activeDeal?.category || 'خدمات زیبایی';
  const vendorName = vendor?.title || fallbackBusiness?.name || 'مجموعه زیبایی لوپُن';
  const vendorPhone = vendor?.auxiliaryPhone || null;
  const rating = apiRating ?? fallbackBusiness?.rating ?? 4.8;

  // Format Address
  let formattedAddress = 'کرمان';
  if (vendor?.address) {
    if (typeof vendor.address === 'object') {
      const city = vendor.address.city || '';
      const street = vendor.address.address || '';
      formattedAddress = [city, street].filter(Boolean).join('، ');
    } else {
      formattedAddress = String(vendor.address);
    }
  } else if (fallbackBusiness?.address) {
    formattedAddress = fallbackBusiness.address;
  }

  // Format Working Hours (1=شنبه, 2=یکشنبه, ..., 6=پنج‌شنبه, 7=جمعه)
  const workingHoursFormatted = formatWorkingHours(vendor?.workingDays);

  // Gallery Images for Header Slider
  const apiImages = [
    ...(vendor?.imagesUrls || []),
    ...(vendor?.images || []),
  ].filter((img) => typeof img === 'string' && img.length > 0);

  const serviceImages = (vendorServices || [])
    .flatMap((s) => s.images || [])
    .filter((img) => typeof img === 'string' && img.length > 0);

  const galleryImages = [
    ...apiImages,
    ...serviceImages,
    activeDeal?.imageUrl,
    fallbackBusiness?.coverUrl,
    fallbackBusiness?.imageUrl,
    ...SALON_IMAGES,
  ].filter((img, idx, self) => Boolean(img) && self.indexOf(img) === idx);

  const headerMainImage = galleryImages[0] || '/images/header.webp';

  // Map Vendor Services from API or Fallback
  let currentServices = [];
  if (vendorServices && vendorServices.length > 0) {
    currentServices = vendorServices.map((s) => {
      const origPrice = Number(s.price || 0);
      const discPercent = Number(s.discountPercent || 0);
      const discPrice = Number(
        s.finalPrice !== undefined && s.finalPrice !== null
          ? s.finalPrice
          : origPrice > 0
          ? Math.round(origPrice * (1 - discPercent / 100))
          : 0
      );
      const calcPct =
        discPercent > 0
          ? discPercent
          : origPrice > 0 && discPrice > 0 && origPrice > discPrice
          ? Math.round(((origPrice - discPrice) / origPrice) * 100)
          : 0;

      const serviceTitle =
        s.title ||
        (typeof s.service === 'object' ? s.service?.title : s.service) ||
        'خدمت زیبایی';

      const serviceImgs = [
        ...(Array.isArray(s.imagesUrls) ? s.imagesUrls : []),
        ...(Array.isArray(s.images) ? s.images : []),
        ...(s.service?.imageUrl ? [s.service.imageUrl] : []),
      ].filter((img) => typeof img === 'string' && img.length > 0);

      const serviceImg = serviceImgs[0] || headerMainImage;

      const serviceCat =
        (typeof s.service === 'object' && typeof s.service?.category === 'object'
          ? s.service.category?.title
          : null) || vendorCategory;

      return {
        id: s._id || s.id || Math.random().toString(),
        vendorServiceId: s._id || s.id,
        name: serviceTitle,
        originalPrice: origPrice,
        discountedPrice: discPrice,
        discountPercent: calcPct,
        category: serviceCat,
        imageUrl: serviceImg,
        purchaseLimit: s.purchaseLimit,
      };
    });

    if (id) {
      currentServices.sort((a, b) => {
        if (a.id === id || a.vendorServiceId === id) return -1;
        if (b.id === id || b.vendorServiceId === id) return 1;
        return 0;
      });
    }
  } else {
    // Fallback services mapping
    const businessDeals = DEALS.filter((d) => d.businessId === fallbackBusiness.id);
    const mappedDeals =
      businessDeals.length > 0
        ? [...businessDeals]
            .sort((a, b) =>
              a.id === activeDeal?.id ? -1 : b.id === activeDeal?.id ? 1 : 0
            )
            .map((deal) => ({
              id: deal.id,
              name: deal.serviceTitle,
              originalPrice: deal.originalPrice,
              discountedPrice: deal.discountedPrice,
              discountPercent: deal.discountPercentage,
              category: deal.category,
              duration: '۶۰ دقیقه',
              imageUrl: deal.imageUrl,
            }))
        : [];

    const existingNames = new Set(mappedDeals.map((d) => d.name));
    const additionalServices = INITIAL_SERVICES.filter(
      (s) => !existingNames.has(s.name)
    );
    currentServices = [...mappedDeals, ...additionalServices].slice(0, 8);
  }

  // Calculate Max Discount
  const maxDiscount =
    currentServices.length > 0
      ? Math.max(...currentServices.map((s) => s.discountPercent || 0))
      : 0;

  // Process Reviews / Comments
  useEffect(() => {
    if (recentComments && recentComments.length > 0) {
      const mappedComments = recentComments.map((c) => ({
        id: c._id || Math.random().toString(),
        author: c.user || 'کاربر لوپُن',
        rating: c.rating || 5,
        text: c.comment || '',
        date: c.createdAt
          ? new Date(c.createdAt).toLocaleDateString('fa-IR')
          : '۱۴۰۵/۰۵/۱۲',
        tags: [vendorCategory],
      }));
      setUserReviews(mappedComments);
    } else {
      setUserReviews(
        getReviewsByServiceCategory(
          vendorName,
          activeDeal?.serviceTitle,
          vendorCategory
        )
      );
    }
  }, [vendorName, vendorCategory, recentComments, activeDeal?.serviceTitle]);

  // Scroll to top on navigation
  useEffect(() => {
    setCartItems(getCart());
    window.scrollTo(0, 0);
    const scrollables = document.querySelectorAll('.overflow-y-auto');
    scrollables.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [id, dealIdFromQuery]);

  // Convert cartItems array to cartMap { [serviceId]: quantity }
  const cartMap = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity || 1;
    return acc;
  }, {});

  // Cart operations
  const handleAddToCart = (serviceId) => {
    const service = currentServices.find((s) => s.id === serviceId);
    if (service) {
      const orig = service.originalPrice || 0;
      const disc = service.discountedPrice || 0;
      const pct = service.discountPercent || (orig > 0 ? Math.round(((orig - disc) / orig) * 100) : 0);

      const itemToSave = {
        id: service.id,
        title: service.name,
        businessName: vendorName,
        originalPrice: formatPrice(orig),
        originalPriceVal: orig,
        discountedPrice: formatPrice(disc),
        discountedPriceVal: disc,
        discountPercent: pct,
        image: service.imageUrl || headerMainImage,
        quantity: 1,
      };
      const updated = addToCart(itemToSave);
      setCartItems(updated);
    } else {
      const updated = addToCart({ id: serviceId, quantity: 1 });
      setCartItems(updated);
    }
  };

  const handleRemoveFromCart = (serviceId) => {
    const existingItem = cartItems.find((i) => i.id === serviceId);
    if (existingItem) {
      const currentQty = existingItem.quantity || 1;
      let updated;
      if (currentQty > 1) {
        updated = updateQuantity(serviceId, currentQty - 1);
      } else {
        updated = removeFromCart(serviceId);
      }
      setCartItems(updated);
    }
  };

  // Add a new user review
  const handleAddReview = (newReview) => {
    const today = new Date();
    const jDate = '۱۴۰۵/۰۵/' + today.getDate().toString().padStart(2, '0');
    const reviewWithId = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: jDate,
    };
    setUserReviews((prev) => [reviewWithId, ...prev]);
  };

  // Calculations for sticky bottom sheet
  const totals = cartItems.reduce(
    (acc, item) => {
      const qty = item.quantity || 1;
      const orig = item.originalPriceVal !== undefined ? item.originalPriceVal : 0;
      const disc = item.discountedPriceVal !== undefined ? item.discountedPriceVal : 0;
      acc.totalOriginal += orig * qty;
      acc.totalDiscounted += disc * qty;
      acc.totalQuantity += qty;
      return acc;
    },
    { totalOriginal: 0, totalDiscounted: 0, totalQuantity: 0 }
  );

  const resetCart = () => {
    clearCart();
    setCartItems([]);
  };

  const handleReceiptClose = () => {
    setIsReceiptOpen(false);
    resetCart();
  };

  if (isVendorLoading) {
    return <BusinessSkeleton />;
  }

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto pb-16 bg-white">
      {/* Scrollable Container */}
      <div className="flex-1 flex flex-col">
        {/* Header Image Slider */}
        <HeaderImageSlider
          image={headerMainImage}
          images={galleryImages}
        />

        {/* Salon Brand Info Card with dynamic name, address, rating, max discount, category, phone */}
        <SalonInfoCard
          name={vendorName}
          address={formattedAddress}
          rate={rating}
          discount={maxDiscount}
          category={vendorCategory}
          phone={vendorPhone}
        />

        {/* Dynamic Services list */}
        <ServicesList
          services={currentServices}
          cart={cartMap}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenTermsModal={() => setIsTermsOpen(true)}
        />

        {/* Guarantee Section */}
        <ConfidenceCard workingDays={vendor?.workingDays} />

        {/* User Reviews */}
        <ReviewsSection reviews={userReviews} onAddReview={handleAddReview} />
      </div>

      {/* Dynamic Sticky Bottom Checkout Footer */}
      {totals.totalQuantity > 0 && (
        <StickyFooterBar
          totalOriginal={totals.totalOriginal}
          totalDiscounted={totals.totalDiscounted}
          totalQuantity={totals.totalQuantity}
          onCheckout={() => setIsReceiptOpen(true)}
        />
      )}

      {/* Conditions Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Receipt / Invoice Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={handleReceiptClose}
        cart={cartMap}
        services={currentServices}
        totalDiscounted={totals.totalDiscounted}
      />
    </div>
  );
}


