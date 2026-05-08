const { body } = require('express-validator');

const resultValidation = [
  body('studentId')
    .isMongoId()
    .withMessage('Valid Student ID is required'),
  body('examName')
    .notEmpty()
    .withMessage('Exam name is required')
    .trim(),
  body('subjects')
    .isArray({ min: 1 })
    .withMessage('At least one subject mark entry is required'),
  body('subjects.*.subjectId')
    .isMongoId()
    .withMessage('Valid Subject ID is required'),
  body('subjects.*.marksObtained')
    .isFloat({ min: 0 })
    .withMessage('Marks obtained must be a positive number'),
];

module.exports = {
  resultValidation,
};
