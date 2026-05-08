import React, { useState, useEffect } from 'react';
import { User, Hash, GraduationCap, School, Mail, Phone, Loader2 } from 'lucide-react';

const StudentForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    className: '',
    section: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Roll Number validation
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    // Class validation
    if (!formData.className.trim()) {
      newErrors.className = 'Class name is required';
    }

    // Section validation
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    // Email validation (Optional, but must be valid if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    // Phone validation (Optional, but must be valid if provided)
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const getInputClasses = (fieldName) => `
    block w-full rounded-lg border py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm transition-all
    ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={getInputClasses('name')}
              placeholder="e.g. John Doe"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>

        {/* Roll Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Roll Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Hash className={`h-5 w-5 ${errors.rollNumber ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="rollNumber"
              required
              value={formData.rollNumber}
              onChange={handleChange}
              className={getInputClasses('rollNumber')}
              placeholder="e.g. 2024001"
            />
          </div>
          {errors.rollNumber && <p className="mt-1 text-xs text-red-500 font-medium">{errors.rollNumber}</p>}
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Class / Grade</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <GraduationCap className={`h-5 w-5 ${errors.className ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="className"
              required
              value={formData.className}
              onChange={handleChange}
              className={getInputClasses('className')}
              placeholder="e.g. 10th"
            />
          </div>
          {errors.className && <p className="mt-1 text-xs text-red-500 font-medium">{errors.className}</p>}
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Section</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <School className={`h-5 w-5 ${errors.section ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="section"
              required
              value={formData.section}
              onChange={handleChange}
              className={getInputClasses('section')}
              placeholder="e.g. A"
            />
          </div>
          {errors.section && <p className="mt-1 text-xs text-red-500 font-medium">{errors.section}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Email Address (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={getInputClasses('email')}
              placeholder="e.g. john@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 italic">Phone Number (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone className={`h-5 w-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={getInputClasses('phone')}
              placeholder="e.g. 9876543210"
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            initialData ? 'Update Student' : 'Add Student'
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
