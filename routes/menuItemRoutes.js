
import MenuItem from "./../models/menuItem.js"
import express from "express";


const router = express.Router();

//fetch single menuItem
router.get('/:id', async(req, res) => {
    try {
        const menuItems = await MenuItem.findById(req.params.id);
       
        if(!menuItems){
            return res.status(404).json({
                status: 'Error',
                data: 'MenuItem not found'
            })
        }
        return res.status(200).json({
            status: 'success',
            menuItems: menuItems
        })
    } catch (err) {
        return res.status(400).json({
            status: 'Error',
            data: err.message
        })
        
    }
})


//fetch all menuItems
router.get('/', async(req, res) => {
  try {
    const menuItems = await MenuItem.find();
    return res.status(200).json({
      status: 'success',
      data: menuItems
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    })
  }
});


//create menuItem
router.post('/', async(req, res) =>{
const { name, price, taste, is_drink, ingrediants, num_sales } = req.body;
  try {
    await MenuItem.create({
       name,
       price,
       taste,
       is_drink,
       ingrediants,
       num_sales
    });
    return res.status(201).json({
      status: 'Success',
      data: 'menuItem created Successfully'
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    })
  }
});


router.put('/:id', async (req, res) =>{
  const {name, price, taste, is_drink, ingrediants, num_sales} = req.body; 
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        taste,
        is_drink,
        ingrediants,
        num_sales,
      },{new: true}
    );
    if(!menuItem){
      return res.status(404).json({
        status: 'Error',
        data: 'menuItem not found'
      });
    }else{
      return res.status(200).json({
        status: 'Success',
        data: menuItem
      });
    }
    
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      data: err.message
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if(!menuItem){
      return res.status(404).json({
        status: 'Error',
        data: 'MenuItem not found'
      })
    }else{
      return res.status(200).json({
        status: 'Success',
        data:'MenuItem Deleted Successfully'
      })
    }

  } catch (err) {
    return res.status(400).json({
      status:'Error',
      data: err.message
    })
  }
})

export default router;