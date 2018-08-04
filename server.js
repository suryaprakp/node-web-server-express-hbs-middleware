const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs'); //set view engine type

//middleware 

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} , Request: ${req.method} , ${req.url}`;
	console.log(log);
	fs.appendFile('middleware.log',log,(err)=>{
		if(err)
			console.log("Error while accessing file middleware.log",err);
	});
	next();
});

/*app.use((req,res,next)=>{
	res.render('maintainance.hbs');
});*/

app.use(express.static(__dirname+'/public')); // executes .use in order , so keeping in the end 

hbs.registerHelper('currentYear',()=>{
	return new Date().getFullYear();
	//return '1988';
});

hbs.registerHelper('shootUP',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res) =>{
	//res.send("<h1>Hello Surya!</h1>");
	res.render('home.hbs',{
		pageTitle:'Home page',
		welcomeText: "Welcome to home page",
		//currentYear: new Date().getFullYear()	
	})
});

app.get('/about',(req,res)=>{
 //res.send("<h1>About me!</h1>")
 res.render('about.hbs',{
 	pageTitle:'About page',
 	//currentYear: new Date().getFullYear()
 })
});

app.get('/bad',(req,res)=>{ 
	res.send({
	"ErrorMessage":"Bad URL request"
	})
});	

app.listen(port,()=>{
	console.log(`Server listening at port ${port}`);
});