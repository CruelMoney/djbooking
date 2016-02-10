<?php

$PageTitle="DJ BOOKING SITE";

function customPageHeader(){?>

<?php }
include_once('includes/header.php');
include_once('includes/nav.html');
?>

<!-- Fix navbar on scroll -->
<script type="text/javascript" src="js/navbarTop10px.js"></script>
<script type="text/javascript" src="js/navBarScroll.js"></script>


<div class="fullWidthDiv">
  <div class="hero">
    <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-5 col-md-push-5">
      <h5>
        <strong>Lorem</strong> ipsum dolor sit amet, consectetur adipisicing elit. <strong>Consequuntur</strong> ipsam ut eum nihil consectetur, dignissimos dolor reiciendis repellendus dolore repellat <strong>quasi</strong> adipisci quidem, id accusamus ducimus autem <strong>ratione</strong>, obcaecati aut.
      </h5>
    </div>
    <div class="col-md-5 col-md-pull-5">
      <div class="calendarContainer">
        <div class="dateContainer">
            <h5 style="text-align: center">Pick date of event</h5>
          <div id="datetimepicker"> </div>
          <button type="button" class="customButton radiusBoth white" id="goButton">
            GO!
          </button>
        </div>
      </div>
    </div>
      <div class="col-md-1"></div>
  </div>
</div>
</div>





<div class="container hidden">
<div  id="filterContainer"  class="container filter-container">





<div class="mainBox col-md-5">


  <div class="inputBlock">
        <h5>
          <input id="date" class="flaoting" placeholder="Event date" type="text" autocomplete="off" spellcheck="false" ></input>
        </h5>
    <p class="caption">The date of your event. To change it select a new date in the calendar.</p>
  </div>

  <div class="inputBlock">
        <h5>
          <input id="eventName" class="flaoting" placeholder="Event name" type="text" autocomplete="off" spellcheck="false"></input>
        </h5>
    <p class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </div>

  <div class="inputBlock">
      <div class="input">
        <h5>
        <div class="search-container">
          <input id="search" type="text" placeholder="Event city">
        </div>
      </h5>

    </div>
    <p class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </div>

  <div class="inputBlock">
      <div class="input">
        <h5>
          <input class="" type="text" placeholder="Your name" autocomplete="off" spellcheck="false"></input>
      </h5>
    </div>
    <p class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </div>

  <div class="inputBlock">
      <div class="input">
        <h5>
          <input class="" type="text"  placeholder="Your mail" autocomplete="off" spellcheck="false" data-toggle="tooltip" data-placement="bottom" title="The matched DJs will recieve your email for responding to your request."></input>
      </h5>
    </div>
    <p class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

  </div>



</div>



<div class="subBox col-md-4">

  <div class="left-Column">
    <h5 data-toggle="tooltip" title="What genres of music would you like to have played. Requested DJs will match half or more of the genres.">Genres</h5>

  <?php include 'includes/genres.html';?>


  <h5 data-toggle="tooltip" title="Do you have speakers for the event, or does the DJ need to bring some. This will probably affect the price of the DJ.">Speakers</h5>

<div class="multiButtonToggle">
  <button type="button" class="customButton toggleButton radiusLeft">
    No
  </button>
  <button type="button" class="customButton toggleButton" >
    Not sure
  </button>
  <button type="button" class="customButton toggleButton radiusRight">
    Yes
  </button>
</div>
</div>

</div>


<div class="subsubBox col-md-3">
  <div class="right-Column">
    <div class="filter-block">
      <h5 data-toggle="tooltip" title="In what period of time do you want music. This often affects the DJs price greatly.">Time</h5>
      <div class="row">
        <div id="slider-time" class="slider noUi-extended"></div>
      </div>
      <div class="row">
        <p class="caption">
      <span id="timeMin" class="min"></span>
      <span id="time" class="mid"></span>
      <span id="timeMax" class="max"></span>
    </p>
      </div>
    </div>
    <div class="filter-block">
      <h5 data-toggle="tooltip" title="What is the maximum total amount of money you will spend on the DJ. Remember quality often follows price.">Cost</h5>
      <div class="row">
        <div id="slider-cost" class="slider noUi-extended"></div>
      </div>
      <div class="row">
        <p class="caption">
      <span id="costMax" class="min"></span>
    </p>
      </div>
    </div>
    <div class="filter-block">
      <h5 data-toggle="tooltip" title="How many guests do you expect to be at the party.">Guests</h5>
      <div class="row">
        <div id="slider-guests" class="slider noUi-extended"></div>
      </div>
      <div class="row">
        <p class="caption">
      <span id="guests" class="min"></span>
    </p>
      </div>
    </div>
  </div>
</div>


</div>


<div class="center">
  <div class="col-md-5">
    <button id="requestButton" class="customButton important radiusBoth">Request DJ</button>
  </div>
</div>


  <div class="thank-you-container hidden">
      <h2>Thank you for using CPH DJ</h2>
      <div class="lead caption">You will recieve a confirmation email</div>
  </div>



<script type="text/javascript"
src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCwCiqFe4TpFFXw51ZuZcn_AABXQ84X3bw">
</script>


<script type="text/javascript">
var autoComplete = new google.maps.places.Autocomplete(
document.getElementById('search'), {
  types: ['(cities)']
});
</script>


</div>
<!--container end-->




<?php
include_once('includes/footer.html');
?>

<script type="text/javascript">
//Hide footer
$(".footer").addClass("hidden");
</script>
