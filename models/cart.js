const { json } = require('body-parser');
const mongoose = require('mongoose');
const Cart = require('./cart');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    //id: { type: String},
    name:{type: String,required : true},
    cart: {type: String,required : true},
    product: {type:String,required : true},
    quantity : {type:Number,required : true}
});
module.exports = mongoose.model('carts', cartSchema,'wishcarts');