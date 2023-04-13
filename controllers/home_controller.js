const Product_model = require('../models/products_model')




exports.get_home = async (req, res, next) => {
    try {
        const categories = await Product_model.unique_categories()       

        var category = req.query.category
        if(!category||category=="all"){
            const products = await Product_model.get_all_product();
            res.render('index', { products: products ,categories:categories});        
        }
        else{
            const filtered_products = await Product_model.get_filtered_products(category);
            res.render('index', { products: filtered_products ,categories:categories});     
        }

        
    } catch (err) {
        throw(err);
    }

};
