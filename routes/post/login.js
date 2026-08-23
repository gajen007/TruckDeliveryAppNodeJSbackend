var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
  const encPw = md5(reqBody.pwToServer);
  //console.log(+"\n"+reqBody.pwToServer+"\n"+reqBody.userTypeToServer);
  //res.json({result:true,message:"worked"});
  var userTypeTableName = "truck_staff";
  var roleColumnName = "staffID";
  if(reqBody.userTypeToServer!=="staff"){
    userTypeTableName = "truck_"+reqBody.userTypeToServer+"s";
    roleColumnName = reqBody.userTypeToServer+"ID";
  }
    let query="SELECT u.id, u.fullName FROM truck_users u JOIN "+userTypeTableName+" t ON t."+roleColumnName+" = u.id WHERE u.userEmail=? AND u.userPassword=?";
    
    try {
        const results = await db.executeQuery(query,[reqBody.unToServer,encPw]);
        if (results.length!==1) {
          res.status(200).json({result:false,message:"Incorrect Username and/or Password!"});
        }
        else{
          res.status(200).json({result:true,message:"Logged In!"});
        }
        
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }

});

module.exports = router;
