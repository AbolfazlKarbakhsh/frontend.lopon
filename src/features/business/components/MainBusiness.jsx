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
import { INITIAL_SERVICES, INITIAL_REVIEWS, SALON_IMAGES } from '@core/data';
import { BUSINESSES, DEALS } from '@core/constants';

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
  const currentServices =
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
      : INITIAL_SERVICES;

  const [cart, setCart] = useState({});
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  // Reset cart and scroll to top when active business or deal changes
  useEffect(() => {
    setCart({});
    window.scrollTo(0, 0);
    const scrollables = document.querySelectorAll('.overflow-y-auto');
    scrollables.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [id, dealIdFromQuery]);

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

  // Cart operations
  const handleAddToCart = (serviceId) => {
    setCart((prev) => ({
      ...prev,
      [serviceId]: (prev[serviceId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (serviceId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (!newCart[serviceId]) return prev;
      if (newCart[serviceId] === 1) {
        delete newCart[serviceId];
      } else {
        newCart[serviceId]--;
      }
      return newCart;
    });
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
  const totals = currentServices.reduce(
    (acc, service) => {
      const qty = cart[service.id] || 0;
      acc.totalOriginal += service.originalPrice * qty;
      acc.totalDiscounted += service.discountedPrice * qty;
      acc.totalQuantity += qty;
      return acc;
    },
    { totalOriginal: 0, totalDiscounted: 0, totalQuantity: 0 }
  );

  const resetCart = () => {
    setCart({});
  };

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto pb-32 bg-white">
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
          serviceTitle={activeDeal?.serviceTitle}
          address={business.address}
          rate={business.rating}
          discount={maxDiscount}
          purchasesCount={120}
          time="ساعت ۱۲ ظهر تا ۴ عصر"
        />

        {/* Services modules with actual prices */}
        <ServicesList
          services={currentServices}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenTermsModal={() => setIsTermsOpen(true)}
        />

        {/* Guarantee Section */}
        <ConfidenceCard />

        {/* User Reviews */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
      </div>

      {/* Dynamic Sticky Bottom Checkout Footer */}
      <StickyFooterBar
        totalOriginal={totals.totalOriginal}
        totalDiscounted={totals.totalDiscounted}
        totalQuantity={totals.totalQuantity}
        onCheckout={() => setIsReceiptOpen(true)}
      />

      {/* Conditions Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Invoice Billing Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          setIsReceiptOpen(false);
          resetCart();
        }}
        cart={cart}
        services={currentServices}
        totalDiscounted={totals.totalDiscounted}
      />
    </div>
  );
}
