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
   Articles.findOne({'_id':articleId}, function(err, article){
     if(err){
      return res.json({'success':false, 'error': err});
    }
     return res.json({'success':true, 'article': article});
   });
 });

 router.post('/', function(req, res) {
  Articles.create(new Articles({
    title: req.body.title,
    description: req.body.description,
    keywords: req.body.keywords,
    body: req.body.body
  }), function(err, article){
    
    if(err){
      return res.json({success: false, article: req.body, error: err});
    }

    return res.json({success: true, article: article});
    
  });
}); 

module.exports = router;