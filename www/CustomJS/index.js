
import barCard from '../Models/barCard.js';



var database = firebase.database();

var baseUrl = "";

var sliderPage = false;



$(document).ready(function(){
    var appName = "BarCrawl V2";

    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];



    //FastClick Activities
    var toolbarHome = document.getElementById("toolbarHome");
    FastClick.attach(toolbarHome);
    toolbarHome.addEventListener('click', function(event) {
        if(sliderPage == true){
            $(".slideInPage").animate({left: '100%'});
            sliderPage = false;
        }
    }, false);

    var toolbarSearch = document.getElementById("toolbarSearch");
    FastClick.attach(toolbarSearch);
    toolbarSearch.addEventListener('click', function(event) {
        window.location.href = "shop.html";
    }, false);

    

    
 });



function AppViewModel () {
    var self = this;

    var totalLoads = 6;
    var currentLoads = 0;

    var barCardsOA = [];

    var dayOfTheWeek = "Wednesday";


    

    //Database Get Bar Cards
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("barCards/" + dayOfTheWeek);
    urlRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        var data = child.val();
        var barCardInsert = new barCard(data.barName);
        barCardInsert.barId = data.barId;
        barCardInsert.barPictureUrl = data.barPictureUrl;
        barCardInsert.highlight1 = data.highlight1;
        barCardInsert.highlight2 = data.highlight2;
        barCardInsert.highlight1Icon = data.highlight1Icon;
        barCardInsert.highlight2Icon = data.highlight2Icon;
        self.barCards.push(barCardInsert);


        //FastClick setup
        var barCardClick = document.getElementById(data.barName);
        FastClick.attach(barCardClick);
    
        barCardClick.addEventListener('click', function(event) {
            console.log(data.barId);
            if(sliderPage === false){
                $(".slideInPage").animate({left: '0%'});
                sliderPage = true;
            }
        }, false);



      });
      checkPageLoad();
    });

    //Goes through each image and applies function on load
    function checkPageLoad() {
        $('.barCardPic').each(function() {
            $(this).on('load', function () {
                currentLoads++;
                if(currentLoads >= totalLoads){
                    console.log("Images Loaded");
                    $('#pages_maincontent').removeClass('hiddenPage');
                    $('#pageLoader').addClass('centered-hidden');
                }
            });
        });
    }
    
    self.barCards = ko.observableArray(barCardsOA);



    //Function called on barCard click. This = barCard object
    self.openBarPage = function () {

        sliderPage = true;
        $(".slideInPage").animate({left: '0%'});
        console.log(this.barId);
    }

    
}

ko.applyBindings(new AppViewModel());


