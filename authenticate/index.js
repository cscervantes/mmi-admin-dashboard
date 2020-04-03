module.exports = {
    redirectLogin: function(req, res, next){
        // console.log(req.session)
        if(!req.session.user){
            res.redirect('/mmi-admin-dashboard')
        }else{
            next()
        }
    },
    redirectHome: function(req, res, next){
        // console.log(req.session)
        if(req.session.user){
            res.redirect('/mmi-admin-dashboard/dashboard')
        }else{
            next()
        }
    }
}