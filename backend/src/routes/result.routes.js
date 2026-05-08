const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.controller');
const { resultValidation } = require('../validations/result.validation');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     ResultInput:
 *       type: object
 *       required:
 *         - studentId
 *         - examName
 *         - subjects
 *       properties:
 *         studentId:
 *           type: string
 *           example: 60d5ecb8b39d1c0015f64f3d
 *         examName:
 *           type: string
 *           example: "Final Term 2024"
 *         subjects:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               subjectId:
 *                 type: string
 *               marksObtained:
 *                 type: number
 *     Result:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         studentId:
 *           type: string
 *         examName:
 *           type: string
 *         totalMarks:
 *           type: number
 *         percentage:
 *           type: number
 *         grade:
 *           type: string
 *         status:
 *           type: string
 *         marks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *               marksObtained:
 *                 type: number
 *               fullMarks:
 *                 type: number
 *               passMarks:
 *                 type: number
 */

/**
 * @swagger
 * /api/results:
 *   post:
 *     summary: Enter marks and generate result
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResultInput'
 *     responses:
 *       201:
 *         description: Result generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *   get:
 *     summary: Get all results
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Result'
 */
router.route('/')
  .post(protect, resultValidation, resultController.createResult)
  .get(protect, resultController.getAllResults);

/**
 * @swagger
 * /api/results/student/{studentId}:
 *   get:
 *     summary: Get all results for a student
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Result'
 */
router.get('/student/:studentId', protect, resultController.getResultsByStudent);

/**
 * @swagger
 * /api/results/{id}:
 *   get:
 *     summary: Get detailed result by ID
 *     tags: [Results]
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
 *         description: Detailed result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *   delete:
 *     summary: Delete a result
 *     tags: [Results]
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
 *         description: Result deleted successfully
 */
router.route('/:id')
  .get(protect, resultController.getResultById)
  .delete(protect, resultController.deleteResult);

module.exports = router;
