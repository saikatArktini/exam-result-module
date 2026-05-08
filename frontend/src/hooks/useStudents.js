import { useState, useEffect } from 'react';
import * as studentService from '../services/student.service';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents();
      // Safety check: handle both { data: [] } and direct [] responses
      const studentData = Array.isArray(response.data) ? response.data : response.data.data;
      setStudents(studentData || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, refresh: fetchStudents };
};

export default useStudents;
