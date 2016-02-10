$(document).ready(function() {
    // Add click handler to button
    $('.toggleButton').click(function() {
if ($(this).parent().hasClass('multiButtonToggle')){
  $(this).parent().children().removeClass("buttonToggled");
}
      $(this).toggleClass("buttonToggled");
    });



});
