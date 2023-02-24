const Student=require('../models/student');
const Interview=require('../models/interview');


// module.exports.home=async function(req,res){
//    Student.find({},function(err,studnets){
//     console.log("studnets.length",studnets)
//     return res.render('home',{
//         title:"home",
//         studnets:studnets

//     })
//    })
// }

module.exports.home=function(req,res){
    if(req.isAuthenticated()){
        Student.find({}).populate('interviews').exec(function(err,students){
            console.log("studnets.length",students)
            return res.render('home',{
                title:"home",
                students:students
        
            })
           })
    }else{
        return res.redirect("/")
    }
 }