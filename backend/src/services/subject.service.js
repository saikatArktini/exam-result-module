const prisma = require('../config/db');

const createSubject = async (subjectData) => {
  return await prisma.subject.create({
    data: subjectData,
  });
};

const getAllSubjects = async () => {
  return await prisma.subject.findMany({
    orderBy: { subjectName: 'asc' },
  });
};

const getSubjectById = async (id) => {
  return await prisma.subject.findUnique({
    where: { id },
  });
};

const updateSubject = async (id, updateData) => {
  const { id: _, createdAt, updatedAt, ...validData } = updateData;

  return await prisma.subject.update({
    where: { id },
    data: validData,
  });
};

const deleteSubject = async (id) => {
  return await prisma.subject.delete({
    where: { id },
  });
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
