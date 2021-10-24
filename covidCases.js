var totalCases, totalDeaths;

fetch("./barangayData.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
       var barangayList = data.barangay;
       var sumCases=0;
       var sumDeaths=0;
       for(count = 0; count<barangayList.length; count++){
        showGraph(data.barangay[count],count,JSON.parse(data.cases[count]),JSON.parse(data.deaths[count]));
        
        var readCases = JSON.parse(data.cases[count]);
        sumCases = sumCases+readCases;

        var readDeaths = JSON.parse(data.deaths[count]);
        sumDeaths = sumDeaths+readDeaths;
       }
       totalCases = sumCases;
       totalDeaths = sumDeaths;
    });

function changePosition(count){
    var y = 200*(count+1);
    return y;
}

function showGraph(barangay,count,casesData,deathsData){

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//cases
ctx.fillStyle = "#F7D358"; //cases indicate
ctx.fillRect(262.5, 10, 30,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //cases
ctx.fillText("Cases", 300, 35); //text, x , y

//deaths
ctx.fillStyle = "#FA5858"; //deaths indicate
ctx.fillRect(525, 10, 30,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //deaths
ctx.fillText("Deaths", 562.5, 35); //text, x , y

//

ctx.fillStyle = "#101907"; //font color
ctx.font = "30px Arial"; //barangay
ctx.fillText(barangay, 10, changePosition(count)); //text, x , y

ctx.fillStyle = "#F7D358"; //cases
ctx.fillRect(10, changePosition(count)+40, casesData,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "20px Arial"; //Number of Cases
ctx.fillText(casesData + "K", 10, changePosition(count)+35); //text, x , y

ctx.fillStyle = "#FA5858"; //deaths
ctx.fillRect(10, changePosition(count)+100, deathsData,30); // x , y , width , height

ctx.fillStyle = "#101907"; //font color
ctx.font = "20px Arial"; //Number of Cases
ctx.fillText(deathsData + "K", 10, changePosition(count)+97); //text, x , y

}

function totalCasesButton(casesData){
    casesData = totalCases;
    alert("Total Number of Covid Cases in CAR: " + casesData);
}

function totalDeathsButton(deathsData){
    deathsData = totalDeaths;
    alert("Total Number of Covid Deaths in CAR: " + deathsData);
}