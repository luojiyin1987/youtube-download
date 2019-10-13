const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();

app.listen(4000, ()=>
{
    console.log('Sever works');
});
