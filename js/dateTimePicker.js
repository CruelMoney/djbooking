$(document).ready(function() {

  $(function() {
    $('#datetimepicker').datetimepicker({
      inline: true,
      minDate: new Date(),
      format: "d MMMM YYYY",
      widgetPositioning: {
        horizontal: 'auto',
        vertical: 'auto'
      }
    });
  });


  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  //Get date and format it
  var minDate = moment().hour(12).minutes(0);
  var maxDate = moment(minDate).hour(32);

  createTimeSlider(minDate, maxDate);

  //setting the label date
  $('#date').val(minDate.format("dddd Do, MMMM YYYY"));


  // Add click handler to button
  $('#goButton').click(function() {
    $(".container").removeClass("hidden");
    $(".footer").removeClass("hidden");

    function scrollDown() {
      $('#filterContainer').velocity('scroll', {
            duration: 500,
            offset: -50,
            easing: 'ease-in-out'
    });

  }

    function moveBoxes() {
      $(".mainBox").velocity({translateX: "100px"}, 800);
      $(".subBox").velocity({translateX: "-100px"}, 800);
      $(".subsubBox").velocity({translateX: "-100px"}, 1200);
      $('#requestButton').velocity({  p: { opacity: 1}, o: { duration: 500 }});
    }

      scrollDown();
      moveBoxes();



    function focusEventName() {
      $("#eventName").focus();
    }
    setTimeout(focusEventName, 1000);

  });









  // Add click handler to request button
  $('#requestButton').click(function() {

    function moveBoxes() {
      $(".thank-you-container").css({transform: 'translateY(-500px)'});
      $(".thank-you-container").removeClass("hidden");
      $(".subsubBox").velocity({translateX: "-2000px"}, 1500);
      $(".subBox").velocity({translateX: "-1500px"}, 1500);
      $(".mainBox").velocity({translateX: "-1000px"}, 1500);
      $('#requestButton').velocity({  p: { opacity: 0 }, o: { duration: 500 }});
    }

    moveBoxes();



  });









  $('#datetimepicker').on("dp.change", function(e) {
    var minDate = e.date.hour(12).minutes(0);
    var maxDate = moment(minDate).hour(32);

    updateSliderRange(minDate, maxDate);

    //setting the label date
    $('#date').val(minDate.format("dddd Do, MMMM YYYY"));

  });


  function createTimeSlider(minDate, maxDate) {
    var timeSlider = document.getElementById('slider-time');

    $('#slider-time').addClass('exists');

    noUiSlider.create(timeSlider, {
      connect: true,
      range: {
        min: minDate.toDate().getTime(),
        max: maxDate.toDate().getTime()
      },

      // Steps of half hour
      step: 30 * 60 * 1000,

      // Two more timestamps indicate the handle starting positions.
      start: [minDate.hour(21).toDate().getTime(), maxDate.hour(03).toDate().getTime()],

      format: wNumb({
        decimals: 0
      })

    });

    timeSlider.noUiSlider.on('update', function(values, handle) {
      $('#timeMin').text("Start " + moment(Number(values[0])).format("HH:mm"));
      $('#timeMax').text("End " + moment(Number(values[1])).format("HH:mm"));
      $('#time').text(moment(Number(values[1])).diff(moment(Number(values[0])), "hours") + " Hours");
    });

  }


  function updateSliderRange(min, max) {


  }






  var costSlider = document.getElementById('slider-cost');

  noUiSlider.create(costSlider, {
    start: [1000],
    connect: "lower",
    range: {
      'min': [0],
      '50%': [4000],
      '80%': [10000],
      'max': [20000]
    },
    step: 50,
    format: wNumb({
      decimals: 0,
      thousand: ".",
      postfix: " Kr."
    })

  });
  costSlider.noUiSlider.on('update', function(values, handle) {
    $('#costMax').text("Max " + values[0]);
  });



  var guestSlider = document.getElementById('slider-guests');

  noUiSlider.create(guestSlider, {
    start: [100],
    connect: "lower",
    range: {
      'min': [1],
      '50%': [150],
      'max': [1000]
    },
    format: wNumb({
      decimals: 0,
      thousand: ".",
      postfix: " People"
    })
  });
  guestSlider.noUiSlider.on('update', function(values, handle) {
    $('#guests').text("Around " + values[handle]);
  });



  //Binding the values





});
