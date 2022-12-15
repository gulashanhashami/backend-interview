

const path= require("path");
const express=require("express");
const User=require("../models/user.model")
const router=express.Router();
//post the user_data
router.post("", async(req, res)=>{
    try {
        const user= await User.create(req.body);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get the user_data
router.get("", async(req,res)=>{
    try {
        
        const users=await User.find().lean().exec();
        return res.status(200).send(users); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get single user_data by id
router.get("/:id", async (req, res) => {
    try {
   
        const user = await User.findById(req.params.id).lean().exec();
  
        return res.status(200).send({ users: user });

    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  //patch the user_data(means partially upadated not fully)
  router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
          .lean()
          .exec();
    
        return res.status(200).send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
  });

  //delete a single user_data by id
  router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    
        return res.status(200).send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
  });

module.exports=router;

//handle CRUD operation