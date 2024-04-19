const ShoppingCart = require("../models/shoppingCart.model");
const CartProduct = require("../models/cartProduct.model");
const Product = require("../models/product.model");
const { all } = require("../router");


// param : customer_id
exports.getProductsInShoppingCart = async (req, res) => {

    const { customer_id } = req.params;

    try {
        const cart = await ShoppingCart.findOne({
            where: {
                customerId: customer_id
            }
        });

        if(cart) {
            const elements = await CartProduct.findOne({
                where: {
                    shoppingCartId: cart.shoppingCartId,
                    isOrder: false
                }
            });
            return res.status(200).json({ success:true, elements, shoppingCart: cart.shoppingCartId});
        }
        return res.status(404).json({ success:false, message: "Cart not found"});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message});
    }

}

// body : customer_id
exports.createShoppingCart = async (req, res) => {

    try {
        const { customer_id } = req.body;

        const newShoppingCart = await ShoppingCart.create({
            customerId: customer_id
        });

        res.status(201).json({
            success: true,
            messag: "Shopping cart created successfully",
            shoppingCart: newShoppingCart
        });
    } catch (error) {
        console.error('Error creating shopping cart: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create shopping cart',
            error: error.message
        });
    }

}

// // param : customer_id and body
// exports.createCartProduct = async (req, res) => {

//     try {
//         const { customer_id } = req.params;
//         const { productId, quantitySelected, sellingPrice, isOrder } = req.body;
        
//         const cart = await ShoppingCart.findOne({
//             where: {
//                 customerId: customer_id
//             }
//         });

//         console.log('BEFORE : '+productId);
//         const productExistInCart = await CartProduct.findOne({
//             where: {
//                 productId: productId
//             }
//         });

//         console.log('AFTER : '+productExistInCart);

//         const shoppingCartId = cart.shoppingCartId;

//         if(cart) {
//             if(!productExistInCart){
//                 const newElement = await CartProduct.create({
//                     productId,
//                     quantitySelected,
//                     sellingPrice,
//                     isOrder,
//                     shoppingCartId
//                 });

//                 res.status(201).json({
//                     success: true,
//                     message: "Cart product was created successfully"
//                 });
//                 res.status(200).json({ success:true, newElement});
//             } else {
//                 const newValueQuantity = productExistInCart.quanditySelected + quantitySelected;
//                 const updateElement = await productExistInCart.update({
//                     newValueQuantity,
//                     isOrder,
//                     shoppingCartId
//                 });

//                 console.log("UDPDATED : "+JSON.stringify(updateElement));
//                 res.status(201).json({
//                     success: true,
//                     message: "Cart product was created successfully"
//                 });
//                 res.status(200).json({ success:true, updateElement});
//             }
            
            
//         }
//         return res.status(404).json({ success:false, message: "Cart not found"});
            
//     } catch (error) {
//         console.error('Error creating shopping cart: ', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to create shopping cart',
//             error: error.message
//         });
//     }
// }

exports.createCartProduct = async (req, res) => {
    try {
        const { customer_id } = req.params;
        const { productId, quantitySelected, sellingPrice, isOrder } = req.body;
        
        const cart = await ShoppingCart.findOne({
            where: {
                customerId: customer_id
            }
        });

        const shoppingCartId = cart.shoppingCartId;

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        let cartProduct = await CartProduct.findOne({
            where: {
                productId: productId,
                shoppingCartId: shoppingCartId
            }
        });

        if (!cartProduct) {
            cartProduct = await CartProduct.create({
                productId,
                quantitySelected,
                sellingPrice,
                isOrder,
                shoppingCartId
            });
            return res.status(201).json({ success: true, message: "Cart product was created successfully", cartProduct });
        } else {
            const newValueQuantity = cartProduct.quantitySelected + quantitySelected;
            const updatedCartProduct = await cartProduct.update({
                quantitySelected: newValueQuantity,
                isOrder: isOrder,
                shoppingCartId: shoppingCartId
            });
            return res.status(200).json({ success: true, message: "Cart product was updated successfully", updatedCartProduct });
        }
    } catch (error) {
        console.error('Error creating or updating shopping cart product: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create or update shopping cart product',
            error: error.message
        });
    }
};


// param : cartProductId
exports.deleteCartProduct = async (req, res) => {

    try {
        
        const cartProductIdToDelete = req.params.cartProductId;

        const deletedCartProduct = await CartProduct.destroy({
            where: {
                cartProductId: cartProductIdToDelete
            }
        });
    
        if (deletedCartProduct === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cart product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart product deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting cart product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete cart product',
            error: error.message
        });
    }
}

// param : cartProductId and body : quanditySelected
exports.updateCartProduct = async(req, res) => {

    try {

        const { cartProductId, customer_id } = req.params;
        const {quantitySelected}  = req.body;

        
        if(isNaN(cartProductId) || isNaN(quantitySelected)) {
            return res.status(400).json({
                success: false,
                message: "Bad request. No id provided"
            });
        }

        const elementToUpdate = await CartProduct.findOne({
            where: {
                cartProductId: cartProductId
            }
        });


        const elementUpdated = await elementToUpdate.update({
            quantitySelected: quantitySelected
        });

        if(elementUpdated == 0) {
            return res.status(404).json({
                success: false,
                message: 'The cart product was not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart product quantity was updated successfully"
        });

    } catch (error) {

        console.error("Error updating cart product quantity : ", error);
        res.status(500).json({
            success: false,
            message: "Failed to update cart product quantity",
            error: error.message
        })

    }

}


exports.getAllCartProduct = async(req, res) => {

    try {

        const { customer_id } = req.params;

        if(isNaN(customer_id)) {
            return res.status(400).json({
                success: false,
                message: "Bad request. No id provided"
            });
        }


        const shoppingCart = await ShoppingCart.findOne({
            where: {
                customerId: customer_id
            }
        });


        const shop = await CartProduct.findAll({
            where: {
                shoppingCartId: shoppingCart.shoppingCartId,
            },
            include: [
                {
                    model: Product,
                    required: true,
                    attributes: ['name', 'thumbnail'], // Specify the attributes you want to include from the Product model
                },
            ],
        });


        res.status(200).json({
            success: true,
            message: "Cart product quantity was updated successfully",
            shop: shop
        });

    } catch (error) {

        console.error("Error updating cart product quantity : ", error);
        res.status(500).json({
            success: false,
            message: "Failed to update cart product quantity",
            error: error.message
        })

    }

}


