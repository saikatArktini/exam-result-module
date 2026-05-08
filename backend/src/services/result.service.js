const prisma = require('../config/db');
const { calculateGrade, determineStatus } = require('../utils/calculateGrade');

const createResult = async (resultData) => {
  const { studentId, examName, subjects } = resultData;

  // 1. Verify student exists
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) throw new Error('Student not found');

  // 2. Fetch all subjects involved and validate marks
  const subjectDetails = await Promise.all(
    subjects.map(async (s) => {
      const subject = await prisma.subject.findUnique({ where: { id: s.subjectId } });
      if (!subject) throw new Error(`Subject with ID ${s.subjectId} not found`);
      
      if (s.marksObtained > subject.fullMarks) {
        throw new Error(`Marks for ${subject.subjectName} cannot exceed full marks (${subject.fullMarks})`);
      }

      return {
        subjectId: subject.id,
        subjectName: subject.subjectName,
        marksObtained: s.marksObtained,
        fullMarks: subject.fullMarks,
        passMarks: subject.passMarks
      };
    })
  );

  // 3. Calculate totals
  const totalMarks = subjectDetails.reduce((sum, s) => sum + s.marksObtained, 0);
  const totalFullMarks = subjectDetails.reduce((sum, s) => sum + s.fullMarks, 0);
  const percentage = (totalMarks / totalFullMarks) * 100;
  
  const grade = calculateGrade(percentage);
  const status = determineStatus(subjectDetails);

  // 4. Save to DB
  return await prisma.result.create({
    data: {
      studentId,
      examName,
      marks: subjectDetails,
      totalMarks,
      percentage,
      grade,
      status
    }
  });
};

const getAllResults = async () => {
  return await prisma.result.findMany({
    include: { student: true },
    orderBy: { createdAt: 'desc' }
  });
};

const getResultsByStudent = async (studentId) => {
  return await prisma.result.findMany({
    where: { studentId },
    include: { student: true },
    orderBy: { createdAt: 'desc' }
  });
};

const getResultById = async (id) => {
  return await prisma.result.findUnique({
    where: { id },
    include: { student: true }
  });
};

const updateResult = async (id, updateData) => {
  const { subjects, examName } = updateData;
  const { id: _, createdAt, updatedAt, ...validData } = updateData;

  // If subjects are provided, we need to recalculate totals
  if (subjects) {
    const totalMarks = subjects.reduce((sum, s) => sum + s.marksObtained, 0);
    const totalFullMarks = subjects.reduce((sum, s) => sum + s.fullMarks, 0);
    const percentage = (totalMarks / totalFullMarks) * 100;
    
    validData.totalMarks = totalMarks;
    validData.percentage = percentage;
    validData.grade = calculateGrade(percentage);
    validData.status = determineStatus(subjects);
  }

  return await prisma.result.update({
    where: { id },
    data: validData,
    include: { student: true }
  });
};

const deleteResult = async (id) => {
  return await prisma.result.delete({
    where: { id }
  });
};

module.exports = {
  createResult,
  getAllResults,
  getResultsByStudent,
  getResultById,
  updateResult,
  deleteResult
};
