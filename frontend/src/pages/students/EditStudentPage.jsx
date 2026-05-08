import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../../components/students/StudentForm';
import Loader from '../../components/common/Loader';
import { getStudentById, updateStudent } from '../../services/student.service';
import { ChevronLeft } from 'lucide-react';

const EditStudentPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateStudent(id, formData);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader fullPage={false} />;

  return (
    <div className="p-8">
      <button 
        onClick={() => navigate('/students')}
        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ChevronLeft className="h-5 w-5" /> Back to List
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
          <p className="text-gray-500 text-sm mt-1">Update the information for {student?.name}.</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <StudentForm 
            initialData={student} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
