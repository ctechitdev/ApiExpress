const req = require('express/lib/request');
const pool = require ('../../db');

const queries = require('./queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');

const crypto = require("crypto");


 

const checkUserPassword = async(req, res) =>{

    const email= String(req.params.user);
    const password = String(req.params.pass);
   
 

    pool.query(queries.checkUserPassword,[email], (error , results) => {
        if(results.rows.length){
            

            const users = results.rows[0]; 
            bcrypt.compare(password, users.passwords, (error, isMatch)=>{
                
                if(isMatch){
                    const genkey = crypto.randomBytes(32).toString('hex');
                    const accessToken = jwt.sign({id: users.user_names},genkey , {expiresIn:"2h"});

                    res.status(200).json({users,accessToken,genkey}) 
                   
                 
                  
                }else{  
                    res.status(400).send(
                        {
                            message: 'wrong password'
                        }
                         );
                }
            })
            
             
           // res.status(200).json(results.rows)
        }else {
            res.status(400).send("no  user");
        }

 
    })
};

const addUser =  async (req , res) => {
    
    const {firstname,lastname,emailadd,passwordadd} = req.body;

    const lowEmail = emailadd.toLowerCase();

    const encryptPassword = await bcrypt.hash(passwordadd,10);
  
    pool.query(queries.checkEmailExit,[emailadd], (error, results) => {
        if(results.rows.length){
            res.status(200).send("Email already registed");
           // res.status(400).send( { message : "Email already registed" });
        }else{
                
          //  res.status(200).send("Email available");
         
          pool.query(queries.addUser,[firstname,lastname,lowEmail,encryptPassword] , (error, results) => {
              if(error) throw error;
           // res.status(201).send(  { message : "User Register Successfull" } );
           res.status(201).send("User Register Successfull");
          })

        }
    })
}
 
const CallTruck = async(req, res) =>{


    jwt.verify(req.token, 'secretkey', (err, authData) => {

      //  const staffid = authData.id
        const staffbranch = authData.branch
        if(err) {
          res.sendStatus(403);
        } else {
            
            pool.query(queries.getCalltruck,[staffbranch],  (error , results) => {
                if(error) throw error;
           
                if(results.rows.length){
                    
                    res.status(200).json(results.rows);
                    
                     
                }else {
                    res.status(200).send("no item");
                }
        
         
            })
             
        }
      });
 
    
    
};




const checkUser =  async  (req , res) => {
    
    const {loginuser,logpassword} = req.body;

    pool.query(queries.checkUserPassword,[loginuser], (error , results) => {
        if(results.rows.length){
  
            const users = results.rows[0]; 
 

            bcrypt.compare(logpassword, users.passwords, (error, isMatch)=>{
                
                if(isMatch){
                   // const genkey = crypto.randomBytes(32).toString('hex');
                    const accessToken = jwt.sign({id: users.user_ids,branch:  users.staff_branch  },'secretkey' , {expiresIn:"2h"});

                    res.status(200).json([{accessToken}]) 
                   
                 
                  
                }else{
                    res.status(200).send("wrong password"); 
                }
            })
            
             
            // res.status(200).json(results.rows)
        }else {
            res.status(200).send("no  user");
        }


       
    })
 
}

 
const tests =  async (req , res) => { 
 // Mock user
 const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '300s' }, (err, token) => {
    res.json({
      token
    });
  });
}

const calltest =  async (req , res) => { 
    // Mock user

    const staffid = 15;

    pool.query(queries.getCalltruck,[staffid],  (error , results) => {
        if(error) throw error;
   
        if(results.rows.length){
            
            res.status(200).json(results.rows);
            
             
        }else {
            res.status(200).send("no item");
        }

 
    })

    // const user = { 
    //     bill_header: 'brad',
    //     bill_total: 'brad@gmail.com'
    //   }
    
    //  res.status(200).send(user);
     
   }

   const callListItemCallTruck =  async (req , res) => { 
     

    const {billheader} = req.body;

    pool.query(queries.getListItemCalltruck,[billheader], (error , results) => {
        if(error) throw error;
   
        if(results.rows.length){
            
            res.status(200).json(results.rows);
            
             
        }else {
            res.status(200).send("no item");
        }

 
    })

     
     
   }

const postda =     (req , res) => { 
    // Mock user
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Post created...',
            authData
          });
        }
      });
   
    
   }

   
  

module.exports = {
    
    checkUserPassword,
    addUser,
    checkUser,
    tests,
    postda,
    CallTruck,
    calltest,
    callListItemCallTruck,
}
