const route = require('express').Router();
const HttpStatus = require('http-status-codes'); 
const middleware = require('../../middlewares/middleware');
const CustomerService = require('../../services/customers'); 
const CustomerSchema = require('../../validations/customers');

/*
  @GET Customers 
*/

/**
 * GET Customer
 * @route GET /customers
 * @group Customer 
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.get('/', async function (req, res) {
  await CustomerService.all(req.body, function(err, result) {
    if(err){
      res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  }) 
})

/**
 * @typedef CustomerEntry
 * @property {string} name.required - Title - eg: Test entry
 * @property {string} phone.required - Description - eg: 9999999 
 */
/** 
 * @route POST /customers
 * @group Customer 
 * @param {CustomerEntry.model} entry.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.post('/',
  
  middleware(CustomerSchema.POST), 
  
  async (req, res) => {
    await CustomerService.create(req.body, function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.OK).json(result)
      } 
    })
  }
);
 
/** 
 * @route PUT /customers/{id}
 * @group Customer 
 * @param {string} id.path.required - ID
 * @param {CustomerEntry.model} entry.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.put('/:id',
  
  middleware(CustomerSchema.POST), 
  
  async (req, res) => {
    await CustomerService.put(req.body, parseInt(req.params.id), function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);

/*
route.put('/:id/product/:catid',
  middleware(CustomerSchema.POST), 
  async (req, res) => {

    console.log(req.params)

    await CustomerService.put(req.body, parseInt(req.params.id), function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);*/


module.exports = route
