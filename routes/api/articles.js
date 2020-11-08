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
       return res.json({'success':true, 'user': article});
     });
   });

router.post('/', function(req, res) {
    Users.create(new Articles({
      title: req.body.title,
      description: req.body.subscription,
      keywords: req.body.keywords,
      body: req.body.body
    }), function(err, user){
      if(err){
        return res.json({success: false, user: req.body, error: err});
      }
      return res.json({success: true, user: user});
    });
  });

router.put('/', function(req, res){{

    Users.findOne({'_id': req.body._id}, function(err, user){
  
     if(err) {
       return res.json({success: false, error: err});
     }
  
     if(user) {
  
      let data = req.body;
  
      if(data.title){
        article.title = data.title;
      };
  
      if(data.description){
      article.description = data.description;
      };
  
      if(data.keywords){
      article.keywords = data.keywords;
      };
  
      if(data.body){
      article.body = data.body;
      };
  
      article.save(function(err){
        if(err){
          return res.json({success: false, error: err});
        }else{
          return res.json({success: true, user:user});
        }
      });
  
     }
  
    });

  }});


router.delete('/:articleId', function(req,res){{

    var articleId = req.params.userId;
  
    Articles.remove({'_id':articleId}, function(err,removed){
  
      if(err){
        return res.json({success: false, error: err});
      }
  
      return res.json({success: true, status: removed});
  
    });
  
  });

module.exports = router;