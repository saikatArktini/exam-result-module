const { body } = require('express-validator');

const subjectValidation = [
  body('subjectName')
    .notEmpty()
    .withMessage('Subject name is required')
    .trim(),
  body('subjectCode')
    .notEmpty()
    .withMessage('Subject code is required')
    .trim(),
  body('fullMarks')
    .isFloat({ min: 1 })
    .withMessage('Full marks must be a positive number'),
  body('passMarks')
    .isFloat({ min: 1 })
    .withMessage('Pass marks must be a positive number')
    .custom((value, { req }) => {
      if (parseFloat(value) >= parseFloat(req.body.fullMarks)) {
        throw new Error('Pass marks must be less than full marks');
      }
      return true;
    }),
];

module.exports = {
  subjectValidation,
};
