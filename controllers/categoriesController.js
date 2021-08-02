
const Category = require('../models/category');
const HttpError = require("../models/http-error");

const { validationResult } = require('express-validator');
const getCategories = async (req, res, next) => {
    let categories;
    try {
        categories = await Category.find();
    } catch (error) {
        return next(new HttpError('Fetching categories failed, please try agian.', 500))
    }


    res.status(200).json({ categories: (categories || []).map(u => u.toObject({ getters: true }))});
    
};

exports.getCategories = getCategories;