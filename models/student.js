const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        college:{
            type:String,
            required:true,
        },
        batch:{
            type:String,
            required:true,
        },
        dsaScore:{
            type:Number,
            required:true,
        },
        webScore:{
            type:Number,
            required:true
        },
        reactScore:{
            type:Number,
            required:true,
        },
        // placement:{
        //     type:String,
        //     enum:["placed","Not Placed"],
        //     required:true,
        // },
        // interviews:[
        //     {
        //        company:{
        //         type:String,
        //         required:true,
        //        },
        //        date:{
        //         type:String,
        //         required:true,
        //        },
        //        result:{
        //         type:String,
        //         emun:["Pass","Fail","Did't Attempt","On Hold"],
        //        }
        //     }
        // ]
    },{
        timestamps:true
    }
)

const Student=new mongoose.model("Student",studentSchema);

module.exports=Student;