 //users get, post, delete, idfetch, update
 import product, { brands, categories } from "../model/product.js";
import fs from 'fs';




 export const getProducts = async (req,res)=>{
 try {

const excludedFields = ['page', 'limit', 'sort', 'fields', 'skip', 'search'];
let queryObj = {...req.query};

excludedFields.forEach((val) => {
  delete queryObj[val];
}); 

if(req.query.search){
  const searchText = req.query.search;

  if(categories.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
    queryObj.category = {$regex: searchText, $options:'i' }
  }else if (brands.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
queryObj.brand = {$regex: searchText, $options:'i'}
  }else{
    queryObj.title = {$regex: searchText, $options:'i'}
  }
}





const output = Object.entries(queryObj).reduce((acc, [key, value]) => {
  const match = key.match(/(.+)\[(.+)\]/); // capture full field + operator

  if (match) {
    const field = match[1];
    const operator = `$${match[2]}`;

    // convert numeric strings to numbers
    const parsedValue = isNaN(value) ? value : Number(value);

   acc[field]= {[operator]: parsedValue};
  } else {
    acc[key] = value
  }

  return acc;
}, {});
console.log(output);
    let query = product.find(output);

  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy); 
  }

   if(req.query.fields){
   const fields = req.query.fields.split(',').join(' ');
   query = query.select(fields);
   }

   const page = req.query.page || 1;
   const limit = req.query.limit || 10;
   const skip = (page - 1) *10;


   const total = await product.countDocuments();

   const products = await query.skip(skip).limit(limit);
    return res.status(200).json({
    status:'success',
    total,
    products,
    totalPages: Math.ceil(total / limit)
  })
 } catch (err) {
     return res.status(400).json({ 
      status: 'Error',
      data: err.message
    })
 }
}

export const getProduct = async (req,res) => {
 try {
  const isExist = await product.findById(req.id);
  if(!isExist) return res.status(404).json({
    status: 'error',
    data: 'product not found'
  });
  return res.status(200).json({
    status:'success',
    product: isExist
  });
 } catch (error) {
  return res.status(500).json({
    status: 'error',
    message:err.message
  });
  
 }





} 

export const createProducts = async (req,res) => {
  const {title, price, detail, category, brand, image, stock}= req.body ?? {};

  
  try {
    await product.create ({
      title,
       detail,
       price,
       brand,
       stock,
      category,
      image: req.imagePath 
      
    });
    return res.status(201).json({
      status: 'Success', 
      data: 'product added Successfully ' 
    })
  } catch (err) {

    fs.unlink(`./uploads/${req.imagePath}`, (err) => {
      return res.status(400).json({ 
      status: 'Error',
      message: err.message
    })
    })
    
    
  }
}





 export const updateProducts = async (req, res) => {
  const { title, price, detail, stock, category, brand } = req.body ?? {};

  try {
   
    const isExist = await product.findById(req.params.id);

    if (!isExist) {
      if (req.imagePath) {
        fs.unlinkSync(`./uploads/${req.imagePath}`);
        return res.status(404).json({status: 'error', data: "product not found"});
      }else {
            return res.status(400).json({
        status: "error",
        data: "product not found",
      });
      }
     
    }

    // Update fields
    isExist.title = title || isExist.title;
    isExist.price = price || isExist.price;
    isExist.detail = detail || isExist.detail;
    isExist.stock = stock || isExist.stock;
    isExist.category = category || isExist.category;
    isExist.brand = brand || isExist.brand;

    await isExist.save();

    // Updating file IF new file uploaded
    if (req.imagePath) {
      fs.unlink(`./uploads/${isExist.image}`, async (err) => {
        isExist.image = req.imagePath;
        await isExist.save();

        return res.status(200).json({
          status: "success",
          data: "product successfully updated",
        });
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: "product successfully updated",
      });
    }
  } catch (err) {
   
    if (req.imagePath) {
      fs.unlink(`./uploads/${req.imagePath}`, (err) => {
        return res.status(500).json({
          status: "error",
          message: err.message,
        });
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

};


export const deleteProducts = async (req,res)=>{
try {
  const isExist = await product.findById(req.id);
 
  if(!isExist) return res.status(404).json({
    status: 'error',
    data: 'product not found'
  });
  fs.unlink(`./uploads/${isExist.image}`, async (error) => {
   
   await isExist.deleteOne();
   return res.status(200).json({
    sataus: 'success', 
    data: 'Product deleted Successfully'});
  })
} catch (err) {
  return res.status(500).json({
    status:'Error',
    message: err.message
  });

}
};
