var totalCases, totalDeaths;

// Ferrer-Napeek
fetch("./res/barangayDataFile.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){

       var sumCases=0;
       var sumDeaths=0;
       for(count = 0; count<data.Barangay.length; count++){
        showGraph(data.Barangay[count].barangayName,count,JSON.parse(data.Barangay[count].cases),JSON.parse(data.Barangay[count].deaths));
        
        var readCases = JSON.parse(data.Barangay[count].cases);
        sumCases = sumCases+readCases;
        
        var readDeaths = JSON.parse(data.Barangay[count].deaths);
        sumDeaths = sumDeaths+readDeaths;
       }
       totalCases = sumCases;
       totalDeaths = sumDeaths;
    });

function changePosition(count){
    var y = 180*(count+0.6);
    return y;
}

// Ferrer
function showGraph(barangay,count,casesData,deathsData){

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//cases
ctx.fillStyle = "#F7D358"; //cases indicate
ctx.fillRect(90, 10, 30,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //cases
ctx.fillText("Cases", 130, 35); //text, x , y

//deaths
ctx.fillStyle = "#FA5858"; //deaths indicate
ctx.fillRect(320, 10, 30,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //deaths
ctx.fillText("Deaths", 359.5, 35); //text, x , y

//

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //barangay
ctx.fillText(barangay, 10, changePosition(count)); //text, x , y

ctx.fillStyle = "#F7D358"; //cases
ctx.fillRect(10, changePosition(count)+40, casesData,20); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "20px Arial"; //Number of Cases
ctx.fillText(casesData, 10, changePosition(count)+35); //text, x , y

ctx.fillStyle = "#FA5858"; //deaths
ctx.fillRect(10, changePosition(count)+100, deathsData,20); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "20px Arial"; //Number of Cases
ctx.fillText(deathsData, 10, changePosition(count)+97); //text, x , y

}

function totalCasesButton(casesData){
    casesData = totalCases;
    alert("Total Number of Covid Cases in Baguio City: " + casesData);
}

function totalDeathsButton(deathsData){
    deathsData = totalDeaths;
    alert("Total Number of Covid Deaths in Baguio City: " + deathsData);
}