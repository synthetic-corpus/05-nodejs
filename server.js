const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
// Set ups handler of http Get request

// Middleware request.
// Do not understand quite what middleware is.
app.use((req,res,next)=>{
  var now = new Date().toString();
  var sayThis = `${now}: ${req.method} ${req.url}`;
  console.log(sayThis);
  fs.appendFile('server.log', sayThis +"\n", (err) =>{
    if (err != null){
      console.log(err);
    }
  });
  next();
})
app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeSays: "blah blah I know this already",
    currentYear: new Date().getFullYear()
  })
})

hbs.registerHelper('getYearNow', () => {
  return new Date().getFullYear();
})
app.get('/bad',(req,res) => {
  res.send({
    status: 'bad',
    reasons:[
      'this',
      'empty',
      'array'
    ]
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})
// Listen on a parituclar port
app.listen(3000);
