import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as resultService from '../../services/result.service';
import ResultTable from '../../components/results/ResultTable';
import Loader from '../../components/common/Loader';
import { Search, PlusCircle, FileSpreadsheet, RefreshCcw, AlertTriangle } from 'lucide-react';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await resultService.getAllResults();
      const data = Array.isArray(response) ? response : response.data;
      setResults(data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (result) => {
    if (window.confirm(`Are you sure you want to delete the result for ${result.student.name}?`)) {
      try {
        await resultService.deleteResult(result.id);
        fetchResults();
      } catch (err) {
        alert('Failed to delete result');
      }
    }
  };

  // Extract unique exams and classes for the filter dropdowns
  const uniqueExams = [...new Set(results.map(r => r.examName))].filter(Boolean);
  const uniqueClasses = [...new Set(results.map(r => r.student?.className))].filter(Boolean);

  const filteredResults = results.filter(r => {
    const matchesSearch = 
      r.student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.student?.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExam = examFilter === '' || r.examName === examFilter;
    const matchesClass = classFilter === '' || r.student?.className === classFilter;

    return matchesSearch && matchesExam && matchesClass;
  });

  if (loading) return <Loader fullPage={false} />;

  return (
    <div className="p-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all student performance records</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchResults}
            className="p-2.5 text-gray-500 hover:text-blue-600 bg-white border border-gray-200 rounded-lg transition-colors"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigate('/results/add')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all font-semibold"
          >
            <PlusCircle className="h-5 w-5" /> Add New Result
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Toolbar / Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search student or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[160px]"
          >
            <option value="">All Exams</option>
            {uniqueExams.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map(cls => (
              <option key={cls} value={cls}>Class {cls}</option>
            ))}
          </select>

          {(examFilter || classFilter || searchQuery) && (
            <button 
              onClick={() => { setExamFilter(''); setClassFilter(''); setSearchQuery(''); }}
              className="text-indigo-600 text-sm font-bold hover:underline px-2"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <ResultTable 
          results={filteredResults} 
          onView={(r) => navigate(`/results/${r.id}`)}
          onDelete={handleDelete}
        />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSpreadsheet className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No results found</h3>
          <p className="text-gray-500 mt-1">Start by recording marks for a student.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
