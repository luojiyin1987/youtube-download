const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');


const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/download", (req, res)=>{
    console.log("download", req.body);

    if(!req.body.URL)
    {
        res.send({result:1});
        return;
    }

    youtubeDownload(req.body.URL, (error)=> {
        res.send(error);
    } )
    
})

app.listen(3000, ()=>
{
   console.log('Sever works');
});

youtubeDownload=(url, next) =>{
    const cmd = `youtube-dl  ${url}     --exec "mv {} ./download/{}"`;
    exec(cmd, (error, stdout, stderr) =>{
        next({result: Number(!!error), data: error ? stderr : stdout});
    })
}