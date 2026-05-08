import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteStudentModal = ({ student, onConfirm, onCancel, isDeleting }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Student?</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{student.name}</span> (Roll: {student.rollNumber})? 
            This action cannot be undone and will delete all associated exam results.
          </p>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-70 transition-all"
          >
            {isDeleting ? 'Deleting...' : 'Delete Student'}
          </button>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;
