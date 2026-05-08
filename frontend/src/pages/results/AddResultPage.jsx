import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ResultForm from '../../components/results/ResultForm';
import { getAllStudents } from '../../services/student.service';
import { getAllSubjects } from '../../services/subject.service';
import { createResult } from '../../services/result.service';
import Loader from '../../components/common/Loader';

const AddResultPage = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studRes, subRes] = await Promise.all([
          getAllStudents(),
          getAllSubjects()
        ]);
        
        // Handle smart extraction
        const studData = Array.isArray(studRes) ? studRes : studRes.data;
        const subData = Array.isArray(subRes) ? subRes : subRes.data;

        setStudents(studData || []);
        setSubjects(subData || []);
      } catch (err) {
        alert('Failed to load students or subjects');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      await createResult(formData);
      navigate('/results');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create result. Ensure the student doesn\'t already have marks for this exam.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 text-left max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/results')}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors font-medium"
      >
        <ChevronLeft className="h-5 w-5" /> Back to Results
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Record New Results</h1>
        <p className="text-gray-500 mt-2">Enter marks and generate final grade sheets for students</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-50 border border-gray-100 p-8">
        <ResultForm 
          students={students} 
          subjects={subjects} 
          onSubmit={handleSubmit} 
          isSubmitting={submitting} 
        />
      </div>
    </div>
  );
};

export default AddResultPage;
