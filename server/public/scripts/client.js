console.log('client.js is sourced!');

getCalculations()

let operId  //holds the operation identifier

function getCalculationsTwo() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
    .then((response) => {
        let history = response.data
        recentResult();
        showHistory(history);
    })
}

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
    let numOne = Number(document.querySelector('#firstVal').value)
    let numTwo = Number(document.querySelector('#secondVal').value) 
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

function recentResult() {
    axios({
        method: 'GET',
        url: '/recent'
    })
    .then((response) => {
        let recResult = response.data;
        console.log('recent result is',recResult)
        if(recResult.numOne != null){
            document.querySelector('#lastResult').innerHTML = `
            ${recResult.numOne} ${recResult.operator} ${recResult.numTwo} = ${recResult.result}
            `
        }
        })
}  // end of recentResult
function showHistory (history) {
        document.querySelector('#allResults').innerHTML = ``
        console.log('history is' ,history)
        for (let i = 0; i < history.length; i++){
            document.querySelector('#allResults').innerHTML += `
            <li>${history[i].numOne} ${history[i].operator} ${history[i].numTwo} = ${history[i].result}</li>
            `  
        }
    } //end of resultHistory

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
    console.log(`the input values are `)
}