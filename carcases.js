/*
https://doh.gov.ph/covid19tracker
*/

var carcases = [];

function getCarcasesFromJSON() {
    fetch('carcases.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(JSON.stringify(data));
        
        generateCards(data);

    }).catch(function (error) {
        console.error('Something went wrong with retrieving the data.');
    })
}



function generateCards(data){
    var dynamic = document.querySelector('.container_cards');
    
    for (var i = 0; i < data[0].Sequence_Key.length; i++) {
        var fetch = document.querySelector('.container_cards').innerHTML;
        var tempContainer = data;

        dynamic.innerHTML = 

        `<div class="cards">
        <div class="card-content">
            <h2>${data[0].Sequence_Value[i]}</h2>
            <p>${data[0].Sequence_Key[i]}</p>
        </div>
    </div>` + fetch;
    }
}

getCarcasesFromJSON();
