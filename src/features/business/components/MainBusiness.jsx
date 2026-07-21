import  { useState } from 'react';
import HeaderImageSlider from '@components/Items/HeaderImageSlider';
import SalonInfoCard from '@components/Items/SalonInfoCard';
import ServicesList from '@components/Items/ServicesList';
import ConfidenceCard from '@components/Items/ConfidenceCard';
import ReviewsSection from '@components/Items/ReviewsSection';
import StickyFooterBar from '@components/Items/StickyFooterBar';
import TermsModal from '@components/Items/TermsModal';
import ReceiptModal from '@components/Items/ReceiptModal';
import { INITIAL_SERVICES, INITIAL_REVIEWS, SALON_IMAGES } from '@core/data';

export default function MainBusiness() {
  const [services] = useState(INITIAL_SERVICES);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [cart, setCart] = useState({});
  
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (!newCart[id]) return prev;
      if (newCart[id] === 1) {
        delete newCart[id];
      } else {
        newCart[id]--;
      }
      return newCart;
    });
  };

  // Add a new user review
  const handleAddReview = (newReview) => {
    const today = new Date();
    const jDate = '۱۴۰۵/۰۳/' + today.getDate().toString().padStart(2, '0'); // Realistic Jalali date simulation
    const reviewWithId = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: jDate,
    };
    setReviews((prev) => [reviewWithId, ...prev]);
  };

  // Calculations for sticky bottom sheet
  const totals = services.reduce(
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
      <div>
        
        {/* Scrollable Container */}
        <div className="flex-1 flex flex-col">
          
          {/* Header Image Slider */}
          <HeaderImageSlider images={SALON_IMAGES} />

          {/* Salon Specific Brand Info Card overlapping the Header */}
          <SalonInfoCard />

          {/* Services modules with actual prices */}
          <ServicesList
            services={services}
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
          services={services}
          totalDiscounted={totals.totalDiscounted}
        />
        
      </div>
  );
}
