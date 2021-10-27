/*
https://doh.gov.ph/covid19tracker
*/

const total = 0;

const vaccinationStatusJSON = 'res/barangayDataFile.json';

let perBarangayStatus = [];

// Retrieve

// Madriaga src: https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
function getBarangayStatusFromJSON(vaccinationStatusJSON) {
    fetch(vaccinationStatusJSON, { mode: 'no-cors' })
        .then(response => {
            return response.json();
        })
        .then(data => {
            perBarangayStatus = data.Barangay;
            console.log(perBarangayStatus);

            // Sort the array alphabetically (barangayName).
            perBarangayStatus.sort((a, b) => b.barangayName.localeCompare(a.barangayName))
            populateDropBox(perBarangayStatus);
        })
        .catch(error => {
            console.error("Something went wrong with retrieving the data.");
        });
}

// Generate

// Andres-Madriaga src: https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
function generateCard(data, target) {
    let vaccineData = new Array();
    let registeredPopulation = 0;

    var dynamic = document.querySelector('.container_cards');
    for (var i = 0; i < data.length; i++) {

        var fetch = document.querySelector('.container_cards').innerHTML;

        // Generates the card with data.
        if (data[i].barangayName == target) {
            vaccineData = data[i].vaccineType;
            registeredPopulation = data[i].registeredApproximatePopulation;

            let totalDoses = computeDosesAdministered(data[i].vaccineType);
            let unvacc = registeredPopulation - totalDoses;

            dynamic.innerHTML =
                `
                <div class="cards" id="cardDiv" onclick="flip(event)">
                    <div class="card-front-content">
                        <div class="CityName">
                            <h2 class="carcases-h2">${data[i].barangayName}</h2>
                        </div>

                        <div class="DosesAdministered">
                            <p class="carcases-p"><b>${formatNumber(totalDoses)}</b></p>
                        </div>

                        <div class="Details">
                            <p class="carcases-d""><small>Click for more details.</small></p>
                        </div>
                    </div>

                    <div class="card-back-content"">
                        <div class="bar-container">
                            <h2 class="bar-title">--------------------------------------</h2>
                            <h2 class="bar-title">Unvaccinated</h2>
                        <div class="bar">

                        <div class="bar-inner" style="width: ${stringPercentage(unvacc, registeredPopulation).toString()}" data-percent="${stringPercentage(unvacc, registeredPopulation).toString()}"></div>
                    </div>
                </div>
                
                ` + fetch;
            console.log(vaccineData);
            generateBackCard(vaccineData, registeredPopulation);
        }

    }

};

// Madriaga
function generateBackCard(vaccineData, registeredPopulation) {
    const dynamic = document.querySelector('.bar-container');
    for (let i = 0; i < vaccineData.length; i++) {

        let doseSum = vaccineData[i].firstDose + vaccineData[i].secondDose;
        stringPercentage(doseSum, registeredPopulation);

        const fetch = document.querySelector('.bar-container').innerHTML;


        dynamic.innerHTML =
            `
                <h2 class="bar-title">${vaccineData[i].vaccineName}
                    <p> 1st Dose: ${formatNumber(vaccineData[i].firstDose)} + 2nd Dose: ${formatNumber(vaccineData[i].secondDose)} = ${formatNumber(doseSum)} Total Doses</p>
                </h2>
            
                <div class="bar">
                    <div class="bar-inner" style="width: ${stringPercentage(doseSum, registeredPopulation).toString()}" data-percent="${stringPercentage(doseSum, registeredPopulation).toString()}"> 
                    </div>
                </div>

            ` + fetch;
    }
};

// Populate

// Capistrano
function populateDropBox(data) {
    const dataArray = data;
    dataArray.sort();

    console.log(dataArray);

    const dynamic = document.querySelector('.options-container');

    for (let i = 0; i < data.length; i++) {
        const fetch = document.querySelector('.options-container').innerHTML;

        // Generates the options for the "Select Barangay" Drop Box
        dynamic.innerHTML =
            `<div class="option">
                <input type="radio" class="radio" id="${data[i].barangayName}" name="category" />
                <label for="${data[i].barangayName}">${data[i].barangayName}</label>
            </div>` + fetch;
    }
    selectOption(data);
}

// Select

// Capistrano src: https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/
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


// Compute

function computeDosesAdministered(data) {
    let sumB = 0;
    let sumA = 0;

    for (var i = 0; i < data.length; i++) {
        // Adds the first dose and second dose of a vaccine type.
        sumB = data[i].firstDose + data[i].secondDose;
        sumA += sumB; // Total Vaccine Administered
    }
    return sumA;
}

// Extra

// Madriaga src: https://3dtransforms.desandro.com/card-flip
function flip(event) { // Javascript Flip Event
    var element = event.currentTarget;
    if (element.className === "cards") {
        if (element.style.transform === "rotateY(0deg)") {
            element.style.transform = "rotateY(180deg)";
        } else {
            element.style.transform = "rotateY(0deg)";
        }


    }
};

// Salenga
function formatNumber(number) { // Converts the plain integer to a number with comma.
    return number.toLocaleString('en-US')
}

function stringPercentage(min, max) {
    let percentage = 100 * min / max;
    return (percentage.toFixed(2)) + "%";
}

function main() {
    getBarangayStatusFromJSON(vaccinationStatusJSON);
};


// Main

main();



