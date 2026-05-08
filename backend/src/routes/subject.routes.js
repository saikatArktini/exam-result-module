const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');
const { subjectValidation } = require('../validations/subject.validation');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - subjectName
 *         - subjectCode
 *         - fullMarks
 *         - passMarks
 *       properties:
 *         id:
 *           type: string
 *           readOnly: true
 *           example: 60d5ecb8b39d1c0015f64f3d
 *         subjectName:
 *           type: string
 *         subjectCode:
 *           type: string
 *         fullMarks:
 *           type: number
 *         passMarks:
 *           type: number
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Subject created
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subjects
 */
router.route('/')
  .post(protect, subjectValidation, subjectController.createSubject)
  .get(protect, subjectController.getAllSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
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
 *         description: Subject details
 *       404:
 *         description: Subject not found
 *   put:
 *     summary: Update subject
 *     tags: [Subjects]
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
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Subject updated
 *   delete:
 *     summary: Delete subject
 *     tags: [Subjects]
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
 *         description: Subject deleted
 */
router.route('/:id')
  .get(protect, subjectController.getSubjectById)
  .put(protect, subjectValidation, subjectController.updateSubject)
  .delete(protect, subjectController.deleteSubject);

module.exports = router;
