// <---- App Libraries ---->
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cons = require('consolidate');

//<---- Backend Modules ---->
const authentication = require('./authentication');

//<---- Web-App Configuration ----> 
const app = express();
const port = 5000;
app.use(express.static('public'));
app.engine('mustache', cons.mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'FrontEnd'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "None",
    },
  })
);

//<---- Routes ---->
//----Frontend----
app.get("/", function (request, response) 
{
  response.render('index');
});

app.get("/home", function (request, response) 
{
  response.render('home');
});

//----Backend----

app.post("/api/v1/login", async function(request, response) 
{
  const { username, password } = request.body;


  try 
  {
    const loginResult = await authentication.login(username, password);

    if (loginResult.returncode === 0) 
    {
      response.render('home');
    }
    else 
    {
      response.status(401).send({'returncode': 1, 'message': 'Authentication failed', 'output': []});
    }
  }
  catch (error)
  {
    response.status(500).send({'returncode': 1, 'message': 'Account not Found', 'output': []});
  }
});


app.post("/api/v1/register", async function(request, response)
{
  const { username, email, password } = request.body;
  const today = new Date();
  const registration_date = today.toISOString().split('T')[0]; 
  try 
  {
    const registrationResult = await authentication.register(username, email, password, registration_date);

    // Check the return code to determine success or failure
    if (registrationResult.returncode === 0)
    {
      response.render('home');
    }
    else 
    {
      response.status(400).send({'returncode': 1, 'message': registrationResult.message, 'output': registrationResult.output});
    }
  } 
  catch (error)
  {
    // Handle different types of errors (client-side vs server-side)
    if (error.returncode)
    {
      response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
    }
    else 
    {
      response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
    }
  }
});



app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});