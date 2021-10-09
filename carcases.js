/*
https://doh.gov.ph/covid19tracker
*/

var carcases = "carcases.json";

function getCarcasesFromJSON(){
    fetch('carcases.json').then(function(response) {
        return response.json();
    }).then(function (obj) {
        console.log(obj);
        carcases.push(obj)
        document.querySelector("#debug").innerHTML = carcases;
    }).catch(function (error){
        console.error('Something went wrong with retrieving the data.');
    })
}

var dynamic = document.querySelector('.container_cards');


getCarcasesFromJSON();
