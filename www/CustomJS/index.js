

import barCard from '../Models/barCard.js';

var database = firebase.database();

var baseUrl = "";

$(document).ready(function(){
    var appName = "BarCrawl V2";

    var getUrl = window.location;
    baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];


 });

$("#barCard").click(function (){
    window.location.replace("/shop.html");
});

function AppViewModel () {
    var self = this;

    var barCards = [];

    var dayOfTheWeek = "Wednesday";

    //Database Get Bar Cards
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("barCards/" + dayOfTheWeek);
    urlRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        var data = child.val();
        var barCardInsert = new barCard(data.barName);
        barCardInsert.barPictureUrl = data.barPictureUrl;
        barCardInsert.highlight1 = data.highlight1;
        self.barCards.push(barCardInsert);
      });
    });

    

    var barCardsOA = [];

    barCards.forEach(function(element) {
        console.log(element.barPictureUrl);
        var insert = {
            barName: element.barName,
            barPictureUrl: element.barPictureUrl,
            highlight1: element.highlight1
        }
        barCardsOA.push(insert);
    });

 
    self.barCards = ko.observableArray(barCardsOA);
 
}

ko.applyBindings(new AppViewModel());


