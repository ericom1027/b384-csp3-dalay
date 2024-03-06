const express = require("express");
const cartController = require("../controllers/cart")
const {verify, verifyAdmin, isLoggedIn} = require("../auth");


const router = express.Router();

router.get("/get-cart", verify, cartController.getCart);

router.post("/add-to-cart", verify, cartController.addToCart);

router.patch("/update-cart-quantity", verify, cartController.updateCart);

router.patch("/:productId/remove-from-cart", verify, cartController.removeFromCart);

router.put("/clear-cart", verify, cartController.clearCart)



module.exports = router;