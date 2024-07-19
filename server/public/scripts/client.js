console.log('client.js is sourced!');

getCalculations();



function getCalculations() {
    
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then(response) => {
        
    }

}