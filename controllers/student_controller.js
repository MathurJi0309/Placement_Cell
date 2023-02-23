const Student=require("../models/student");


module.exports.addStudent=function(req,res){
    if(req.isAuthenticated()){
        return res.render("add_student",{
            title:"Add Student",
        })
    }
    return res.redirect("/");
   
}

module.exports.createStudent=function(req,res){
    console.log("req.body",req.body)
    console.log("Student.length",Student.length)

    Student.findOne({email:req.body.email},function(err,student){
        if(err){
            console.log("error in finding the student");
            return ;
        }
        if(!student){
            Student.create(req.body,function(err,student){
                if(err){
                    console.log("err",err)
                    return res.redirect('back');
                }
                return res.redirect('/home');
            })
        }else{
            return res.redirect('back');
        }
    })
}