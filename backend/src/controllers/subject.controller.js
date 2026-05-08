const subjectService = require('../services/subject.service');
const { validationResult } = require('express-validator');

const createSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({ status: 'success', data: subject });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ status: 'error', message: 'Subject code must be unique' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({ status: 'success', data: subjects });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    if (!subject) {
      return res.status(404).json({ status: 'error', message: 'Subject not found' });
    }
    res.status(200).json({ status: 'success', data: subject });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: subject });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ status: 'error', message: 'Subject code must be unique' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(200).json({ status: 'success', message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
