var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
  var checkQuery = "SELECT u.userEmail FROM truck_users u WHERE u.userEmail=?"
  try{
        const results = await db.executeQuery(checkQuery,[reqBody.emailToServer]);
        if (results.length==0) {
            const encPw = md5(reqBody.pwToServer);
  var userTypeTableName = "truck_staff";
  var roleColumnName = "staffID";
  if(reqBody.userTypeToServer!=="staff"){
    userTypeTableName = "truck_"+reqBody.userTypeToServer+"s";
    roleColumnName = reqBody.userTypeToServer+"ID";
  }
    let insertUserQuery="INSERT INTO truck_users (fullName, userEmail, userPassword, contactNumber, created_at,updated_at) VALUES (?,?,?,?,?,?)";
    try {
        const userInsertResult = await db.executeQuery(insertUserQuery,[reqBody.unToServer,reqBody.emailToServer,encPw,reqBody.contactNumber,new Date(),new Date()]);
        if (userInsertResult.affectedRows > 0) {
          let insertUserTypeQuery = "INSERT INTO "+userTypeTableName+" ("+roleColumnName+") VALUES (?)";
          const userTypeInsertResult = await db.executeQuery(insertUserTypeQuery,[userInsertResult.insertId]);
          if (userTypeInsertResult.affectedRows > 0) { res.status(200).json({result:true,message:"Signed up Successfully!"}); }
          else{ res.status(200).json({result:false,message:"Unable to insert User-type!"}); }
        }
        else{ res.status(200).json({result:false,message:"Unable to insert new User !"}); }
        
    } catch (error) {
        console.error('Error while insert the new user:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
        }
        else{
          //get the user type for this email
          res.status(200).json({result:false,message:"You are already signed up! Please Login! "});
        }
  } catch (err1) {
      console.error('Error while fetching:', err1);
      res.status(500).json({ message: 'Error while checking existed user' });
  }
});

module.exports = router;


/*
client
driver
staff
*/