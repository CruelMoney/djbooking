<?php

$PageTitle="BOOK DJ";

function customPageHeader(){?>
  <!-- Custom html includes -->

<?php }
include_once('includes/header.php');
include_once('includes/nav.html');
?>

<!-- Content goes under here -->

  <h1>The chosen date is:
  </h1>
  <p id="id1">hej</p>

<script type="text/javascript">
    // Get the saved value from local storage
    var savedValue = localStorage.getItem('chosenDate');

     $('#id1').text(savedValue);
</script>

<?php
include_once('includes/footer.html');
?>
