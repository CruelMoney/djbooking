<?php

$PageTitle="REGISTER AS DJ";

function customPageHeader(){?>

  <?php }
include_once('includes/header.php');
include_once('includes/nav.html');
?>

    <script type="text/javascript" src="js/navBarScroll.js"></script>

    <!--container-->
    <div class="contentContainer">
      <ol type="1" class="registration">
        <li class="li">NAME
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="input">
              <h3>
      <input class="" type="text" autocomplete="off" ></input>
             </h3>
            </div>
          </div>

        </li>
        <li class="li">EMAIL
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="input">
              <h3>
      <input class="" type="text" autocomplete="off" ></input>
    </h3>
            </div>
          </div>
        </li>
        <li class="li">LOCATION
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="input">
              <h3>
            <input id="search" type="text" placeholder="">
          </h3>
            </div>
          </div>
        </li>
        <li class="li">GENRES
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="row">
              <div class="col-md-6">
                <?php include 'includes/genres.html';?>
              </div>
            </div>

          </div>
        </li>
        <li class="li">EXPERIENCE
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="input">
              <div id="slider-experience" class="slider noUi-extended"></div>
            </div>
            <h5>
    <span id="experienceValue" class="mid"></span>
  </h5>
          </div>
        </li>
        <li class="li">COST
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="input">
              <div id="slider-cost" class="slider noUi-extended"></div>
            </div>
            <h5>
    <span id="costValue" class="mid"></span>
  </h5>
          </div>
        </li>
        <li class="li">PRO
          <div class="registrationItem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
            <div class="row">
              <div class="col-md-4">
                <div class="multiButtonToggle">
                  <button  id="proNo" type="button" class="customButton toggleButton radiusLeft">
                    NO
                  </button>
                  <button id="proYes" type="button" class="customButton toggleButton radiusRight">
                    YES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>


        <ol id="paymentForm" type="a" class="registration hidden">
          <li class="li"><span><svg version="1.1" class="padlock-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="19px" viewBox="22.066 66.396 14.332 19" enable-background="new 22.066 66.396 14.332 19" xml:space="preserve">
<g>
	<path d="M35.398,75.396h-0.667v-3.334h-0.008c0.002-0.055,0.008-0.11,0.008-0.167c0-3.036-2.462-5.499-5.501-5.499
		c-3.035,0-5.498,2.463-5.498,5.499c0,0.057,0.005,0.112,0.006,0.167h-0.006v3.334h-0.669c-0.551,0-0.999,0.448-0.999,0.999v8
		c0,0.553,0.447,1.001,0.999,1.001h12.334c0.552,0,1-0.448,1-1.001v-8C36.398,75.845,35.951,75.396,35.398,75.396z M32.066,72.062
		v3.334h-5.668v-3.334h0.01c-0.003-0.055-0.01-0.11-0.01-0.167c0-1.563,1.269-2.832,2.833-2.832c1.564,0,2.835,1.269,2.835,2.832
		c0,0.057-0.006,0.112-0.008,0.167H32.066z"></path>
</g>
</svg>Name on your card</span>
            <div class="registrationItem">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et.</p>
              <div class="input">
                <h3>
              <input class="" type="text" autocomplete="off" ></input>
              </h3>
              </div>
            </div>
          </li>
          <li class="li"><span><svg version="1.1" class="padlock-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="19px" viewBox="22.066 66.396 14.332 19" enable-background="new 22.066 66.396 14.332 19" xml:space="preserve">
<g>
	<path d="M35.398,75.396h-0.667v-3.334h-0.008c0.002-0.055,0.008-0.11,0.008-0.167c0-3.036-2.462-5.499-5.501-5.499
		c-3.035,0-5.498,2.463-5.498,5.499c0,0.057,0.005,0.112,0.006,0.167h-0.006v3.334h-0.669c-0.551,0-0.999,0.448-0.999,0.999v8
		c0,0.553,0.447,1.001,0.999,1.001h12.334c0.552,0,1-0.448,1-1.001v-8C36.398,75.845,35.951,75.396,35.398,75.396z M32.066,72.062
		v3.334h-5.668v-3.334h0.01c-0.003-0.055-0.01-0.11-0.01-0.167c0-1.563,1.269-2.832,2.833-2.832c1.564,0,2.835,1.269,2.835,2.832
		c0,0.057-0.006,0.112-0.008,0.167H32.066z"></path>
