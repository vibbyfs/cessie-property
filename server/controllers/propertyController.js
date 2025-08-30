const { Property } = require("../models");
const { Op } = require("sequelize");

class PropertyController {
    static async getAllProperties(req, res, next) {
        try {
            const { search, sort, CategoryId, province, city, district, subdistrict } = req.query;

            let whereClause = {};

            if (search) {
                whereClause.title = { [Op.iLike]: `%${search}%` };
            }

            if (CategoryId) {
                whereClause.CategoryId = CategoryId;
            }

            // Filter by location
            if (province) {
                whereClause.province = { [Op.iLike]: `%${province}%` };
            }

            if (city) {
                whereClause.city = { [Op.iLike]: `%${city}%` };
            }

            if (district) {
                whereClause.district = { [Op.iLike]: `%${district}%` };
            }

            if (subdistrict) {
                whereClause.subdistrict = { [Op.iLike]: `%${subdistrict}%` };
            }

            let queryOptions = {
                where: whereClause
            };

            if (sort) {
                const [field, order] = sort.split(":");
                queryOptions.order = [[field, order.toUpperCase()]];
            } else {
                queryOptions.order = [["price", "DESC"]];
            }

            const properties = await Property.findAll(queryOptions);
            res.status(200).json(properties);
        } catch (err) {
            next(err);
        }
    }

    static async getPropertyById(req, res, next) {
        try {
            const { id } = req.params;
            const property = await Property.findByPk(id);
            if (!property) {
                throw ({ name: "NotFound", message: "Property not found" });
            }

            res.status(200).json(property);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PropertyController;
