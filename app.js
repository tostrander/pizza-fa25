// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Set EJS as our view engine
app.set('view engine', 'ejs');

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Create an array to store orders
const orders = [];

// Define the port number where our server will listen
const PORT = 3001;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

    // Send a response to the client
    // res.send(`<h1>Welcome to Poppa\'s Pizza!</h1>`);
    res.render('home');
});

// Define a "contact-us" route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// Define an "admin" route
app.get('/admin', (req, res) => {

    res.render('admin', { orders });
    //res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

// Define an "submit-order" route
app.post('/submit-order', (req, res) => {

    //console.log(req.body);

    // Create a JSON object to store the data
    const order = req.body;
    order.timestamp = new Date()

    // Add order to array
    orders.push(order);
    console.log(orders);

    // Send user to confirmation page
    res.render('confirmation', { order });
});

// Start the server and make it listen on the port 
// specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 
