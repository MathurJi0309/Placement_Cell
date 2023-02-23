const Student=require("../models/student");


module.exports.addStudent=function(req,res){
    // if(req.isAuthenticated()){
        
    // }
    // return res.redirect("/");
    return res.render("add_student",{
        title:"Add Student",
    })
}