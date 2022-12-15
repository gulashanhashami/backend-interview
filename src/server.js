

const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./configs/db');
const orderController=require("./controllers/order.controller")
const userController=require("./controllers/user.controller")

app.use(express.json()); 
const corsOptions = {  //cors 
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use("/orders", orderController);
app.use("/users", userController);

const port=2345; //port number
app.listen(port, async () => {
    try {
      await connect();
    } catch (err) {
      console.error(err.message);
    }
    console.log(`listening on port ${port}`);
  });