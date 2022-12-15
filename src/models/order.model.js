
const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema(
    {
        id: { type: Number, require: true },
        totalfee: { type: Number, require: true },
        datetime: { type: String, require: true, default:Date.now() },
        services: [{ type: mongoose.Schema.Types.ObjectId, ref:"user", required: true  }], 
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
module.exports= mongoose.model("order", orderSchema);

//order schema