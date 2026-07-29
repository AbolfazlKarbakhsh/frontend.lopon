import React from 'react';
import PageHeader from '@components/global/headings/PageHeader';

function CartHeader({ title = 'سبد خرید' }) {
  return <PageHeader title={title} />;
}

export default CartHeader;

