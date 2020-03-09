const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/download", (req, res)=>{
    console.log("download", req.body);
    res.send({result:0});
})

app.listen(3000, ()=>
{
   console.log('Sever works');
});
