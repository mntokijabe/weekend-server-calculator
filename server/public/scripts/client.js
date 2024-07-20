console.log('client.js is sourced!');

let operId = []
getCalculations();



function getCalculations() {
 // event.preventDefault()
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then((response) => {
        console.log('received calc history list')
               document.querySelector('#resultHistory').innerHTML = ``;
        const calcList = response.data;
            for (let calcs of calcList){
               document.querySelector('#resultHistory').innerHTML += `
               <li>${calcs.valueOne} ${calcs.operation} ${calcs.valueTwo} = ${calcs.result}</li> 
                `
             }
    })
}

function newCalc(event) {
   event.preventDefault();
    let firstValue = document.querySelector('#firstNum').value;
    let secondValue = document.querySelector('#secondNum').value;

    let values = {
          valueOne: firstValue,
          operation: operId,
          valueTwo: secondValue
    }
console.log('sending values')
    axios({
        method:'POST',
        url: '/calculations',
        data: values
    })
.then((response) => {
console.log('response of Post received')
    getCalculations();
})
}

function plus(event){
    event.preventDefault();
    console.log('adding');
    operId = '+' 
}
function minus(event){
    event.preventDefault();
    console.log('subtracting');
    operId = '-'
}
function times(event){
    event.preventDefault();
    console.log('multiplying');
    operId = '*'
}
function divide(event){
    event.preventDefault();
    console.log('adding');
    operId = '+'
}