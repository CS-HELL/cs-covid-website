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
    fetch(vaccinationStatusJSON, {mode: 'no-cors'})
        .then(response => {
            return response.json();
        })
        .then(data => {
            perBarangayStatus = data.Barangay;
            console.log(perBarangayStatus);

            populateDropBox(perBarangayStatus);
            populateDosesAdministeredPerBarangay(perBarangayStatus);
        })
        .catch(error => {
            console.error("Something went wrong with retrieving the data.");
        });
}

// https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
function generateCard(data, target) {

    var dynamic = document.querySelector('.container_cards');
    for (var i = 0; i < data.length; i++) {

        var fetch = document.querySelector('.container_cards').innerHTML;

        // Generates the card with data.
        if (data[i].barangayName == target) {
            dynamic.innerHTML =
                `<div class="cards" id="cardDiv" onclick="flip(event)">
                <div class="card-front-content">

                <div class="CityName">
                    <h2 class="carcases-h2">${data[i].barangayName}</h2>
                    </div>

                    <div class="DosesAdministered">
                    <p class="carcases-p"><b>${dosesAdministeredPerBarangay[i]}</b></p>
                    </div>

                    <div class="Details">
                    <p class="carcases-d""><small>Click for more details.</small></p>
                    </div>
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
    }
};

function populateDropBox(data) {

    var dynamic = document.querySelector('.options-container');

    for (var i = 0; i < data.length; i++) {
        var fetch = document.querySelector('.options-container').innerHTML;

        // Generates the options for the "Select Barangay" Drop Box
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
    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => { // Active Ooption
        optionsContainer.classList.toggle("active");
    });

    optionsList.forEach(o => { // For each Data
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");

            // Check whether there is an existing card in the webpage.
            if (document.querySelector(".cards")) {
                document.querySelector(".cards").remove(); // Delete that card.
            }
            generateCard(data, selected.innerHTML);
        });
    });
}

function populateDosesAdministeredPerBarangay(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].vaccineType.length; j++) {
            // Adds the first dose and second dose of a vaccine type.
            sumB = data[i].vaccineType[j].firstDose + data[i].vaccineType[j].secondDose;
            sumA += sumB; // Total Vaccine Administered
        }

        dosesAdministeredPerBarangay.push(formatNumber(sumA));
        sumA = 0;
    }

    console.log(dosesAdministeredPerBarangay);
}

function formatNumber(number) { // Converts the plain integer to a number with comma.
    return number.toLocaleString('en-US')
}

function flip(event) { // Javascript Flip Event
    var element = event.currentTarget;
    if (element.className === "cards") {
        if (element.style.transform == "rotateY(0deg)") {
            element.style.transform = "rotateY(180deg)";
        } else {
            element.style.transform = "rotateY(0deg)";
        }


    }
};

function main() {
    getBarangayStatusFromJSON(vaccinationStatusJSON);
};

main();



