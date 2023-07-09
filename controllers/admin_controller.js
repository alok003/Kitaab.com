module.exports.adminLogP= function(req,res){
    const user=req.user;
    if(user.admin == true)
        return res.render('admin');
    else
        res.redirect('/');
}