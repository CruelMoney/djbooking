$(document).ready(function(){$(".toggleButton").click(function(){$(this).parent().hasClass("multiButtonToggle")&&$(this).parent().children().removeClass("buttonToggled"),$(this).toggleClass("buttonToggled")})});