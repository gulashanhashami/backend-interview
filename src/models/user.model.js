
const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
        id: { type: Number, require: true },
        name: { type: String, require: true },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
module.exports= mongoose.model("user", userSchema);
// user schema