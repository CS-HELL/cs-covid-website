var canvasElement = document.getElementById("covidChart");

var config = {
    type: "bar",
    data: {
        labels: [
                "CAR","Manila","Calabarzon", "Central luzon", 
                "Central Visayas","Western Visayas","Cagayan Valley",
                "Davao Region","Ilocos Region","Northern Mindanao",
                "SOCCSKSARGEN","Eastern Visayas","Caraga",
                "Zamboanga Peninsula","Bicol","MIMAROPA"
            ], 
        datasets: [{
            label: "Cases(Thousands)",
            data: [
                86, 841, 486,
                273, 150, 146,
                127, 103, 99,
                83, 57, 52,
                48, 47, 47,33],
            backgroundColor: [
                "rgba(255, 159, 64, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 159, 64, 1)"
            ],
        },
            
            {
            label: "Deaths(Thousands)", 
            data: [
                12, 100, 50,
                55, 42, 30,
                20, 15, 16,
                10, 10, 6,
                11, 8, 7, 7],
            backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)"
            ],
        
        },
         
        ],
 },
};

var covidChart = new Chart(canvasElement, config);