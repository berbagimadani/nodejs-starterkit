const route = require('express').Router();
const HttpStatus = require('http-status-codes');  
//const middleware = require('@middlewares/middleware');
const ProductService = require('@services/cms/products');   
//const Productschema = require('@validations/products');

/**
 * GET Product
 * @route GET /products
 * @group Product 
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.get('/', async (req, res, next) => {
  await ProductService.all(req.body, function(err, result) {
    if(err){
      res.status(400).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  })
})
 

module.exports = route
