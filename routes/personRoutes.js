
import Person from "./../models/person.js"
import express  from "express";


const router = express.Router();

//fetch single person
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if(!person){
        return res.status(404).json({
      status: 'error',
      data:'person not found'
    });
    } 
    return res.status(200).json({
      status: 'Success',
      person: person
    })
    
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    })
  }
});




// fetch all person
router.get('/', async(req, res) => {
  try {
    const data = await Person.find();
    return res.status(200).json({
      status: "Success",
      data : data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:'internal server error'
    })
  }
});




router.post('/', async(req, res) => {
    const {name, age, work, mobile, email, address, salary} = req.body;
    try {
      await Person.create({
        name,
        age,
        work,
        mobile,
        email,
        address,
        salary,
      });
      return res.status(201).json({
        status: 'Success',
        data: 'person created Successfully'
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'error' , data: 'internal server error'}) 
    }
});


router.put('/:id', async (req, res) => {
  const {name, age, work, mobile, email, address, salary} = req.body;
  try {
    const person =  await Person.findByIdAndUpdate(
      req.params.id,
      {
      name,
      age,
      work,
      mobile,
      email,
      address,
      salary,
    },{new: true}
  );
  if (!person){
    return res.status(404).json({
      status: 'Error',
      data: 'person not found'
    })
  }else {
    return res.status(200).json({
      status: "Success",
      data: person
    })
  }
    

  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    })
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if(!person){
      return res.status(404).json({
        status: 'Error',
        data: 'Person not found'
      });
    }else{
      return res.status(200).json({
        status: 'Success',
        data: 'Person Deleted Successfully'
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    })
  }
})





export default router;