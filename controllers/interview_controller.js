const Interview=require('../models/interview');
const Student=require('../models/student');


module.exports.addInterview=function(req,res){
    if(req.isAuthenticated()){
        return res.render("add_interview",{
            title:"Organize Interview"
        })
    }
}

module.exports.create=function(req,res){
    Interview.create(req.body,function(err,Interview){
        if(err){
            
            return res.redirect("back")
        }
        return res.redirect("/home")
    })

}

module.exports.scheduled=function(req,res){
    if(req.isAuthenticated()){
        Interview.find({}).populate('students').exec(function(err,interviews){
            console.log("studnets.length",interviews)
            return res.render('interview',{
                title:"Schedule Interview",
                interviews:interviews
        
            })
           })
    }else{
        return res.redirect("/")
    }
}


module.exports.Enroll=function(req,res){
    
}