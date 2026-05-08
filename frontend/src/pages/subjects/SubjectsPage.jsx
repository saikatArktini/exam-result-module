import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubjects from '../../hooks/useSubjects';
import SubjectTable from '../../components/subjects/SubjectTable';
import DeleteSubjectModal from '../../components/subjects/DeleteSubjectModal';
import Loader from '../../components/common/Loader';
import { Search, BookPlus, RefreshCcw, AlertTriangle } from 'lucide-react';
import { deleteSubject } from '../../services/subject.service';

const SubjectsPage = () => {
  const { subjects, loading, error, refresh } = useSubjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Debugging log - this will help us see the data in the Console tab
  console.log('Subjects Data:', subjects);

  const filteredSubjects = Array.isArray(subjects) ? subjects.filter(subject => 
    subject?.subjectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject?.subjectCode?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleDeleteConfirm = async () => {
    if (!subjectToDelete) return;
    try {
      setIsDeleting(true);
      await deleteSubject(subjectToDelete.id);
      setSubjectToDelete(null);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete subject');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <Loader fullPage={false} />;

  return (
    <div className="p-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects Management</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your academic curriculum and marks</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={refresh}
            className="p-2.5 text-gray-500 hover:text-blue-600 bg-white border border-gray-200 rounded-lg transition-colors"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigate('/subjects/add')}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold"
          >
            <BookPlus className="h-5 w-5" /> Add Subject
          </button>
        </div>
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
            className="block w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filteredSubjects.length > 0 ? (
        <SubjectTable 
          subjects={filteredSubjects} 
          onEdit={(s) => navigate(`/subjects/edit/${s.id}`)}
          onDelete={(s) => setSubjectToDelete(s)}
        />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookPlus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No subjects found</h3>
          <p className="text-gray-500 mt-1">Start by adding your first academic subject.</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteSubjectModal 
        subject={subjectToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSubjectToDelete(null)}
      />
    </div>
  );
};

export default SubjectsPage;
