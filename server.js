const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'))
// Set ups handler of http Get request
app.get('/', (req, res) => {
  res.send('Hello Express!')
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
// Listen on a parituclar port
app.listen(3000);
