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
            for(i of interviews ){
              console.log("studnets.length",i.students)
            }
            return res.render('interview',{
                title:"Schedule Interview",
                interviews:interviews
        
            })
           })
    }else{
        return res.redirect("/")
    }
}


module.exports.enroll = async (req, res) => {
    try {
      let interview = await Interview.findById(req.params.id);
      const { email, result } = req.body;
  
      if (interview) {
        let student = await Student.findOne({ email: email });
        if (student) {
          // check if already enrolled
          let alreadyEnrolled = await Interview.findOne({
            "students.student": student.id,
          });
  
          // preventing student from enrolling in same company more than once
          if (alreadyEnrolled) {
            if (alreadyEnrolled.company === interview.company) {
              return res.redirect("back");
            }
          }
  
          let studentObj = {
            student: student.id,
            result: result,
          };
  
          // updating students field of interview by putting reference of newly enrolled student
          await interview.updateOne({
            $push: { students: studentObj },
          });
  
          // updating interview of student
          let assignedInterview = {
            company: interview.company,
            date: interview.date,
            result: result,
          };
          await student.updateOne({
            $push: { interviews: assignedInterview },
          });
  
         
          return res.redirect("back");
        }
        return res.redirect("back");
      }
      return res.redirect("back");
    } catch (err) {
      console.log("error", "Error in enrolling interview!");
    }
  };


  module.exports.remove = async (req, res) => {
    try {
  
      // find the interview
      const interview = await Interview.findById( req.params.interviewId);
  
      if (interview) {
        // remove reference of student from interview schema
        await Interview.findOneAndUpdate(
          { _id:  req.params.interviewId },
          { $pull: { students: { student:  req.params.studentId } } }
        );
  
        // remove interview from student's schema using interview's company
        await Student.findOneAndUpdate(
          { _id:  req.params.studentId },
          { $pull: { interviews: { company: interview.company } } }
        );
        return res.redirect("back");
      }
      return res.redirect("back");
    } catch (err) {
      console.log("error", "Couldn't remove from interview");
    }
  };