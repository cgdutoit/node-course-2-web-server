const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use (express.static(__dirname + '/public'));


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log ('Unable to append to log');
        }
    })
    next();
});


app.get('/', (req, res) => {
  //  res.send('hello, world');
    res.render ('home.hbs', {
     pageTitle: 'About me',
     currentYear: new Date().getFullYear(),
     message: 'This stuff rules'
});

});

app.get('/about',  (req,res) => {
    res.render ('about.hbs', {
        pageTitle: 'About me',
        currentYear: new Date().getFullYear()
    });

});

app.get('/bad', (req, res) => {
    //  res.send('hello, world');
    res.send ({
      errorMessage: 'Chris',
      likes: [
          'biking', 'sex'
      ]
  
    });
  
  });

app.listen(3000);
