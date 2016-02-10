$(document).ready(function(){
   var first = $('.registration li')[0];
   makeActive(first);
});

function makeActive(e){
  var li = $(e);

if($(".active")[0]){
  if($(".active").find( "input" )[0]){
  $(".active").find( "input" )[0].blur();
}
  $(".active").removeClass("active");
}

  //focus text input if found
  if(li.find( "input" )[0]){
    li.find( "input" )[0].focus();
  }

  li.toggleClass("active");
}

//Selecting pro account
$('#proYes').click(function() {
  $("#paymentForm").removeClass("hidden");
  setTimeout(scrollToNext, 200);
});
$('#proNo').click(function() {
  $("#paymentForm").addClass("hidden");
});

//When the list item is clicked make active
$('.registration li').click(function() {
  scrollTo($(this));
});

function scrollToNext(){
  var active = $(".active")[0];
  var next = $(active).next();
  scrollTo(next);
}

function scrollToPrev(){
  var active = $(".active")[0];
  var previous = $(active).prev("li");
   //Checking in parent. If nested list.
  if (!previous[0]) {
    previous = $(active).parent().prev("li");
  }
  scrollTo(previous);
}

//When enter, tab or down is pressed go to next item
$(document).keydown(function(e) {
    if(e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 40) {
      e.preventDefault();
      scrollToNext();
    //if up arrow
    }else if (e.keyCode == 38){
      e.preventDefault();
      scrollToPrev();
    }
});


//Scroll handler highlight
$(document).ready(function() {
  // Get viewport height, gridTop and gridBottom
  var windowHeight = $(window).height(),
    gridTop = windowHeight * 0.2,
    gridBottom = windowHeight * 0.4;

  $(window).on('scroll', function() {
    // On each scroll check if `li` is in interested viewport
    $('.registration li').each(function() {
      var thisTop = $(this).offset().top - $(window).scrollTop(); // Get the `top` of this `li`

      // Check if this element is in the interested viewport
      if (thisTop >= gridTop && thisTop <= gridBottom) {
        makeActive(this);
      }
    });
  });
});


//Scroll to element
function scrollTo(e){
var amount = e.offset().top;
var first = $('.registration li')[0];
var offset = $(first).offset().top;
$('html,body').animate({
      scrollTop: (amount - offset)
    },
    'fast');
}
