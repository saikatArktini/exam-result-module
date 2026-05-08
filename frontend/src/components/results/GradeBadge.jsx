import React from 'react';

const GradeBadge = ({ grade }) => {
  const getGradeStyles = (g) => {
    switch (g) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'B':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'D':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'F':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getGradeStyles(grade)}`}>
      {grade}
    </span>
  );
};

export default GradeBadge;