</g>
</svg>Please enter your Card number</span>
<div class="registrationItem">
  <div class="input">
    <h3>
  <input class="" type="number" autocomplete="off" ></input>
  </h3>
  </div>
</div>
          </li>
          <li class="li"><span><svg version="1.1" class="padlock-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="19px" viewBox="22.066 66.396 14.332 19" enable-background="new 22.066 66.396 14.332 19" xml:space="preserve">
<g>
	<path d="M35.398,75.396h-0.667v-3.334h-0.008c0.002-0.055,0.008-0.11,0.008-0.167c0-3.036-2.462-5.499-5.501-5.499
		c-3.035,0-5.498,2.463-5.498,5.499c0,0.057,0.005,0.112,0.006,0.167h-0.006v3.334h-0.669c-0.551,0-0.999,0.448-0.999,0.999v8
		c0,0.553,0.447,1.001,0.999,1.001h12.334c0.552,0,1-0.448,1-1.001v-8C36.398,75.845,35.951,75.396,35.398,75.396z M32.066,72.062
		v3.334h-5.668v-3.334h0.01c-0.003-0.055-0.01-0.11-0.01-0.167c0-1.563,1.269-2.832,2.833-2.832c1.564,0,2.835,1.269,2.835,2.832
		c0,0.057-0.006,0.112-0.008,0.167H32.066z"></path>
</g>
</svg>The CVC number</span>
            <div class="registrationItem">
              <p>(3 or 4 digit security number on the back of your card)</p>
              <div class="input">
                <h3>
              <input class="" type="number" autocomplete="off" ></input>
              </h3>
              </div>
            </div>
          </li>
          <li class="li"><span><svg version="1.1" class="padlock-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="19px" viewBox="22.066 66.396 14.332 19" enable-background="new 22.066 66.396 14.332 19" xml:space="preserve">
<g>
	<path d="M35.398,75.396h-0.667v-3.334h-0.008c0.002-0.055,0.008-0.11,0.008-0.167c0-3.036-2.462-5.499-5.501-5.499
		c-3.035,0-5.498,2.463-5.498,5.499c0,0.057,0.005,0.112,0.006,0.167h-0.006v3.334h-0.669c-0.551,0-0.999,0.448-0.999,0.999v8
		c0,0.553,0.447,1.001,0.999,1.001h12.334c0.552,0,1-0.448,1-1.001v-8C36.398,75.845,35.951,75.396,35.398,75.396z M32.066,72.062
		v3.334h-5.668v-3.334h0.01c-0.003-0.055-0.01-0.11-0.01-0.167c0-1.563,1.269-2.832,2.833-2.832c1.564,0,2.835,1.269,2.835,2.832
		c0,0.057-0.006,0.112-0.008,0.167H32.066z"></path>
</g>
</svg>The card's expiry date</span>
<div class="registrationItem">
  <div class="input">
    <h3>
  <input class="" type="number" autocomplete="off" ></input>
  </h3>
  </div>
</div>

          </li>
        </ol>
      </ol>





    </div>

    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCwCiqFe4TpFFXw51ZuZcn_AABXQ84X3bw">
    </script>


    <script type="text/javascript">
      var autoComplete = new google.maps.places.Autocomplete(
        document.getElementById('search'), {
          types: ['(cities)']
        });





      var slider = document.getElementById('slider-experience');
      var experienceLevels = ['0 Gigs', '1 Gig', 'Less than 10 Gigs', 'Around 20 Gigs', 'Around 50 Gigs', 'Around 70 Gigs', 'Around 100 Gigs', 'More than 100 Gigs'];

      noUiSlider.create(slider, {
        start: [1],
        connect: "lower",
        range: {
          'min': [0],
          'max': [7]
        },
        step: 1,
        format: wNumb({
          decimals: 0,
        })

      });
      slider.noUiSlider.on('update', function(values, handle) {
        $('#experienceValue').text(experienceLevels[parseInt(values[0])]);
      });


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
        $('#costValue').text("Minimum " + values[0]);
      });
    </script>

    <script type="text/javascript" src="js/registrationForm.js"></script>


    <?php
include_once('includes/footer.html');
?>
