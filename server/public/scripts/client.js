console.log('client.js is sourced!');

getCalculations();



function getCalculations() {
    
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then((response) => {
        console.log('received calc history list')
        console.log(response.data);
        const calcList = response.data;
            for (let calcs of calcList){
               document.querySelector('#resultHistory').innerHTML += `
               <li>${calcs.firstValue} ${calcs.operand} ${calcs.secondValue} = ${calcs.result}</li> 
                `
             }
    })
}