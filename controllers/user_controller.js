const User=require('../models/user')

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}

// module.exports.signIn=function(req,res){

// }

module.exports.SignIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('user_sign_in')
}

module.exports.SignUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('user_sign_up')
}


module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/');
            })
        }else{
            console.log("hye create ho gye hai ")
            return res.redirect('back');
        }

    });
}


module.exports.createSession=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding the sign in user")
            return ;
        }
        if(user){
            if(user.password != req.body.password){
                console.log("oppps eeorr ")
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/home');
        }
        else{
            console.log("ajbkanadnkldndad")
            return res.redirect('back');
        }
    })
}


module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect("/");
    })
}