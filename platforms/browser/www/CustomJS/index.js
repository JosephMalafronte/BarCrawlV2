

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

    var totalLoads = 2;
    var currentLoads = 0;

    var barCards = [];
    var barCardsOA = [];

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
      createOA();
    });

    function createOA() {
        barCards.forEach(function(element) {
            console.log(element.barPictureUrl);
            var insert = {
                barName: element.barName,
                barPictureUrl: element.barPictureUrl,
                highlight1: element.highlight1
            }
            barCardsOA.push(insert);
        });
        checkPageLoad();
    }

    //Goes through each image and applies function on load
    function checkPageLoad() {
        $('.barCardPic').each(function() {
            $(this).on('load', function () {
                currentLoads++;
                if(currentLoads == totalLoads){
                    console.log("Images Loaded");
                    $('#pages_maincontent').removeClass('hiddenPage');
                    $('#pageLoader').addClass('centered-hidden');
                }
            });
        });
    }
    
    self.barCards = ko.observableArray(barCardsOA);
 
}

ko.applyBindings(new AppViewModel());


