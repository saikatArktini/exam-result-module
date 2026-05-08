import React from 'react';
import { Edit, Trash2, Code, BarChart } from 'lucide-react';

const SubjectTable = ({ subjects, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Code</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Marks</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {subjects.map((subject) => (
            <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">
                {subject.subjectName}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-400" />
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm text-gray-700 uppercase tracking-tight">
                    {subject.subjectCode}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart className="h-4 w-4 text-blue-500" />
                    <span className="font-bold">{subject.fullMarks}</span>
                    <span className="text-gray-400 text-xs">(Total)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-red-500">{subject.passMarks}</span>
                    <span>to Pass</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(subject)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Subject"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(subject)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Subject"
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

export default SubjectTable;
