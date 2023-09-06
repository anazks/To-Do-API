var express = require('express');
var router = express.Router();
let taskmodel = require('../models/taskModel');
const async = require('hbs/lib/async');
/* GET home page. */
router.post('/AddTask', async function(req, res, next) {
  try {
    // let body = await readBody(req.body)
    let Tasks = await taskmodel.create(req.body);
    res.json({data:"success"});
} catch (error) {
      console.log(error)
}
});
router.post('/delete', async function(req, res, next) {
  const { taskId } = req.body;
    console.log(taskId)
    try {
        let Tasks = await taskmodel.findByIdAndDelete({_id:taskId})
        console.log("deleted")
        res.json(true);
    } catch (error) {
      res.json(false);
    }
});
router.get('/GetAllTAsk',async(req,res)=>{
  try {
    let Tasks = await taskmodel.find();
      res.json(Tasks);
} catch (error) {
    console.log(error)
}
})
router.post('/updateTask',async(req,res)=>{
 let {newTask} =req.body;
let {id} =req.body;
  try {
      let Data =  await taskmodel.findByIdAndUpdate({_id:id},{task:newTask})
      res.json(true);
  } catch (error) {
      console.log(error)
      res.json(false);
  }
})
router.post('/DoneIt',async(req,res)=>{
      let {taskId}  = req.body;
      try {
          let Data =  await taskmodel.findByIdAndUpdate({_id:taskId},{status:true})
          res.json(true)
      } catch (error) {
          res.json(false)
      }
 })

 router.post('/Duplicate',async(req,res)=>{
  try {

    const { taskId } = req.body;
    // Convert the taskId string to an ObjectId if needed
    const data = await taskmodel.findOne({ _id: taskId });
    if (!data) {
      res.json({ success: false });
    }

    const { task, date } = data;
    const newObject = {
      task,
      date
    };

    const duplicate = await taskmodel.create(newObject);
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
   res.json ({ success: false });
  }
})

router.post('/delete',async(req,res)=>{
  const { taskId } = req.body;
  console.log(taskId)
  try {
      let Tasks = await taskmodel.findByIdAndDelete({_id:taskId})
      console.log("deleted")
      res.json(true)
  } catch (error) {
    res.json(false)
  }
})

router.post('/getOneTask',async(req,res)=>{

  let {taskId} = req.body
  console.log(taskId)
  try {
      let Data =  await taskmodel.findOne({_id:taskId})
      res.json(Data)
   } catch (error) {
     console.log(error)
       return false
   }

})
module.exports = router;
