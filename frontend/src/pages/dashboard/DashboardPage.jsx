import React from 'react';
import useDashboard from '../../hooks/useDashboard';
import SummaryCard from '../../components/dashboard/SummaryCard';
import Loader from '../../components/common/Loader';
import { Users, BookOpen, FileText, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';

const DashboardPage = () => {
  const { data, loading, error, refresh } = useDashboard();

  if (loading) return <Loader fullPage={false} />;

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <RefreshCcw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Students',
      value: data?.totalStudents || 0,
      icon: Users,
      colorClass: 'text-blue-600',
      bgColorClass: 'bg-blue-50'
    },
    {
      title: 'Total Subjects',
      value: data?.totalSubjects || 0,
      icon: BookOpen,
      colorClass: 'text-purple-600',
      bgColorClass: 'bg-purple-50'
    },
    {
      title: 'Results Generated',
      value: data?.totalResults || 0,
      icon: FileText,
      colorClass: 'text-amber-600',
      bgColorClass: 'bg-amber-50'
    },
    {
      title: 'Passed Students',
      value: data?.passedStudents || 0,
      icon: CheckCircle2,
      colorClass: 'text-green-600',
      bgColorClass: 'bg-green-50'
    },
    {
      title: 'Failed Students',
      value: data?.failedStudents || 0,
      icon: XCircle,
      colorClass: 'text-red-600',
      bgColorClass: 'bg-red-50'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time statistics of your exam system</p>
        </div>
        <button 
          onClick={refresh}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          title="Refresh Data"
        >
          <RefreshCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>

      {/* Placeholder for future sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
          Pass vs Fail Chart (Coming Soon)
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
          Recent Activities (Coming Soon)
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
