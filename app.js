var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var addNewTruck = require('./routes/post/addNewTruck');
var driverUpdateShipping = require('./routes/post/driverUpdateShipping');
var driverResponseToOrder = require('./routes/post/driverResponseToOrder');
var assignTruckAndDriver = require('./routes/post/assignTruckAndDriver');
var makeNewOrder = require('./routes/post/makeNewOrder');
var login = require('./routes/post/login');
var signup = require('./routes/post/signup');
var allClients = require('./routes/get/plain/allClients');
var allDrivers = require('./routes/get/plain/allDrivers');
var allOrders = require('./routes/get/plain/allOrders');
var allTrucks = require('./routes/get/plain/allTrucks');
var getAvailableDrivers = require('./routes/get/plain/getAvailableDrivers');
var getAvailableTrucks = require('./routes/get/plain/getAvailableTrucks');
var getCoordinates = require('./routes/get/parameterized/getCoordinates');
var ordersForDriver = require('./routes/get/parameterized/ordersForDriver');
var ordersOfClient = require('./routes/get/parameterized/ordersOfClient');
var singleOrder = require('./routes/get/parameterized/singleOrder');
var app = express();

// view engine setup
app.use(cors({origin:'*',methods:['POST','GET']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Gajen CHANGED this to true !

app.get('/', (req,res)=>{
  res.json({message:"This is route"});
});

//GET plain routes
app.use('/allClients',allClients);
app.use('/allDrivers',allDrivers);
app.use('/allOrders',allOrders);
app.use('/allTrucks',allTrucks);
app.use('/getAvailableDrivers',getAvailableDrivers);
app.use('/getAvailableTrucks',getAvailableTrucks);

//GET parameterized routes
app.use('/getCoordinates',getCoordinates);
app.use('/ordersForDriver',ordersForDriver);
app.use('/ordersOfClient',ordersOfClient);
app.use('/singleOrder',singleOrder);

//POST routes
app.use('/login',login);
app.use('/signup',signup);
app.use('/makeNewOrder',makeNewOrder);
app.use('/assignTruckAndDriver',assignTruckAndDriver);
app.use('/driverResponseToOrder',driverResponseToOrder);
app.use('/driverUpdateShipping',driverUpdateShipping);
app.use('/addNewTruck',addNewTruck);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
