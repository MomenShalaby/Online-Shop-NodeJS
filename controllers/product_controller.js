const Product_model = require('../models/products_model')


exports.get_product_details = async (req, res, next) => {
    try {

            var id = req.params.id

            const product = await Product_model.get_product_by_id(id);
            res.render('products', {product: product });     
        
    } catch (err) {

        next(err);
    
    }

};
