/*
https://doh.gov.ph/covid19tracker
*/

var total = 0;

var carCasesJSON = 'res/carCasesPerProvince.json';
var detailedCarCasesJSON = 'res/detailedCarCasesPerProvince.json';

var carcases = [];

// https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
function getCarcasesFromJSON(carCasesJSON) {
    fetch(carCasesJSON).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(JSON.stringify(data));
        generateCards(data);
    }).catch(function (error) {
        console.error('Something went wrong with retrieving the data.');
    })
}

// // https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
// function generateCards(data) {
//     var dynamic = document.querySelector('.container_cards');

//     for (var i = 0; i < data[0].Sequence_Key.length; i++) {
//         var fetch = document.querySelector('.container_cards').innerHTML;

//         dynamic.innerHTML =
//             `<div class="cards" onclick="flip(event)">
//                 <div class="card-front-content">
//                     <h2 class="carcases-h2">${data[0].Sequence_Value[i]}</h2>
//                     <p class="carcases-p"><b>${data[0].Sequence_Key[i]}</b></p>
//                     <p class="carcases-p""><small>Details</small></p>
//                 </div>

//                 <div class="card-back-content"">
//                     <h2 class="carcases-h2>test</h2>
//                     <p class="carcases-p"><b>test</b></p>
//                     <p class="carcases-p""><small>23</small></p>
//                 </div>
//             </div>` + fetch;

//         // total = total + data[0].Sequence_Value[i];
//     }
// };



// function flip(event) {
//     var element = event.currentTarget;
//     if (element.className === "cards") {
//         if (element.style.transform == "rotateY(0deg)") {
//             element.style.transform = "rotateY(180deg)";
//         }
//         else {
//             element.style.transform = "rotateY(0deg)";
//         }


//     }
// };

// getCarcasesFromJSON(carCasesJSON);
