const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

const determineStatus = (subjects) => {
  // A student passes only if they score at least the pass marks in every subject
  return subjects.every(s => s.marksObtained >= s.passMarks) ? 'Pass' : 'Fail';
};

module.exports = {
  calculateGrade,
  determineStatus,
};
