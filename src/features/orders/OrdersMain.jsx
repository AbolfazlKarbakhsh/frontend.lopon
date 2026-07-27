import React, { useState } from 'react';
import OrdersHeader from './components/OrdersHeader';
import OrderTabs from './components/OrderTabs';
import OrderItemCard from './components/OrderItemCard';

const MOCK_ACTIVE_ORDERS = [
  {
    id: 'ord-1',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'approved',
  },
  {
    id: 'ord-2',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'approved',
  },
];

const MOCK_COMPLETED_ORDERS = [
  {
    id: 'ord-3',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'used',
  },
  {
    id: 'ord-4',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'used',
  },
  {
    id: 'ord-5',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'canceled',
  },
];

function OrdersMain() {
  const [activeTab, setActiveTab] = useState('active');

  const displayedOrders = activeTab === 'active' ? MOCK_ACTIVE_ORDERS : MOCK_COMPLETED_ORDERS;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 max-w-md md:max-w-xl mx-auto px-3 py-2">
      {/* Top Header */}
      <OrdersHeader title="سفارشات من" />

      {/* Tabs Pill Selector */}
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Orders List */}
      <div className="px-1 space-y-3 mt-2">
        {displayedOrders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersMain;
