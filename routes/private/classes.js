var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var classesModel = require('../../models/classesModel');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/classes', function(req, res){
  console.log('post', req.body);
  classesModel(req.body).save();
  res.sendStatus(201);
});//end post classes

router.get('/classes', function(req, res){
  console.log('pop classes hit');

  var foundClasses = [];

  classesModel.find(function(err, classes){
    if (err){
      console.log('no classes found');
      res.sendStatus(400);
    }else{
      console.log('found classes');
      foundClasses.push(classes);
    }//end else
    console.log(foundClasses);
    res.send(foundClasses);
  });//end classes find
});//end popClassess

router.delete('/:id', function(req, res){
  console.log('delete hit', req.params.id);
  classesModel.remove({_id: req.params.id}).then(function(err){
    if (!err){
      res.send('something worked');
    }else{
      res.send('error');
    }//end else
  });//end then
});//end delete

module.exports = router;






















//spacer
