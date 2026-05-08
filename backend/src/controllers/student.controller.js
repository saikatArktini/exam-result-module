const studentService = require('../services/student.service');
const { validationResult } = require('express-validator');

const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ status: 'success', data: student });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ status: 'error', message: 'Roll number must be unique' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({ status: 'success', data: students });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ status: 'error', message: 'Student not found' });
    }
    res.status(200).json({ status: 'success', data: student });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: student });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ status: 'error', message: 'Roll number must be unique' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(200).json({ status: 'success', message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
