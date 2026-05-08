import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectForm from '../../components/subjects/SubjectForm';
import { createSubject } from '../../services/subject.service';
import { ChevronLeft } from 'lucide-react';

const AddSubjectPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createSubject(formData);
      navigate('/subjects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add subject. Code might already exist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 text-left">
      <button 
        onClick={() => navigate('/subjects')}
        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ChevronLeft className="h-5 w-5" /> Back to List
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Add New Subject</h1>
          <p className="text-gray-500 text-sm mt-1">Register a new subject in the curriculum.</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <SubjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default AddSubjectPage;
