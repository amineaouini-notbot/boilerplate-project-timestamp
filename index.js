// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res)=>{
  let {date} = req.params;
  let inputUnix = Number(date)
  let utcDate = new Date(inputUnix ? inputUnix : date);
  // if date is invalid send error
  if (isNaN(utcDate)) res.json({error: "Invalid Date"}) 

  // setup result to be sent
  utcDate.setHours(0,0,0,0) 
  let unix = inputUnix ? inputUnix : parseInt((utcDate.getTime()).toFixed(0)) 
  let result = { unix, utc: utcDate.toString().split('+')[0]}

  res.json(result) // send result


})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
