// Javascript and jquery for crystal collector

$(document).ready(function() {

// Perform initialize tasks
// Variables

var topics = ["Bette Davis"
              ,"Andie MacDowell"
              ,"Joan Crawford"
              ,"Audrey Hepburn"
              ,"Lauren Bacall"
              ,"Viola Davis"
              ,"Ingrid Bergman"
              ,"Humphrey Bogart"
              ,"Morgan Freeman"
              ,"Barbara Stanwyck"
              ,"Rosalind Russell"
              ,"Cary Grant"
              ,"Octavia Spencer"
              ,"Henry Fonda"
              ,"Alfre Woodard"
              ,"Judi Dench"
              ,"Maggie Smith"
              ,"Myrna Loy"
              ,"Sean Connery"
              ,"James Stewart"
              ,"Colin Firth"
              ,"Emma Thompson"
            ] 

var giphyAPI = "43065f9480474dc59e886b09dd594d2a";
var currentStar = "";

//********** Stuff to run at load time

loadButtons();;

//********* Events 
//********* Events 
//********* Events 

// Populate gifs when a star's button is clicked
$(document).on("click", ".starButton", function() {

  //checked to see if button has already been clicked
  //sad means they are not in the display area
  if ($(this).attr("id") === currentStar) {
    return;
  } else {

    currentStar = $(this).attr("id");
    $(".gifs").empty(); 
    $(".starButton").toggleClass("buttonBackground", false);
    $(this).toggleClass("buttonBackground", true);
    var actor = ($(this).attr("data-name")).split(' ').join('+');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPI 
                                                     + "&limit=10" 
                                                     + "&q=" + actor +'"';

    // ajax to talk to giphy                                                
    $.ajax({
       url: queryURL
      ,method: "GET"
    }).done(function(response) {
      
      //console.log(response);
      //console.log(queryURL)

      if (response.data.length === 0) {

        var badStar = $("<div><h3 class='lbl'>" + actor + 
          " does not shine so brightly.  Try another star." +
          "</h3></div>");

        $(".gifs").append(badStar);
        return;
      }

      for (var i = 0; i < response.data.length; i++) {
        var staticLink = response.data[i].images.fixed_height_still.url;
        var actionLink = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;
 
        var imgDiv = $("<div>");
  
        var ratingTxt = $("<p>");
        ratingTxt.addClass("ratingTxt");
        ratingTxt.html("Rating: " + rating + "<br>"); 

        var starImg = $("<img>").attr("src", staticLink);
        starImg.addClass("starImg");
        starImg.attr("data-actionlink", actionLink );
        starImg.attr("data-staticlink", staticLink);
        starImg.attr("data-status", "static");
        starImg.attr("alt", "star image");

        ratingTxt.append(starImg);  
        imgDiv.append(ratingTxt); 
     

        $(".gifs").append(imgDiv);
      }
  })

}

}) // *********** end of starButton button


//click on a star - activate gif/deactivate giv
$(document).on("click", ".starImg", function() {
  

  var changeLink = "";

  if ($(this).attr("data-status") === "static") {
    changeLink = $(this).attr("data-actionlink");
    $(this).attr("src", changeLink);
    $(this).attr("data-status", "active");
  } else {
    changeLink = $(this).attr("data-staticlink");
    $(this).attr("src", changeLink);
    $(this).attr("data-status", "static");
  }

}) //end of starimage gif action

//Add a star (on anything haha)
//$(document).on("click", "#addStar", function() {
$("#addStar").on("click", function() {

  event.preventDefault();

  var newStar = $("#starInput").val().trim();

  //check to see if nothing entered
  if (!newStar) {
    return;
  } else {
    topics.push(newStar);
    loadButtons();
  }

  $("#starInput").val("");

})  //end of add star

//**********  Functions  **********
//**********  Functions  **********
//**********  Functions  **********

// Loads the buttons
function loadButtons() {

  $(".buttons").empty();
  $.each(topics, function(index, value) {

     //Create a button and add to 
    var b = $("<button>");
    b.addClass("btn btn-group btn-sm starButton");
    b.attr("data-name", value);
    b.attr("id", value);  
    b.text(value);
    $(".buttons").append(b);

  })  // end of each loop
} //********** end of loadbuttons


})  //********** end of document ready