
const mongoose = require('mongoose')
const DB_URL = "mongodb://127.0.0.1:27017/online_shop";

const { ObjectId } = mongoose.Types;


const Product_modelSchema = mongoose.Schema(
  {
    name: String
    , image: String
    , price: Number
    , description: String
    , category: String
  });

const Product_model = mongoose.model('product', Product_modelSchema);

exports.get_all_product = async () => {
  try {
    await mongoose.connect(DB_URL);

    const products = await Product_model.find({});
    mongoose.disconnect();
    return products;
  } catch (error) {
    throw error;
  }
}

exports.get_filtered_products = async (category) => {
  try {

    await mongoose.connect(DB_URL)
    const filtered_products = await Product_model.find({ category: category })
    mongoose.disconnect()
    return filtered_products
  }
  catch (error) {
    throw error
  }
} 

exports.get_product_by_id = async (id) => {
  try {

      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error('invalid product ID')
      }
      
      await mongoose.connect(DB_URL)
        const product_details = await Product_model.findById({ _id: id })
        mongoose.disconnect()
        return product_details
      

  }
  catch (error) {
    throw error
  }
}

exports.unique_categories = async()=>{
  try {
    await mongoose.connect(DB_URL);

    const products = await Product_model.distinct('category');
    mongoose.disconnect();
    return products;
  } catch (error) {
    throw error;
  }

}

