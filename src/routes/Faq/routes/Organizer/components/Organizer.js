import React, {Component} from 'react';
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'


export default class Organizer extends Component{
  themeColor = "#31DAFF"

  render() {
    return (
      <div>
      <h1>Questions and answers</h1>
      <p className="subtitle">For organizers</p>
       <CollapsibleContainer
       changeHash
        >
             <Collapsible
                  label="How much does it cost?"  
                > 
                <p>
                    At Cueup the DJs set their own prices, therefore we can't guarentee finding a DJ within your budget. 
                    It will help a lot if you write what your budget is when posting the event. 
                    <br/>
                    In addition to the price offered by the DJ, a service fee will be added. 
                    This service fee is what keeps the platform running. 
                    The fee will depend on the DJs offer, and is calculated primarily based on the original price set by the DJ. 
                  </p>
                </Collapsible>
                <Collapsible
                  label="Is it safe?"> 
                    <p>
                        The booking process at Cueup is very safe. 
                        When choosing between offers from the DJs, you can see previous reviews, their average rating and pictures. 
                        That way you can choose a DJ that you trust. 
                        <br/>
                        In the case that a DJ cancels all your money will be refunded. 
                        If you are not satisfied for some other reason, please contact us and we will do our best to help your case.
                    </p>
                </Collapsible>
                <Collapsible
                  label="Where are the DJs available?"> 
                    <p>
                        DJs can be located all over the world, but currently we are focusing on growing in Denmark.
                        When posting an event, you will get notified if no DJs could be found in the area. 
                    </p>
                </Collapsible>
               <Collapsible
                  label="Can I contact the DJ before booking?"> 
                    <p>
                        Yes. When receiving an offer, you get the contact information for the DJ, including email and phone number.
                        You can then contact the DJ to discuss the price for example.  
                    </p>
                </Collapsible>
                <Collapsible
                  label="What if the DJ cancels?"> 
                    <p>
                        If the DJ cancels all your money will be refunded. 
                        Then we will do our best to get you a new DJ as quickly as possible.
                        If you had multiple offers before confirming the DJ, you will be able to choose and confirm a new DJ. 
                    </p>
                </Collapsible>
                <Collapsible
                label="What if I cancel the event?"> 
                  <p>
                      If you cancel the event, your money will be refunded in regards to the DJs cancelation policy. 
                      An example of a cancelation policy would be a 50% refund if cancelled less than 2 days before event, otherwise 100% refund.
                  </p>
              </Collapsible>
                  <Collapsible
                  label="What happens if the DJ does not show up?"> 
                    <p>
                        If the DJ does not show up, contact us immediately and we will try to find a solution.
                        All money will be refunded if the DJ does not show up.   
                    </p>
                </Collapsible>
              <Collapsible
                label="What to do if the DJ want's to get paid under the table?"> 
                  <p>
                      If the DJ asks if you can pay in another way than using Cueup, you should refuse. 
                      The payment process at Cueup ensures safety for both you and the DJ. 
                      If the event is not paid through Cueup, we won't be able to help you if a DJ cancels.
                  </p>
              </Collapsible>
                <Collapsible
                  label="How many offers do I get?"> 
                    <p>
                        We aim to give you 3 offers but you might receive up to 5. 
                    </p>
                </Collapsible>
                <Collapsible
                  label="The money has not been charged from my card yet?"> 
                    <p>
                        It can be up to seven days for the charge to appear. 
                        If you have received an email confirming the charge, and the event is marked as confirmed, the DJ has been confirmed succesfully.
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I change the location or time of my event?"> 
                    <p>
                        No. In case that the location or time changes, remember to tell the DJ. 
                        If the DJ is not able to play at the new location, you'll have to cancel the event and post a new event at the new location.
                    </p>
                </Collapsible>
                <Collapsible
                  label="I need a receipt including VAT."> 
                    <p>
                        When an event is paid, Cueup will send an initial receipt showing the total amount paid and the VAT ONLY of the service fees.
                        It is the responsibility of the DJs to provide a receipt showing VAT of their part of the offer. 
                    </p>
                </Collapsible>
              </CollapsibleContainer>
      </div>

    )
  }
}
