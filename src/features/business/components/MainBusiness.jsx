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
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@utils/cartCookie';

export default function MainBusiness() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dealIdFromQuery = searchParams.get('dealId');

  // Find if id or query parameter corresponds to a specific deal
  const activeDeal =
    DEALS.find((d) => d.id === dealIdFromQuery) ||
    DEALS.find((d) => d.id === id);

  // Find the business associated with the deal or directly from id parameter
  let business = activeDeal
    ? BUSINESSES.find((b) => b.id === activeDeal.businessId)
    : BUSINESSES.find((b) => b.id === id);

  if (!business) {
    business = BUSINESSES[0];
  }

  // Get all deals for this business
  const businessDeals = DEALS.filter((d) => d.businessId === business.id);

  // Map business deals to service list format, prioritizing the active deal at top
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
            category: deal.category,
            duration: '۶۰ دقیقه',
            imageUrl: deal.imageUrl,
          }))
      : [];

  const existingNames = new Set(mappedDeals.map((d) => d.name));
  const additionalServices = INITIAL_SERVICES.filter((s) => !existingNames.has(s.name));
  const currentServices = [...mappedDeals, ...additionalServices].slice(0, 8);

  // Cart state stored as array of item objects (persisted in Cookie)
  const [cartItems, setCartItems] = useState(() => getCart());
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [reviews, setReviews] = useState(() =>
    getReviewsByServiceCategory(business?.name, activeDeal?.serviceTitle, activeDeal?.category)
  );

  // Sync state from Cookie, scroll to top, and set tailored reviews when active business or deal changes
  useEffect(() => {
    setCartItems(getCart());
    setReviews(
      getReviewsByServiceCategory(business?.name, activeDeal?.serviceTitle, activeDeal?.category)
    );
    window.scrollTo(0, 0);
    const scrollables = document.querySelectorAll('.overflow-y-auto');
    scrollables.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [id, dealIdFromQuery, business?.name, activeDeal?.serviceTitle, activeDeal?.category]);

  // Gallery images for header slider
  const galleryImages = [
    activeDeal?.imageUrl,
    business?.coverUrl,
    business?.imageUrl,
    ...SALON_IMAGES,
  ].filter((img, idx, self) => Boolean(img) && self.indexOf(img) === idx);

  // Discount percentage to display
  const maxDiscount = activeDeal
    ? activeDeal.discountPercentage
    : businessDeals.length > 0
    ? Math.max(...businessDeals.map((d) => d.discountPercentage))
    : 60;

  // Convert cartItems array to cartMap { [serviceId]: quantity } for ServicesList UI
  const cartMap = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity || 1;
    return acc;
  }, {});

  // Cart operations using Cookie persistence
  const handleAddToCart = (serviceId) => {
    const service = currentServices.find((s) => s.id === serviceId);
    if (service) {
      const orig = service.originalPrice || 0;
      const disc = service.discountedPrice || 0;
      const pct = orig > 0 ? Math.round(((orig - disc) / orig) * 100) : 0;

      const itemToSave = {
        id: service.id,
        title: service.name,
        businessName: business?.name || 'مجموعه زیبایی رزا',
        originalPrice: formatPrice(orig),
        originalPriceVal: orig,
        discountedPrice: formatPrice(disc),
        discountedPriceVal: disc,
        discountPercent: pct,
        image: service.imageUrl || activeDeal?.imageUrl || business?.imageUrl || '/images/header.webp',
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
    const jDate = '۱۴۰۵/۰۳/' + today.getDate().toString().padStart(2, '0');
    const reviewWithId = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: jDate,
    };
    setReviews((prev) => [reviewWithId, ...prev]);
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

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto pb-16 bg-white">
      {/* Scrollable Container */}
      <div className="flex-1 flex flex-col">
        {/* Header Image */}
        <HeaderImageSlider
          image={activeDeal?.imageUrl || business?.coverUrl || business?.imageUrl}
          images={galleryImages}
        />

        {/* Salon Specific Brand Info Card overlapping the Header */}
        <SalonInfoCard
          name={business.name}
          address={business.address}
          rate={business.rating}
          discount={maxDiscount}
        />

        {/* Services modules with actual prices */}
        <ServicesList
          services={currentServices}
          cart={cartMap}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenTermsModal={() => setIsTermsOpen(true)}
        />

        {/* Guarantee Section */}
        <ConfidenceCard />

        {/* User Reviews */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
      </div>

      {/* Dynamic Sticky Bottom Checkout Footer: Only rendered if cart is NOT empty */}
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

