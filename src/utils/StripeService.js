import Stripe from 'Stripe'

Stripe.setPublishableKey('pk_test_9HMoU3Zkhtu5aoXTYWDgmEgp')

export default Stripe

//Examples of token generation:

// Stripe.card.createToken({
//   number: $('.card-number').val(),
//   cvc: $('.card-cvc').val(),
//   exp_month: $('.card-expiry-month').val(),
//   exp_year: $('.card-expiry-year').val()
// }, stripeResponseHandler);

// Stripe.bankAccount.createToken({
//   country: $('.country').val(),
//   currency: $('.currency').val(),
//   routing_number: $('.routing-number').val(),
//   account_number: $('.account-number').val(),
//   account_holder_name: $('.name').val(),
//   account_holder_type: $('.account_holder_type').val()
// }, stripeResponseHandler);



//Example of responsehandler implementation

// function stripeResponseHandler(status, response) {
//
//   // Grab the form:
//   var $form = $('#payment-form');
//
//   if (response.error) { // Problem!
//
//     // Show the errors on the form
//     $form.find('.payment-errors').text(response.error.message);
//     $form.find('button').prop('disabled', false); // Re-enable submission
//
//   } else { // Token was created!
//
//     // Get the token ID:
//     var token = response.id;
//
//     // Insert the token into the form so it gets submitted to the server:
//     $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//
//     // Submit the form:
//     $form.get(0).submit();
//
//   }
// }
