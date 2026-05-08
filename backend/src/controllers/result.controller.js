const resultService = require('../services/result.service');
const { validationResult } = require('express-validator');

const createResult = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    const result = await resultService.createResult(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        status: 'error', 
        message: 'A result for this student and exam already exists' 
      });
    }
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await resultService.getAllResults();
    res.status(200).json({ status: 'success', data: results });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getResultsByStudent = async (req, res) => {
  try {
    const results = await resultService.getResultsByStudent(req.params.studentId);
    res.status(200).json({ status: 'success', data: results });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getResultById = async (req, res) => {
  try {
    const result = await resultService.getResultById(req.params.id);
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Result not found' });
    }
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteResult = async (req, res) => {
  try {
    await resultService.deleteResult(req.params.id);
    res.status(200).json({ status: 'success', message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultsByStudent,
  getResultById,
  deleteResult,
};
