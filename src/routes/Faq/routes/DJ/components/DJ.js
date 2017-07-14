import React from 'react';
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'

export default React.createClass({
  themeColor:"#31DAFF",

  componentDidMount(){

  },

  render() {
    return (
      <div>
      <h1>Questions and answers</h1>
      <p className="subtitle">For DJs</p>
        <CollapsibleContainer
          changeHash
        >
             <Collapsible
                  label="How much does it cost?" 
                > 
                <p>
                   The membership at Cueup is free of charge.
                   Only when making an offer, a fee of 3% is subtracted from your offer.
                   This is what makes us able to keep the platform running.
                  </p>
                </Collapsible>
                <Collapsible
                  label="How much can I earn?"> 
                    <p>
                        You set your own prices, so that is entirely up to you. We will do all we can to get you as many gigs as possible.
                    </p>
                </Collapsible>
                <Collapsible
                  label="Where can I play?"> 
                    <p>
                        Technically you can play in the whole world.
                        At the moment we are focused on growing in Denmark. 
                        Therefore the prices are in DKK, but at a later point it will be possible to choose between different currencies. 
                        
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I talk to the organizer before playing?"> 
                    <p>
                        Yes. 
                        As soon as you receive a request to make an offer, 
                        you can contact the organizer on either email or phone.
                    </p>
                </Collapsible>
                <Collapsible
                  label="What if the organizer cancels the event?"> 
                    <p>
                        If the organizer cancels an event where you have been confirmed to play, the organizer will be refunded in regards to your cancelation policy.
                        You can set your own cancelation policy in your preferences specifying how many percentages are refunded to the organizer if he cancels.
                        After the organizer has cancelled, the rest of the money will be transferred to your bank account.
                    </p>
                </Collapsible>
                <Collapsible
                label="What if I cancel the gig?"> 
                  <p>
                      If you cancel a confirmed gig, all the money will be refunded to the organizer immediately. 
                  </p>
              </Collapsible>
              <Collapsible
                label="What to do if the organizer want's to pay under the table?"> 
                  <p>
                      If the organizer asks if he can pay in another way than using Cueup, you should refuse. 
                      The payment process at Cueup ensures safety for both you and the organizer. 
                      If the event is not paid through Cueup, it won't count as an experience, and you can't get a rating for that event thus lowering your trustworthiness.
                      When a organizer sees your offer, the experience will be showed alongside and it will help justify a higher price if you have played at more events.
                      To see an example of what the organizer sees, go to your profile and select "price offer example". 
                  </p>
              </Collapsible>
                <Collapsible
                  label="Does the organizer always choose the cheapest offer?"> 
                    <p>
                        The organizer will be able to see many things in addition to the price you have set. 
                        For example having a good description of yourself often helps getting the gig.
                        Your experience will also be shown and will help you justify a higher price if you have played at more events.
                        <br/>
                        <br/>
                        When setting a price for your offer, an additionals service fee is added to the price to help us run the platform.
                        This fee is a calculated percentage of your price where the percentage is higher for a small offer and lower for a large offer. 
                        In this manner we encourage you to make a higher offer. 
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can my own customers pay through Cueup?"> 
                    <p>
                        Yes. Go to your profile and scroll to the bottom. Here you'll find a section called "REFER ORGANIZERS",
                        and you can use one of the provided methods to get share a link to your profile.
                        When referring your own customers the service fee will be discarded.
                    </p>
                </Collapsible>
                <Collapsible
                  label="Can I add testimonials from earlier customers as reviews?"> 
                    <p>
                        Yes. Contact us using the chat function or our email, and we'll sort it out. 
                    </p>
                </Collapsible>
                <Collapsible
                  label="How quickly do I get my money?"> 
                    <p>
                        When you have played a gig, the transfer to your bankaccount will be made a day after the event is finished.
                        Depending on the bank you are using, the transfer can take up to a week. 
                    </p>
                </Collapsible>
                <Collapsible
                  label="Does Cueup pay my taxes?"> 
                    <p>
                        Currently Cueup does not handle any of your taxes. 
                        It is a priority to add this functionality. 
                    </p>
                </Collapsible>
                <Collapsible
                  label="Is my profile public?"  
                > 
                <p> 
                    Yes, but people can only find your profile if they have the corresponding link. 
                    To see your public profile either go to your profile and select "public profile", or logout and go to the url of your profile. 
                  </p>
                </Collapsible>
              </CollapsibleContainer>
      </div>

    )
  }
})
