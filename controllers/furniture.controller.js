const express = require('express');
const { validationResult } = require('express-validator');
const furnitureService = require('../services/furniture.service');

module.exports.createFurniture = async (req, res) => {
    try {
        const furnitureData = req.body;
        const furniture = await furnitureService.createFurniture(furnitureData);
        res.status(201).json(furniture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllFurniture = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'default';

        // Safely parse JSON strings
        const filters = {
            priceRange: req.query.priceRange ? JSON.parse(req.query.priceRange) : null,
            brands: req.query.brands ? JSON.parse(req.query.brands) : [],
            categories: req.query.categories ? JSON.parse(req.query.categories) : [],
        };

        const result = await furnitureService.getAllFurniture(page, limit, sort, filters);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: "Error parsing filters"
        });
    }
};

module.exports.getFurnitureById = async (req, res) => {
    try {
        const furniture = await furnitureService.getFurnitureById(req.params.id);
        res.json(furniture);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.updateFurniture = async (req, res) => {
    try {
        const furniture = await furnitureService.updateFurniture(req.params.id, req.body);
        res.json(furniture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getFilterOptions = async (req, res) => {
    try {
        const options = await furnitureService.getFilterOptions();
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteFurniture = async (req, res) => {
    try {
        const furniture = await furnitureService.deleteFurniture(req.params.id);
        res.json({ message: 'Furniture deleted successfully', furniture });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.getFeaturedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const products = await furnitureService.getFeaturedProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};