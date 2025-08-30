const { Category } = require('../models');

class CategoryController {
    static async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController;
