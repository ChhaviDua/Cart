
const Cart = require('../models/cart');
const HttpError = require("../models/http-error");

const { validationResult } = require('express-validator');
const getCartByUser = async (req, res, next) => {
    let carts;
    const userId = req.params.user;
    try {
        carts = await Cart.find({ name : userId});
    } catch (error) {
        return next(new HttpError('Fetching cart failed, please try again.', 500))
    }
    res.status(200).json({ cart: (carts).map(u => u.toObject({ getters: true })) });
};

const createCart = async (req, res, next) => {
    const { cart,name,product,quantity } = req.body;
    
    try {
//        const existingCart = await Cart.findOne({name : userId, cart:'1'});
//        if (existingCart) {
//         //   await Cart.updateMany({name:userId , cart : '1'}, {cart:'0'})
//        }
        const newCart = new Cart({
            cart:cart,
            name:name,
            product:product,
            quantity:quantity
        });
        await newCart.save();
        res.status(201).json({ message: "New Cart Created", cart: newCart.toObject({ getters: true }) });
    } catch (error) {
        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
    }
}

const alterProductQuantity = async (req, res, next) => {
    const {name,product,number } = req.body;
    try {
        const existingCart = await Cart.findOne({name : name,cart:'1',});
        if (existingCart) {
            await Cart.updateOne({name:name,product:product},{$inc :{quantity:number} })
        }
        res.status(201).json({ message: "Quantity Updated"});
    } catch (error) {
        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
    }
}

const moveToWishlist = async (req, res, next) => {
    const userId = req.params.user;
    try {
        await Cart.updateMany({name:userId,cart:'1'},{cart:'0'})
        
        res.status(201).json({ message: "Moved to wishlist"});
    } catch (error) {
        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
    }
}

//const placeOrder = async (req, res, next) => {
//    const {name,address } = req.body;
//    try {
//        await Cart.updateMany({name:userId,cart:'1'},{cart:'2',address:address})
//        
//        res.status(201).json({ message: "Order Placed"});
//    } catch (error) {
//        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
//    }
//}
exports.getCartByUser = getCartByUser;
exports.createCart = createCart;
exports.alterProductQuantity=alterProductQuantity;
exports.moveToWishlist=moveToWishlist;
exports.placeOrder=placeOrder;