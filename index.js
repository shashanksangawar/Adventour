// <---- App Libraries ---->
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cons = require('consolidate');
const axios = require('axios'); //For Inside Requests

//<---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//<---- Backend Modules ---->
const authentication = require('./authentication');
const admin_fetch_db = require('./admin_fetch_db');
const fetch_db = require('./fetch_db');
const insert_db = require('./admin_insert_db');

//<---- Web-App Configuration ----> 
const app = express();
const port = 5000;
const host = '0.0.0.0'; // Listen on all network interfaces
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

// -----------------
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


function transformJsonStructure(json) {
  if (json.output) {
    json.output.forEach(item => {
      if (item.Image) {
        const base64Image = item.Image.data.toString('base64');
        json.output.Base64Image = `data:image/jpeg;base64,${base64Image}`;
      }
    });
  }
  return json;
}


app.get("/female", async function (request, response) 
{
  try {
    // Make an asynchronous HTTP request to fetch destinations
    const females = await axios.get('http://localhost:5000/api/v1/fetch/packages/female');

    // Extract the data from the response
    const female = females.data;
    const transformedData = transformJsonStructure(female);

    // Render the template with the data
    response.render('female', { data: transformedData});
  } catch (error) {
    console.error('Error fetching destinations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// UIs for admin
app.get("/admin", function (request, response) 
{
  response.render('admin');
});

app.get("/admin/dashboard", async function (request, response) 
{
  try 
  {
    // Make an asynchronous HTTP request to fetch destinations
    const destination = await axios.get('http://localhost:5000/api/v1/fetch/destinations');
    const activity = await axios.get('http://localhost:5000/api/v1/fetch/activities');
    const accomodation = await axios.get('http://localhost:5000/api/v1/fetch/accomodations');
    const package = await axios.get('http://localhost:5000/api/v1/fetch/packages');

    // Extract the data from the response
    const destinations = destination.data;
    const activities = activity.data;
    const accomodations = accomodation.data;
    const packages = package.data;

    // Render the template with the data
    response.render('admin_dashboard', { destinations: destinations, activities: activities, accomodations: accomodations, packages: packages });
    // response.render('admin_dashboard');
  } catch (error) {
    console.error('Error fetching destinations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/admin/add/destinations", function (request, response) 
{
  response.render('admin_destinations');
});

app.get('/admin/add/accomodations', async (request, response) => {
  try {
    // Make an asynchronous HTTP request to fetch destinations
    const results = await axios.get('http://localhost:5000/api/v1/admin/fetch/destinations');

    // Extract the data from the response
    const destinations = results.data;

    // Render the template with the data
    response.render('admin_accomodations', { destinations: destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/add/activities', async (request, response) => {
  try {
    // Make an asynchronous HTTP request to fetch destinations
    const results = await axios.get('http://localhost:5000/api/v1/admin/fetch/destinations');

    // Extract the data from the response
    const destinations = results.data;

    // Render the template with the data
    response.render('admin_activities', { destinations: destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/add/packages', async (request, response) => {
  try {
    // Make an asynchronous HTTP request to fetch destinations
    const destination = await axios.get('http://localhost:5000/api/v1/admin/fetch/destinations');
    const activity = await axios.get('http://localhost:5000/api/v1/admin/fetch/activities');
    const accomodation = await axios.get('http://localhost:5000/api/v1/admin/fetch/accomodations');

    // Extract the data from the response
    const destinations = destination.data;
    const activities = activity.data;
    const accomodations = accomodation.data;

    // Render the template with the data
    response.render('admin_packages', { destinations: destinations, activities: activities, accomodations: accomodations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
// -----------------


//----Backend----


// User APIs
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

// Admin Login
app.post("/api/v1/admin/login", async function(request, response) 
{
  const { username, password } = request.body;


  try 
  {
    const loginResult = await authentication.admin_login(username, password);

    if (loginResult.returncode === 0) 
    {
      response.redirect('/admin/dashboard');
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

app.post("/api/v1/admin/register", async function(request, response)
{
  const { username, email, password } = request.body;
  const today = new Date();
  const registration_date = today.toISOString().split('T')[0]; 
  try 
  {
    const registrationResult = await authentication.admin_register(username, email, password, registration_date);

    // Check the return code to determine success or failure
    if (registrationResult.returncode === 0)
    {
      response.redirect('/admin/dashboard');
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

// Fetch APIs for admin(For Dashboard)(Rest APIs)
app.get("/api/v1/fetch/destinations", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_db.destinations();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/fetch/accomodations", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_db.accomodations();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/fetch/activities", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_db.activities();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/fetch/packages", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_db.packages();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/fetch/packages/female", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_db.female_packages();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

// Fetch APIs for admin(For UI)(Rest APIs)
app.get("/api/v1/admin/fetch/destinations", async function(request, response)
{
  try 
  {
    const fetched_result = await admin_fetch_db.destinations();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/admin/fetch/accomodations", async function(request, response)
{
  try 
  {
    const fetched_result = await admin_fetch_db.accomodations();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/admin/fetch/activities", async function(request, response)
{
  try 
  {
    const fetched_result = await admin_fetch_db.activities();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

app.get("/api/v1/admin/fetch/packages", async function(request, response)
{
  try 
  {
    const fetched_result = await admin_fetch_db.packages();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});

// Insertion APIs for admin
app.post("/api/v1/admin/insert/destinations", upload.single('image') ,async function(request, response)
{
  const name = request.body.name;
  const country = request.body.country
  const region = request.body.region
  const description = request.body.description
  const imageBuffer = request.file.buffer;  

  try 
  {
    const insertionResult = await insert_db.destinations(name, country, region, description, imageBuffer);

    // Check the return code to determine success or failure
    if (insertionResult.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': insertionResult.message, 'output': insertionResult.output});      
    }
    else 
    {
      response.status(400).send({'returncode': 1, 'message': insertionResult.message, 'output': insertionResult.output});
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

app.post("/api/v1/admin/insert/accomodations" ,async function(request, response)
{
 
  const { name, destination_id, description, price_per_night } = request.body;
  try 
  {
    const insertionResult = await insert_db.accomodations(name, destination_id, description, price_per_night);

    // Check the return code to determine success or failure
    if (insertionResult.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': insertionResult.message, 'output': insertionResult.output});      
    }
    else 
    {
      response.status(400).send({'returncode': 1, 'message': insertionResult.message, 'output': insertionResult.output});
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

app.post("/api/v1/admin/insert/activities" ,async function(request, response)
{
 
  const { name, destination_id, description } = request.body;
  try 
  {
    const insertionResult = await insert_db.activities(name, destination_id, description);

    // Check the return code to determine success or failure
    if (insertionResult.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': insertionResult.message, 'output': insertionResult.output});      
    }
    else 
    {
      response.status(400).send({'returncode': 1, 'message': insertionResult.message, 'output': insertionResult.output});
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

app.post("/api/v1/admin/insert/packages" ,async function(request, response)
{
  const { guide, name, type, destination_id, activity_id, accomodation_id, package_validity, start_date, end_date, price, package_status, description } = request.body;
  try 
  {
    const insertionResult = await insert_db.packages(guide, name, type, destination_id, activity_id, accomodation_id, package_validity, start_date, end_date, price ,package_status, description);

    // Check the return code to determine success or failure
    if (insertionResult.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': insertionResult.message, 'output': insertionResult.output});      
    }
    else 
    {
      response.status(400).send({'returncode': 1, 'message': insertionResult.message, 'output': insertionResult.output});
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

// -----------------

app.listen(port, host, function (err) {
  if (err) console.log(err);
  console.log(`Server is running on http://${host}:${port}`);
});