var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/userController');


router.get('/',userController.homePageGET)
router.get('/user',userController.homePageGET)
// router.get('/',userController.homePageGET)
// router.get('/',userController.homePageGET)
router.get('/user/category/:category/:filter/:pageno',userController.categoryProductsGET)
router.get('/user/category/:category/:id',userController.productGET)
module.exports=router
