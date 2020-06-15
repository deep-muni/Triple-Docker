const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/app/build/'));

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/app/build/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Triple Docker');
});
