console.log('client.js is sourced!');

getCalculations()

let operId  //holds the operation identifier


function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
    .then((response) => {
        let recResult = response.data;
        let last = recResult[recResult.length - 1];
        console.log('recent result is',recResult)
        console.log('last is',last);
        if(last){
            document.querySelector('#lastResult').innerHTML = `
            <li>${last.numOne} ${last.operator} ${last.numTwo} = ${last.result}</li>
            `
        }
        document.querySelector('#allResults').innerHTML = ``
        for (let i = 0; i < recResult.length; i++){
            document.querySelector('#allResults').innerHTML += `
            <li>${recResult[i].numOne} ${recResult[i].operator} ${recResult[i].numTwo} = ${recResult[i].result}</li>
            `  
        }

        })  // end of .then
}

function performCalculation(event) {
    event.preventDefault();
    
    let numOne = document.querySelector('#firstVal').value
    let numTwo = document.querySelector('#secondVal').value 
    if(checkValues(numOne,numTwo)){
        let calcValues = {
            numOne: numOne,
            numTwo: numTwo,
            operator: operId
        }
        clearInput();
        console.log('sending the values', calcValues)
        axios({
            method: 'POST',
            url: '/calculations',
            data: calcValues
        })
        .then((response) => {
            console.log('calc response received',response.data)
            getCalculations()
        })
    }
}


function addOp(event) {
    event.preventDefault()
    operId = '+'
}
function subOp(event){
    event.preventDefault()
    operId = '-'
}
function timesOp(event){
    event.preventDefault()
    operId = '*'
}
function divOp(event){
    event.preventDefault()
    operId = '/'
}
function clearInput(){
    document.querySelector("#calculate").reset()
}
function checkValues(numOne,numTwo){
    let statement = true
    if(typeof numOne === 'undefined' || typeof numTwo === 'undefined'){
        window.alert('You must enter both numbers');
        console.log('empty')
        statement = false;
    }
    if(isNaN(Number(numOne)) || isNaN(Number(numTwo))){
        window.alert('All values must be numbers');
        console.log('not a number')
        statement= false
    }
    console.log(statement)
    return statement
}