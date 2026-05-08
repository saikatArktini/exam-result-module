import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStudents from '../../hooks/useStudents';
import StudentTable from '../../components/students/StudentTable';
import DeleteStudentModal from '../../components/students/DeleteStudentModal';
import Loader from '../../components/common/Loader';
import { Plus, Search, UserPlus, AlertTriangle } from 'lucide-react';
import { deleteStudent } from '../../services/student.service';

const StudentsPage = () => {
  const { students, loading, error, refresh } = useStudents();
  const [searchQuery, setSearchQuery] = useState('');
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Debugging log
  console.log('Students Data:', students);

  const filteredStudents = Array.isArray(students) ? students.filter(student => 
    student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student?.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    try {
      setIsDeleting(true);
      await deleteStudent(studentToDelete.id);
      setStudentToDelete(null);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <Loader fullPage={false} />;

  return (
    <div className="p-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all registered students</p>
        </div>
        <button 
          onClick={() => navigate('/students/add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold"
        >
          <UserPlus className="h-5 w-5" /> Add Student
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filteredStudents.length > 0 ? (
        <StudentTable 
          students={filteredStudents} 
          onEdit={(s) => navigate(`/students/edit/${s.id}`)}
          onDelete={(s) => setStudentToDelete(s)}
        />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No students found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or add a new student.</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteStudentModal 
        student={studentToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setStudentToDelete(null)}
      />
    </div>
  );
};

export default StudentsPage;
