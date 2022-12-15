
const path= require("path");
const express=require("express");
const Order=require("../models/order.model")
const router=express.Router();
//post the order data
router.post("", async(req, res)=>{
    try {
        let preExistOrder=await Order.findOne({id:req.body.id}).lean().exec();
        if(preExistOrder){
            if(Math.floor((Date.now() - preExistOrder.datetime) / 1000 / 60 / 60)<3){
                return res.status(400).send({message:"Order is already exist. You can placed same order after 3 hours.", error:true});
            }else{
                const order= await Order.create(req.body);
                return res.status(201).send(order);
            }
        }
        const order= await Order.create(req.body);
        return res.status(201).send(order);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get the all orders data
router.get("", async(req,res)=>{
    try {
        
        const orders=await Order.find().populate({path:"services", select: {id:1}}).lean().exec();
        return res.status(200).send(orders); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get single order data by id
router.get("/:id", async (req, res) => {
    try {
   
        const order = await Order.findById(req.params.id).lean().exec();
  
        return res.status(200).send({ orders: order });

    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  //patch the order data(means partially upadated not fully)
  router.patch("/:id", async (req, res) => {
    try {
        let preExistOrder=await Order.findOne({id:req.body.id}).lean().exec();
        if(preExistOrder){
            if(Math.floor((Date.now() - preExistOrder.datetime) / 1000 / 60 / 60)<3){
                return res.status(400).send({message:"You can't update it within 3 hours. You cant update it after 3 hours.", error:true});
            }else{
                const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                  })
                  .lean()
                  .exec();
            
                return res.status(200).send(order);
            }
        }
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
          .lean()
          .exec();
    
        return res.status(200).send(order);
      } catch (err) {
        return res.status(500).send(err.message);
      }
  });

  //delete a single order data by id
  router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id).lean().exec();
    
        return res.status(200).send(order);
      } catch (err) {
        return res.status(500).send(err.message);
      }
  });

module.exports=router;

//handle CRUD operation