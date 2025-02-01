const Furniture = require('../models/furniture.model');

module.exports.createFurniture = async (furnitureData) => {
    try {
        // Ensure arrays are properly handled
        const furniture = new Furniture({
            ...furnitureData,
            color: Array.isArray(furnitureData.color) ? furnitureData.color : [furnitureData.color],
            sizes: Array.isArray(furnitureData.sizes) ? furnitureData.sizes : [furnitureData.sizes],
            additionalImages: furnitureData.additionalImages || []
        });
        await furniture.save();
        return furniture;
    } catch (error) {
        throw new Error(`Error creating furniture: ${error.message}`);
    }
};

module.exports.getAllFurniture = async (page, limit, sort, filters = {}) => {
    try {
        const skip = (page - 1) * limit;
        const sortingQuery = {
            name_asc: { name: 1 },
            name_desc: { name: -1 },
            price_low: { price: 1 },
            price_high: { price: -1 },
            brand_ascending: { brandName: 1 },
            brand_descending: { brandName: -1 }
        };

        let filtersOptions = {};

        // Only apply filters if they exist and have values
        if (filters) {
            if (filters.priceRange && (filters.priceRange.min !== undefined || filters.priceRange.max !== undefined)) {
                filtersOptions.price = {};
                if (filters.priceRange.min !== undefined) {
                    filtersOptions.price.$gte = Number(filters.priceRange.min);
                }
                if (filters.priceRange.max !== undefined) {
                    filtersOptions.price.$lte = Number(filters.priceRange.max);
                }
            }

            if (filters.brands?.length > 0) {
                filtersOptions.brandName = { $in: filters.brands };
            }

            if (filters.categories?.length > 0) {
                filtersOptions.category = { $in: filters.categories };
            }

            // Color filter (if added in frontend)
            if (filters.colors?.length > 0) {
                filtersOptions.color = { $in: filters.colors };
            }

            // Size filter (if added in frontend)
            if (filters.sizes?.length > 0) {
                filtersOptions.sizes = { $in: filters.sizes };
            }
        }

        const furniture = await Furniture.find(filtersOptions)
            .sort(sortingQuery[sort] || {})
            .skip(skip)
            .limit(limit);

        const total = await Furniture.countDocuments(filtersOptions);

        return {
            furniture,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    } catch (error) {
        throw new Error(`Error fetching furniture: ${error.message}`);
    }
};

module.exports.getFurnitureById = async (id) => {
    try {
        const furniture = await Furniture.findById(id);
        if (!furniture) {
            throw new Error('Furniture not found');
        }
        return furniture;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Add new method for updating furniture
module.exports.updateFurniture = async (id, updateData) => {
    try {
        const furniture = await Furniture.findByIdAndUpdate(
            id,
            {
                ...updateData,
                color: Array.isArray(updateData.color) ? updateData.color : [updateData.color],
                sizes: Array.isArray(updateData.sizes) ? updateData.sizes : [updateData.sizes]
            },
            { new: true }
        );
        if (!furniture) {
            throw new Error('Furniture not found');
        }
        return furniture;
    } catch (error) {
        throw new Error(`Error updating furniture: ${error.message}`);
    }
};

// Add new method to get unique brands and categories
module.exports.getFilterOptions = async () => {
    try {
        const brands = await Furniture.distinct('brandName');
        const categories = await Furniture.distinct('category');
        return {
            brands,
            categories
        };
    } catch (error) {
        throw new Error(`Error fetching filter options: ${error.message}`);
    }
};

// Add new method for deleting furniture
module.exports.deleteFurniture = async (id) => {
    try {
        const furniture = await Furniture.findByIdAndDelete(id);
        if (!furniture) {
            throw new Error('Furniture not found');
        }
        return furniture;
    } catch (error) {
        throw new Error(`Error deleting furniture: ${error.message}`);
    }
};

// Add new method to get featured products
module.exports.getFeaturedProducts = async (limit = 8) => {
    try {
        // Get random products with a limit
        const products = await Furniture.aggregate([
            { $sample: { size: limit } },
            { $limit: limit }
        ]);
        return products;
    } catch (error) {
        throw new Error(`Error fetching featured products: ${error.message}`);
    }
};
