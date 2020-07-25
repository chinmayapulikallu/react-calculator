//requires express gives us a function
const express = require('express');
//create an instance of express by call the function returned above
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//globals - Port for heroku and local host
const PORT = process.env.PORT || 5000;

//spin up server
app.listen(PORT, () => {
    console.log('server up:', PORT);
})