const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;
let currentCalc = []
app.use(express.json());
app.use(express.static('server/public'));


// Global variable that will contain all of the
// calculation objects:
let calcHistArray = [{valueOne:3, operation:'x',valueTwo:4, result:12}]


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('request for calc history received')
  res.send(calcHistArray);
})
// POST /calculations

app.post ('/calculations', (req, res) => {
  currentCalc = req.body;  
  let currentResult = performCalc(currentCalc);  
let array = {result: currentResult};  
console.log('currentCalc is type ',typeof currentCalc) 
  currentCalc.result = currentResult  
  calcHistArray.push(currentCalc)
  console.log(calcHistArray)
  res.sendStatus(201);
})


function performCalc(array){
  let result;
  switch (array.operation) {
    case "+":
      result = Number(array.valueOne) + Number(array.valueTwo);
      break;
    case "-":
      result = Number(array.valueOne) - Number(array.valueTwo);
      break;
    case "*":
      result = Number(array.valueOne) * Number(array.valueTwo);
      break;
    case "/":
      result = Number(array.valueOne) / Number(array.valueTwo);
      break;
  }
  console.log ('result of operation is ',result)
  return result
}


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
