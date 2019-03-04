
import barCard from '../Models/barCard.js';
import barPage from '../Models/barPage.js';
import barPageO from '../Models/barPageO.js';


var database = firebase.database();

var baseUrl = "";

var sliderPage = false;

var barPageSlider = new barPageO();


$(document).ready(function(){
    var appName = "BarCrawl V2";

    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];



    //FastClick Activities
        var toolbarHome = document.getElementById("toolbarHome");
        FastClick.attach(toolbarHome);
        toolbarHome.addEventListener('click', function(event) {
            if(sliderPage == true){
                closeBarPage();
                sliderPage = false;
            }
        }, false);

        var toolbarSearch = document.getElementById("toolbarSearch");
        FastClick.attach(toolbarSearch);
        toolbarSearch.addEventListener('click', function(event) {
            window.location.href = "shop.html";
        }, false);

    

    
 });

function closeBarPage () {
    $(".slideInPage").animate({left: '100%'});
    $(".slideCentered").animate({left: '150%'});
    $(".slideCentered-hidden").animate({left: '150%'});
}



function AppViewModel () {
    var self = this;

    //Initial Variables
    var totalLoads = 6;
    var currentLoads = 0;
    var barCardsOA = [];
    var dayOfTheWeek = "Wednesday";


    //Declare barPageSlider Variables
    self.barPageName = ko.observable("");
    self.barPageId = ko.observable(0);
    self.barPageImage1Url = ko.observable("");
    

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
                self.openBarPage(data.barId);
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



    //Function called on barCard click. 
    self.openBarPage = function (barId) {
        $('#slideLoader').addClass('slideCentered').removeClass('slideCentered-hidden');
        $(".slideInPage").animate({left: '0%'});
        $(".slideCentered").animate({left: '50%'});
        $(".slideCentered-hidden").animate({left: '50%'});

        $('#barPageImage1').on('load', function () {
            $('#slideLoader').addClass('slideCentered-hidden').removeClass('slideCentered');
            $('#slider_maincontent').removeClass('hiddenPage');
        }).each(function(){
            //Just here to trigger load if image is cache. 
            //Does not actually redownload image just calls function
            if(this.complete) {
              $(this).trigger('load');
            }
        });



        var urlRefBarPage = rootRef.child("barPages/" + barId.toString());
        urlRefBarPage.once("value", function (snapshot) {
            var data = snapshot.val();
            self.barPageName(data.barName);
            self.barPageId(data.barId);
            self.barPageImage1Url(data.barPicture1Url);

            console.log(data);
        });
        
    }

    

    
}

ko.applyBindings(new AppViewModel());


