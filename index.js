const express=require('express');
const jwt = require('jsonwebtoken');
const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:"Welcome to JWT"
    });

});

app.post('/api/auth', verifyToken, (req, res) => {


    jwt.verify(req.token,'secretkey', (err, data) => {
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message: "User Authenticated",
                    data
                   })
            }
    })


});
app.post('/api/apply', verifyToken, (req, res) => {


    jwt.verify(req.token,'secretkey', (err, data) => {
            if(req.token=='') {
                res.json({
                    message:"Approval pending"
                });
            } else {
                res.json({
                    Employee:"Leave Applied",
                    data
                   })
            }
    })


});

app.post('/api/login',(req,res)=>
{
    const user={
        id:1,
        username:"alan",
        email:"alan@gmail.com",
    }
    

    jwt.sign({user},'secretkey',(err,token)=>
    {
        res.json({
        token
        })
    });
});
app.post('/api/approve', (req, res) => {
    const status ="Leave is approved"
    
    jwt.sign({status}, 'secretkey', (err, token) =>
    {
        res.json({
            token
        })
    });
});
app.post('/api/reject', (req, res) => {
    const status ="Leave is rejected"
    
    jwt.sign({status}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    });
});
function verifyToken(req, res, next) {


    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {


        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next();

    } else {

        res.sendStatus(403);
    }
}
app.listen(5000,() => {
    console.log("started")
})