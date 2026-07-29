import React from 'react';
import PageHeader from '@components/global/headings/PageHeader';

function OrdersHeader({ title = 'سفارشات من' }) {
  return <PageHeader title={title} />;
}

export default OrdersHeader;

