
$.getScript('../Models/barCard.js');


var baseUrl = "";
var barCard1;

$(document).ready(function(){
    console.log("Test");
    var appName = "BarCrawl V2";

    var getUrl = window.location;
    baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

    barCard1 = new barCard;
    barCard1.barName = "Galletes";
 });

$("#barCard").click(function (){
    window.location.replace("/shop.html");
});

