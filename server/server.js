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

let previousCalculations = []; 

//get route to send the calculations to display on DOM
app.get('/calculate', (req, res) => {
    res.send([...previousCalculations].reverse());
}) 

//post route for calculating the inputs and to save the 
//calculations in an array
app.post('/calculate', (req, res) => {
    let result = parseFloat(req.body.values[0]);
    for (let i = 0; i < req.body.values.length; i++) {
        if (req.body.values[i] === '+') {
            result = result + parseFloat(req.body.values[i + 1])
        }
        if (req.body.values[i] === '-') {
            result = result - parseFloat(req.body.values[i + 1])
        }
        if (req.body.values[i] === '*') {
            result = result * parseFloat(req.body.values[i + 1])
        }
        if (req.body.values[i] === '/') {
            result = result / parseFloat(req.body.values[i + 1])
        }
    }
    let currentCalculation = req.body.values
    currentCalculation.push('=', String(result))
    addCalculation(currentCalculation)
    res.send([...previousCalculations].reverse());
})

function addCalculation(currentCalculation) {
    if (previousCalculations.length >= 10) {
        previousCalculations.shift()
    }
    previousCalculations.push(currentCalculation.map(val => val).join(' '))
}

