const Student=require('../models/student');


module.exports.home=async function(req,res){
   Student.find({},function(err,studnets){
    console.log("studnets.length",studnets)
    return res.render('home',{
        title:"home",
        studnets:studnets

    })
   })
}