import React from 'react';

function OrderTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-gray-100/80 p-1 rounded-full flex items-center justify-center gap-1 mx-4 my-3">
      <button
        onClick={() => setActiveTab('active')}
        className={`flex-1 py-2 text-xs font-kal-3 transition-all duration-200 rounded-full cursor-pointer text-center ${
          activeTab === 'active'
            ? 'bg-[#ff0055] text-white font-bold shadow-xs'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        قابل استفاده
      </button>

      <button
        onClick={() => setActiveTab('completed')}
        className={`flex-1 py-2 text-xs font-kal-3 transition-all duration-200 rounded-full cursor-pointer text-center ${
          activeTab === 'completed'
            ? 'bg-[#ff0055] text-white font-bold shadow-xs'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        تمام شده
      </button>
    </div>
  );
}

export default OrderTabs;
