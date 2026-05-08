import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Download } from 'lucide-react';
import * as resultService from '../../services/result.service';
import ResultSummary from '../../components/results/ResultSummary';
import Loader from '../../components/common/Loader';

const ResultDetailsPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await resultService.getResultById(id);
        const data = response.data || response;
        setResult(data);
      } catch (err) {
        alert('Result not found');
        navigate('/results');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="p-8 text-left bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8 print:hidden">
        <button 
          onClick={() => navigate('/results')}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <ChevronLeft className="h-5 w-5" /> All Results
        </button>
        
        <div className="flex gap-3">
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 bg-white border border-gray-200 rounded-xl transition-all shadow-sm">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 bg-white border border-gray-200 rounded-xl transition-all shadow-sm">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ResultSummary result={result} />
      
      <div className="text-center mt-8 text-gray-400 text-xs uppercase tracking-widest print:mt-12">
        Computer Generated Marksheet - Valid without signature
      </div>
    </div>
  );
};

export default ResultDetailsPage;
