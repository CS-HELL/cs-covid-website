/*
https://doh.gov.ph/covid19tracker
*/

var total = 0;

var vaccinationStatusJSON = 'res/vaccinationStatus.json';
var detailedCarCasesJSON = 'res/detailedCarCasesPerProvince.json';

let perBarangayStatus = new Array();

let dosesAdministeredPerBarangay = new Array();

var sumC = 0;
var sumB = 0;
var sumA = 0;

// https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
function getBarangayStatusFromJSON(vaccinationStatusJSON) {
    fetch(vaccinationStatusJSON, { mode: 'no-cors' })
        .then(response => {
            return response.json();
        })
        .then(data => {
            perBarangayStatus = data.Barangay;
            console.log(perBarangayStatus);


            populateDropBox(perBarangayStatus);
            
        })
        .catch(error => {
            console.error("Something went wrong with retrieving the data.");
        });
}

// https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
function generateCard(data, target) {
    populateDosesAdministeredPerBarangay(data);

    var dynamic = document.querySelector('.container_cards');
    for (var i = 0; i < data.length; i++) {

        var fetch = document.querySelector('.container_cards').innerHTML;

        if(data[i].barangayName == target){
            dynamic.innerHTML =
            `<div class="cards" id="cardDiv" onclick="flip(event)">
                <div class="card-front-content">
                    <h2 class="carcases-h2">${data[i].barangayName}</h2>
                    <p class="carcases-p"><b>${dosesAdministeredPerBarangay[i]}</b></p>
                    <p class="carcases-d"><b></b></p>
                    <p class="carcases-d""><small>More Details</small></p>
                </div>

                <div class="card-back-content"">
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <h2 class="carcases-h2>test</h2>
                    <p class="carcases-p"><b>test</b></p>
                    <p class="carcases-p""><small>23</small></p>
                </div>
            </div>` + fetch;
        }
        

        // total = total + data[0].Sequence_Value[i];
    }
};

function populateDropBox(data) {

    var dynamic = document.querySelector('.options-container');

    for (var i = 0; i < data.length; i++) {
        var fetch = document.querySelector('.options-container').innerHTML;

        dynamic.innerHTML =
            `<div class="option">
                <input type="radio" class="radio" id="${data[i].barangayName}" name="category" />
                <label for="${data[i].barangayName}">${data[i].barangayName}</label>
            </div>` + fetch;
    }
    selectOption(data);
}

function selectOption(data) {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");
    var card = document.getElementsByClassName(".cards");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        
        optionsContainer.classList.toggle("active");
        
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            
            generateCard(data, selected.innerHTML);
            
        });
    });
}

function populateDosesAdministeredPerBarangay(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].vaccineType.length; j++) {
            sumB = data[i].vaccineType[j].firstDose + data[i].vaccineType[j].secondDose;
            sumA += sumB;
        }

        dosesAdministeredPerBarangay.push(formatNumber(sumA));
        sumA = 0;
    }

    console.log(dosesAdministeredPerBarangay);
}

function formatNumber(number) {
    return number.toLocaleString('en-US')
}

function flip(event) {
    var element = event.currentTarget;
    if (element.className === "cards") {
        if (element.style.transform == "rotateY(0deg)") {
            element.style.transform = "rotateY(180deg)";
        }
        else {
            element.style.transform = "rotateY(0deg)";
        }


    }
};

function main() {
    getBarangayStatusFromJSON(vaccinationStatusJSON);

};

main();



