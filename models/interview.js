const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema(
    {
        company:{
            type:String,
            required:true,
        },
        date:{
            type:String,
            required:true,
        },
        students:[
            {
                student:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"student",
                },
                result:{
                    type:String,
                    enum:["Pass","Fail","Did't Attempt","On Hold"]
                }
            }
        ]
    },{
        timestamps:true,
    }
)

const Interview=new mongoose.model("Interview",interviewSchema);


module.exports=Interview;