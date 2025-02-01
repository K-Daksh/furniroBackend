const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const furnitureController = require('../controllers/furniture.controller');


//validate and sanitize the data before creation
router.post(
    '/create',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('description').notEmpty().withMessage('Description is required'),
        body('image').notEmpty().withMessage('Image is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('color').notEmpty().withMessage('Color is required'),
        body('sizes').notEmpty().withMessage('Sizes are required'),
        body('brandName').notEmpty().withMessage('Brand name is required'),

    ],
    furnitureController.createFurniture
);

//get all furniture with pagination
router.get(
    '/all',
    [
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
    ],
    furnitureController.getAllFurniture
);

// Add filter options route BEFORE the ID route
router.get('/filter-options', furnitureController.getFilterOptions);

// Add featured products route
router.get('/featured', furnitureController.getFeaturedProducts);

// Get single furniture by ID should come after specific routes
router.get(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID format')
    ],
    furnitureController.getFurnitureById
);

// Update furniture by ID
router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID format'),
        // Add validation for update fields
    ],
    furnitureController.updateFurniture
);

// Delete furniture by ID
router.delete(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID format')
    ],
    furnitureController.deleteFurniture
);

module.exports = router;

