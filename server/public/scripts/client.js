console.log('client.js is sourced!');

let operId = []
getCalculations();



function getCalculations() {
 // event.preventDefault()
 console.log('sending request for calcs')
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then((response) => {
        const calcList = response.data.calcHistArray;
        const recentCalc = response.data.currentCalc;
        console.log('received calc history list')
               document.querySelector('#resultHistory').innerHTML = ``;

          console.log('second array is',recentCalc)
        if(calcList.length > 0){
            for (let calcs of calcList){
               document.querySelector('#resultHistory').innerHTML += `
               <li>${calcs.valueOne} ${calcs.operation} ${calcs.valueTwo} = ${calcs.result}</li> 
                `
             }
            // display recent result
                document.querySelector('#lastResult').innerHTML = `
                <li>${recentCalc.valueOne} ${recentCalc.operation} ${recentCalc.valueTwo} = ${recentCalc.result}</li> 
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
    operId = '/'
}