import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import { getFileById, getFiles, updateColumns, uploadFile } from '../controllers/file.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload and preview
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a CSV or Excel file
 *     description: Uploads a file and returns detected columns and preview rows.
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file format
 */
router.post('/upload', upload.single('file'), uploadFile);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get uploaded files with pagination and sorting
 *     tags: [Files]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip (for pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           default: uploadDate
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: -1
 *         description: Sort order (1 = ascending, -1 = descending)
 *     responses:
 *       200:
 *         description: List of uploaded files with total count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       originalName:
 *                         type: string
 *                       size:
 *                         type: number
 *                       uploadDate:
 *                         type: string
 *                         format: date-time
 *                 totalRecords:
 *                   type: integer
 */
router.get('/', getFiles);

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Get file details
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File details
 *       404:
 *         description: File not found
 */
router.get('/:id', getFileById);

/**
 * @swagger
 * /api/files/{id}/columns:
 *   put:
 *     summary: Update column mapping
 *     tags: [Files]
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
 *             type: object
 *             properties:
 *               columns:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [string, number, date]
 *     responses:
 *       204:
 *         description: Columns updated
 */
router.put('/:id/columns', updateColumns);

export default router;
