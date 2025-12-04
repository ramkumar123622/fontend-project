//users get, post, delete, idfetch, update
 import product from "../model/product.js";
import fs from 'fs';




 export const getProducts = async (req,res)=>{
 try {




  const products = await product.find({});
  return res.status(200).json({
    status:'success',
    products

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

    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
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
