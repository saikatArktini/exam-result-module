import React from 'react';
import { Eye, Trash2, User, FileText, TrendingUp } from 'lucide-react';
import GradeBadge from './GradeBadge';

const ResultTable = ({ results, onView, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Exam Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Marks & %</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {results.map((result) => (
            <tr key={result.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {result.student?.name?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{result.student?.name}</div>
                    <div className="text-xs text-gray-500">
                      Roll: {result.student?.rollNumber} • Class: {result.student?.className}-{result.student?.section}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4 text-gray-400" />
                  {result.examName}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-gray-900">{result.totalMarks} Marks</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    {result.percentage.toFixed(2)}%
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <GradeBadge grade={result.grade} />
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  result.status === 'PASS' 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  {result.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onView(result)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Scorecard"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(result)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Result"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
