import React, { useState } from 'react';
import { User, Book, ClipboardList, Plus, Trash2, Loader2, Calculator } from 'lucide-react';

const ResultForm = ({ students, subjects, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    examName: 'Final Exam 2024',
    subjects: [] // Array of { subjectId: '', marksObtained: 0 }
  });

  const [currentSubjectId, setCurrentSubjectId] = useState('');
  const [currentMarks, setCurrentMarks] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddSubject = () => {
    if (!currentSubjectId || currentMarks === '') {
      alert('Please select a subject and enter marks');
      return;
    }

    const selectedSubject = subjects.find(s => s.id === currentSubjectId);
    if (parseFloat(currentMarks) > selectedSubject.fullMarks) {
      alert(`Marks cannot exceed full marks (${selectedSubject.fullMarks})`);
      return;
    }

    // Check if subject already added
    if (formData.subjects.some(s => s.subjectId === currentSubjectId)) {
      alert('Subject already added to this exam');
      return;
    }

    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { 
        subjectId: currentSubjectId, 
        marksObtained: parseFloat(currentMarks),
        subjectName: selectedSubject.subjectName, // for display
        fullMarks: selectedSubject.fullMarks // for display
      }]
    }));

    setCurrentSubjectId('');
    setCurrentMarks('');
  };

  const removeSubject = (id) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.subjectId !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId) {
      setErrors({ studentId: 'Please select a student' });
      return;
    }
    if (formData.subjects.length === 0) {
      alert('Please add at least one subject');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 italic">Select Student</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="studentId"
              required
              value={formData.studentId}
              onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Choose a student...</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} (Roll: {s.rollNumber})</option>
              ))}
            </select>
          </div>
          {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
        </div>

        {/* Exam Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 italic">Exam Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <ClipboardList className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={formData.examName}
              onChange={(e) => setFormData(prev => ({ ...prev, examName: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. Annual Exam"
            />
          </div>
        </div>
      </div>

      {/* Marks Entry Section */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-indigo-600" /> Enter Subject Marks
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={currentSubjectId}
            onChange={(e) => setCurrentSubjectId(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Select Subject...</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.subjectName}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Marks Obtained"
            value={currentMarks}
            onChange={(e) => setCurrentMarks(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={handleAddSubject}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-all font-semibold text-sm shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add to List
          </button>
        </div>

        {/* Selected Subjects List */}
        {formData.subjects.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Subject</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Obtained</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formData.subjects.map(s => (
                  <tr key={s.subjectId}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.subjectName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.marksObtained} / {s.fullMarks}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        type="button"
                        onClick={() => removeSubject(s.subjectId)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-10 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Generate Final Scorecard'
          )}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
