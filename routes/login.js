var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express222' });
});
// apis
router.post('/checkName', function(req, res, next) {
    console.log(req.body.name)
    if (req.body.name != "") {
      req.session.username = req.body.name;
      // 存下当前session
      res.json({
        status: 1,
        msg: '登录成功'
      })
      console.log('hgahah110')
    } else {
      res.json({
        status: 1,
        msg: '不能为空'
      })
    }
    
});

module.exports = router;
