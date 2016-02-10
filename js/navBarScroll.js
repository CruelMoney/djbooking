 var nav =  $("#navbar1");
 var doc =  $(document);
 var offset = nav.offset().top;

 if (offset === 0) {
 nav.addClass("navbar-fixed");
 }

doc.on('scroll', function() {
  if (doc.scrollTop() > offset || offset === 0) {
  nav.css("top", "0");
  nav.addClass("navbar-fixed");
  } else {
    nav.removeClass("navbar-fixed");
    nav.css("top", offset);
  }
});
