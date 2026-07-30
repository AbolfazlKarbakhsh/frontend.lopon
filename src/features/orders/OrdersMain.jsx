import React, { useState } from 'react';
import OrderItemCard from './components/OrderItemCard';
import CompletedOrderItemCard from './components/CompletedOrderItemCard';
import EmptyState from '@components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

const MOCK_ACTIVE_ORDERS = [];
const MOCK_CANCELED_ORDERS = [];
const MOCK_COMPLETED_ORDERS = [];

function OrdersMain() {
  const [activeTab] = useState('completed');
  const navigate = useNavigate();

  const getDisplayedOrders = () => {
    if (activeTab === 'active') return MOCK_ACTIVE_ORDERS;
    if (activeTab === 'canceled') return MOCK_CANCELED_ORDERS;
    return MOCK_COMPLETED_ORDERS;
  };

  const displayedOrders = getDisplayedOrders();

  return (
    <div className="w-full max-w-md md:max-w-xl mx-auto px-3 py-2 flex flex-col">

      {displayedOrders.length === 0 ? (
        <EmptyState
          type="orders"
          badgeText="تاریخچه سفارشات"
          title="هنوز سفارشی ثبت نشده است"
          description="پس از خرید هر کد تخفیف یا کوپن زیبایی، جزئیات سفارش و کدهای اختصاصی شما در این بخش قابل دسترسی خواهد بود."
          actionLabel="جستجوی خدمات و مجموعه‌ها"
          onAction={() => navigate('/')}
        />
      ) : (
        /* Orders List if present */
        <div className="px-1 space-y-3 mt-4">
          {activeTab === 'completed'
            ? displayedOrders.map((order) => (
                <CompletedOrderItemCard key={order.id} order={order} />
              ))
            : displayedOrders.map((order) => (
                <OrderItemCard key={order.id} order={order} />
              ))}
        </div>
      )}
    </div>
  );
}

export default OrdersMain;

