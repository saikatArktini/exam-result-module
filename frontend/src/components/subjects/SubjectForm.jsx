import React, { useState, useEffect } from 'react';
import { Book, Code, BarChart3, Loader2 } from 'lucide-react';

const SubjectForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    fullMarks: 100,
    passMarks: 33
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        subjectName: initialData.subjectName,
        subjectCode: initialData.subjectCode,
        fullMarks: initialData.fullMarks,
        passMarks: initialData.passMarks
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectName.trim()) newErrors.subjectName = 'Subject name is required';
    if (!formData.subjectCode.trim()) newErrors.subjectCode = 'Subject code is required';
    if (formData.fullMarks <= 0) newErrors.fullMarks = 'Full marks must be a positive number';
    if (formData.passMarks < 1) {
      newErrors.passMarks = 'Pass marks must be a positive number';
    } else if (formData.passMarks >= formData.fullMarks) {
      newErrors.passMarks = 'Pass marks must be less than full marks';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: (name === 'fullMarks' || name === 'passMarks') ? parseInt(value) || 0 : value 
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const getInputClasses = (fieldName) => `
    block w-full rounded-lg border py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm transition-all
    ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
  `;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (validate()) onSubmit(formData); }} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Subject Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Book className={`h-5 w-5 ${errors.subjectName ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="subjectName"
              required
              value={formData.subjectName}
              onChange={handleChange}
              className={getInputClasses('subjectName')}
              placeholder="e.g. Mathematics"
            />
          </div>
          {errors.subjectName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.subjectName}</p>}
        </div>

        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Subject Code</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Code className={`h-5 w-5 ${errors.subjectCode ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="subjectCode"
              required
              value={formData.subjectCode}
              onChange={handleChange}
              className={`${getInputClasses('subjectCode')} uppercase`}
              placeholder="e.g. MATH101"
            />
          </div>
          {errors.subjectCode && <p className="mt-1 text-xs text-red-500 font-medium">{errors.subjectCode}</p>}
        </div>

        {/* Full Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Full Marks</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BarChart3 className={`h-5 w-5 ${errors.fullMarks ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="number"
              name="fullMarks"
              required
              min="1"
              value={formData.fullMarks}
              onChange={handleChange}
              className={getInputClasses('fullMarks')}
              placeholder="e.g. 100"
            />
          </div>
          {errors.fullMarks && <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullMarks}</p>}
        </div>

        {/* Pass Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Passing Marks</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BarChart3 className={`h-5 w-5 ${errors.passMarks ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="number"
              name="passMarks"
              required
              min="0"
              value={formData.passMarks}
              onChange={handleChange}
              className={getInputClasses('passMarks')}
              placeholder="e.g. 33"
            />
          </div>
          {errors.passMarks && <p className="mt-1 text-xs text-red-500 font-medium">{errors.passMarks}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            initialData ? 'Update Subject' : 'Create Subject'
          )}
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
