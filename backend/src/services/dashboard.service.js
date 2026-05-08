const prisma = require('../config/db');

const getDashboardSummary = async () => {
  const [totalStudents, totalSubjects, totalResults, passedStudents, failedStudents] = await Promise.all([
    prisma.student.count(),
    prisma.subject.count(),
    prisma.result.count(),
    prisma.result.count({ where: { status: 'Pass' } }),
    prisma.result.count({ where: { status: 'Fail' } }),
  ]);

  return {
    totalStudents,
    totalSubjects,
    totalResults,
    passedStudents,
    failedStudents
  };
};

module.exports = {
  getDashboardSummary
};
