var express = require('express');
var router = express.Router();
var Articles = require('../../models/articles');

router.get('/', function(req, res, next) {
  Articles.find({},function(err, articles){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'articles': articles});
  });
});

router.get('/:articleId', function(req,res){
  
    var articleId = req.params.articleId;
     Articles.findOne({'_id':articleId}, function(err, user){
       if(err){
        return res.json({'success':false, 'error': err});
      }
       return res.json({'success':true, 'user': user});
     });
   });
  

module.exports = router;