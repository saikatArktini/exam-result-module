const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { studentValidation } = require('../validations/student.validation');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - rollNumber
 *         - className
 *         - section
 *       properties:
 *         id:
 *           type: string
 *           readOnly: true
 *           description: Auto-generated MongoDB ID
 *           example: 60d5ecb8b39d1c0015f64f3d
 *         name:
 *           type: string
 *         rollNumber:
 *           type: string
 *           unique: true
 *         className:
 *           type: string
 *         section:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created
 *       400:
 *         description: Validation error or duplicate roll number
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 */
router.route('/')
  .post(protect, studentValidation, studentController.createStudent)
  .get(protect, studentController.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details
 *       404:
 *         description: Student not found
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted
 */
router.route('/:id')
  .get(protect, studentController.getStudentById)
  .put(protect, studentValidation, studentController.updateStudent)
  .delete(protect, studentController.deleteStudent);

module.exports = router;
