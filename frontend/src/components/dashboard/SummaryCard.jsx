import React from 'react';

const SummaryCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div className={`p-3 rounded-lg ${bgColorClass}`}>
        <Icon className={`h-6 w-6 ${colorClass}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;
