import React, { useState } from 'react';
import OrdersHeader from './components/OrdersHeader';
import OrderTabs from './components/OrderTabs';
import OrderItemCard from './components/OrderItemCard';
import CompletedOrderItemCard from './components/CompletedOrderItemCard';

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

const MOCK_CANCELED_ORDERS = [
  {
    id: 'ord-5',
    title: 'خدمت ناخن آرایشگاه محدثه کرمانی',
    expiryDate: '۱۴۰۵/۰۴/۱',
    code: '۴۲۱۲۳۴',
    status: 'canceled',
  },
  {
    id: 'ord-6',
    title: 'خدمت کراتینه و زیبایی آرایشگاه کرمانیان',
    expiryDate: '۱۴۰۵/۰۳/۱۵',
    code: '۹۸۷۶۵۴',
    status: 'canceled',
  },
];

const MOCK_COMPLETED_ORDERS = [
  {
    id: 'ord-3',
    title: 'کاشت ناخن نانو لایه',
    salonName: 'آرایشگاه زیباکده کرمانیان',
    expiryDays: '۱۲ روز باقی مانده',
    orderCode: '۱۲۳۲۲۳۴',
    admissionCode: '۵۳۸۲۳۴۰۹۲',
    phone: '۰۳۴-۳۳۷۲۹۱۸۲',
    address: 'کرمان خیابان جهاد ۵۶ نبش کوچه',
    totalAmount: '۲۷۷,۵۰۰ تومان',
    discountProfit: '۲۷۷,۵۰۰ تومان',
    payableAmount: '۱۲,۵۰۰,۰۰۰ تومان',
    workingDays: [
      'یکشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'دوشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'سه‌شنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'چهارشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'پنجشنبه ۱۰:۰۰ الی ۲۱:۰۰',
    ],
    status: 'used',
  },
  {
    id: 'ord-4',
    title: 'کاشت ناخن نانو لایه',
    salonName: 'آرایشگاه زیباکده کرمانیان',
    expiryDays: '۱۲ روز باقی مانده',
    orderCode: '۱۲۳۲۲۳۴',
    admissionCode: '۵۳۸۲۳۴۰۹۲',
    phone: '۰۳۴-۳۳۷۲۹۱۸۲',
    address: 'کرمان خیابان جهاد ۵۶ نبش کوچه',
    totalAmount: '۲۷۷,۵۰۰ تومان',
    discountProfit: '۲۷۷,۵۰۰ تومان',
    payableAmount: '۱۲,۵۰۰,۰۰۰ تومان',
    workingDays: [
      'یکشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'دوشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'سه‌شنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'چهارشنبه ۱۰:۰۰ الی ۲۱:۰۰',
      'پنجشنبه ۱۰:۰۰ الی ۲۱:۰۰',
    ],
    status: 'used',
  },
];

function OrdersMain() {
  const [activeTab, setActiveTab] = useState('completed');

  const getDisplayedOrders = () => {
    if (activeTab === 'active') return MOCK_ACTIVE_ORDERS;
    if (activeTab === 'canceled') return MOCK_CANCELED_ORDERS;
    return MOCK_COMPLETED_ORDERS;
  };

  const displayedOrders = getDisplayedOrders();

  return (
    <div className="min-h-screen pb-24 max-w-md md:max-w-xl mx-auto px-3 py-2">
      {/* Top Header */}
      <OrdersHeader title="سفارشات من" />

      {/* Tabs Pill Selector */}
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Orders List */}
      <div className="px-1 space-y-3 mt-2">
        {activeTab === 'completed'
          ? displayedOrders.map((order) => (
              <CompletedOrderItemCard key={order.id} order={order} />
            ))
          : displayedOrders.map((order) => (
              <OrderItemCard key={order.id} order={order} />
            ))}
      </div>
    </div>
  );
}

export default OrdersMain;

