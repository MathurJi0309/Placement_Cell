const Student=require("../models/student");
const Interview=require("../models/interview")


module.exports.addStudent=function(req,res){
    if(req.isAuthenticated()){
        return res.render("add_student",{
            title:"Add Student",
        })
    }
    return res.redirect("/");
   
}
module.exports.editStudent = async function(req, res){
    const student = await Student.findById(req.params.id);
  
    if (req.isAuthenticated()) {
      return res.render("edit_student", {
        title: "Edit Student",
        student_details: student,
      });
    }
    return res.redirect("/");
};

module.exports.update= async function(req,res){
    try {
        const student = await Student.findById(req.params.id);
        const {
          name,
          college,
          placement,
          batch,
          dsaScore,
          webScore,
          reactScore,
        } = req.body;
    
        if (!student) {
          return res.redirect("back");
        }
    
        student.name = name;
        student.college = college;
        student.batch = batch;
        student.dsaScore = dsaScore;
        student.reactScore = reactScore;
        student.webScore = webScore;
        student.placement = placement;
    
        student.save();
        return res.redirect("/home");
      } catch (err) {
        console.log(err);
        return res.redirect("back");
      }
}


module.exports.destroy = async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await Student.findById(studentId);
  
      if (!student) {
        return;
      }
  
      const interviewsOfStudent = student.interviews;
  
      // delete reference of student from companies in which this student is enrolled
      if (interviewsOfStudent.length > 0) {
        for (let interview of interviewsOfStudent) {
          await Interview.findOneAndUpdate(
            { company: interview.company },
            { $pull: { students: { student: studentId } } }
          );
        }
      }
  
      student.remove();
      return res.redirect("back");
    } catch (err) {
      console.log("error", err);
      return;
    }
  };

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

