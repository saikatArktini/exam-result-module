const prisma = require('../config/db');

const createStudent = async (studentData) => {
  return await prisma.student.create({
    data: studentData,
  });
};

const getAllStudents = async () => {
  return await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

const getStudentById = async (id) => {
  return await prisma.student.findUnique({
    where: { id },
  });
};

const updateStudent = async (id, updateData) => {
  // Strip out id and timestamps if they exist in the payload
  const { id: _, createdAt, updatedAt, ...validData } = updateData;

  return await prisma.student.update({
    where: { id },
    data: validData,
  });
};

const deleteStudent = async (id) => {
  return await prisma.student.delete({
    where: { id },
  });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
