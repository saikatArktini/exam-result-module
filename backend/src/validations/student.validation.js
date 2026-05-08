const { body } = require('express-validator');

const studentValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('rollNumber')
    .notEmpty()
    .withMessage('Roll number is required')
    .trim(),
  body('className')
    .notEmpty()
    .withMessage('Class name is required')
    .trim(),
  body('section')
    .notEmpty()
    .withMessage('Section is required')
    .trim(),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
];

module.exports = {
  studentValidation,
};
