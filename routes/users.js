var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  request.post('http://localhost:3000/mmi-endpoints/v0/users', {headers:{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.f2X7W_6J8g6y-jKto1fMj5zq7QkOLu9WBGw5b-sHAIc"
  }, body:req.body }, function(error,response, body){
    if(error){
      next(error)
    }else{
      // console.log(body)
      if(body.hasOwnProperty('acc_id')){
        let session = req.session
        session.user = body
        // res.render('pages/dashboard', {title: 'Dashboard', path:req.path})
        // res.send('/mmi-admin-dashboard/dashboard')
        res.status(200).send({'success': true, 'message': 'Success'})
      }else{
        res.status(400).send({'success': false, 'message': 'Account does not matched! Try again'})
      }
    }
  })
})

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
