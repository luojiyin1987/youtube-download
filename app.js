const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const serveIndex = require('serve-index');

const downloadDict = {};

const app = express();

app.use(express.static('public'));
app.use('/down', express.static('download'), serveIndex('download', {'icons':true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/download", (req, res)=>{
    console.log("download", req.body);

    if(!req.body.URL)
    {
        res.send({result:1});
        return;
    }

    const url = req.body.URL;

    if(downloadDict[url] === undefined)
    {
        downloadDict[url] = true;
        youtubeDownload(req.body.URL, (error) =>
        {
            delete downloadDict[url];
            res.send(error);
        })
    } else {
        res.send("downloading, please wait");
    }

})

app.listen(3000, ()=>
{
   console.log('Sever works');
});

youtubeDownload=(url, next) =>{
    const cmd = `youtube-dl  ${url}     --exec "mv {} ./download/{}"`;
    exec(cmd, (error, stdout, stderr) =>{
        next({result: Number(!!error), data: error ? stderr : 'download Success'});
    })
}
