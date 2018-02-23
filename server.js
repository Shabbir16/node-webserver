const express = require('express');
const hbs= require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err)
        console.log('Unable to write to the file');
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintain.hbs');
// });

//static directory
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(t)=>{
    return t.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send('<h1>Hello I am listning</h1>');
    // res.send({
    //     body: 'Hello Express',
    //     hobby : [
    //         'biking',
    //         'hiding'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle : 'This is home page',
        welcomeMessage : 'Welcome here'
    });
});

app.get('/about',(req,res)=>{
    //  res.send('About Page');
   res.render('about.hbs',{
       pageTitle : 'Title  page'
   });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'Some error has occured'
    });
}); 

app.listen(3000);

//This is to test commit
//Hi i am shabbir