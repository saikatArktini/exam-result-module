import { useState, useEffect } from 'react';
import * as subjectService from '../services/subject.service';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await subjectService.getAllSubjects();
      // Safety check: handle both { data: [] } and direct [] responses
      const subjectData = Array.isArray(response.data) ? response.data : response.data.data;
      setSubjects(subjectData || []); 
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return { subjects, loading, error, refresh: fetchSubjects };
};

export default useSubjects;
