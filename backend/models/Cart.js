const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'User ID is Required']
	}, cartItems:[
		{
			productId: {
				type: String,
				required: [true, 'Cart ID is Required']
			},
			quantity: {
				type: Number,
				required: [true, 'Quantity is Required']
			},
			subTotal: {
				type: Number,
				required: [true, 'Subtotal is Required']
			}
		}
	],
	totalPrice: {
		type: Number,
		required: [true, 'Total price is Required']
	},
	orderedOn: {
		type: Date,
		default: Date.now
	}

});

// [SECTION] Model
module.exports = mongoose.model('Cart', cartSchema);