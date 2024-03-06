const Cart = require("../models/Cart");

module.exports.getCart = async (req, res) => {
    try {
        const user = req.user.id;

        const cart = await Cart.findOne({ userId: user });

        if (!cart) {
            return res.status(404).json({ message: 'No cart found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to get the cart", error: error.message });
    }
};

module.exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity, subTotal } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, cartItems: [], totalPrice: 0 });
        }

        const existingProductIndex = cart.cartItems.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            cart.cartItems[existingProductIndex].quantity += quantity;
            cart.cartItems[existingProductIndex].subTotal += subTotal;
        } else {
            cart.cartItems.push({ productId, quantity, subTotal });
        }

        cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.subTotal, 0);

        const savedCart = await cart.save();
        res.status(200).send({ message: 'Product added to cart successfully', cart: savedCart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports.updateCart = (req, res) => {
    const userId = req.user.id;
    const { productId, quantity, subTotal } = req.body;

    Cart.findOne({ userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found for this user' });
            }

            const existingProductIndex = cart.cartItems.findIndex(item => item.productId === productId);

            if (existingProductIndex !== -1) {
                cart.cartItems[existingProductIndex].quantity += quantity;
                cart.cartItems[existingProductIndex].subTotal += subTotal;
            } else {
                cart.cartItems.push({ productId, quantity, subTotal });
            }

            cart.totalPrice = cart.cartItems.reduce((total, item) => total + (item.quantity * item.subTotal), 0);

            return cart.save();
        })
        .then(savedCart => {
            res.status(200).json({ message: 'Cart updated successfully', cart: savedCart });
        })
        .catch(err => {
            console.error('Error updating cart:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// [SECTION] Remove from cart
module.exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
        }

        cart.cartItems = cart.cartItems.filter(item => item.productId !== productId);
        
        cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.subTotal, 0);

        const savedCart = await cart.save();
        res.status(200).send({ message: 'Product removed from cart successfully', cart: savedCart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// [SECTION] Clear from cart 
module.exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
        }
        
        cart.cartItems = [];
        cart.totalPrice = 0;

       const savedCart = await cart.save();
        res.status(200).send({ message: 'Cart cleared successfully', cart: savedCart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).send({ error: `Internal server error: ${error.message}` });
    }
};


