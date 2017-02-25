import React from 'react';
import Footer from '../../../components/common/Footer'
import Particles from 'react-particles-js';
import PConfig from '../../../assets/particlesjs-config.json';
import PConfig1 from '../../../assets/particlesjs-config-1.json';
import PConfig2 from '../../../assets/particlesjs-config-2.json';
import PConfig3 from '../../../assets/particlesjs-config-3.json';
import PConfig4 from '../../../assets/particlesjs-config-4.json';
import PConfig5 from '../../../assets/particlesjs-config-5.json';



export default React.createClass({
  themeColor:"#31DAFF",

  componentDidMount(){

  },

  render() {
    return (
      <div>
        <header className="">
          <div id="stripes">
            <span key="a"/>
            <span key="b"/>
            <span key="c"/>
            <span key="d"/>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-sm-4 col-sm-push-6">
                <h1 key="title">How it works</h1>
                <p key="paragraph">The booking process at Cueup is designed to be secure and easy to use for both DJs and bookers. Learn more about the booking process below. If you have additional questions check out the faq or write us a message. 
                </p>
            </div>
              <div className="col-sm-4 col-sm-pull-3 particles">
                <Particles params={PConfig} width="100%" height="300px"/>
              </div>
            </div>
             

           

          </div>
        </header>
        <div  className="how-it-works-wrapper" style={{position:"relative"}} >
          <div className="particles-bg" />
          <div className="container">
            <div id="particles">
              <Particles params={PConfig1} width="270px" height="270px"/>
              <Particles params={PConfig2} width="310px" height="310px"/>
              <Particles params={PConfig3} width="350px" height="350px"/>
              <Particles params={PConfig4} width="390px" height="390px"/>
              <Particles params={PConfig5} width="430px" height="430px"/>
            </div>
            <div className="how-it-works" >
              <section>
                <div>
                  <div>
                    <div key="a" className="how-to-title">
                      <div className="circle">1</div>
                      <h2>Organizer creates event</h2>
                    </div>
                    <p key="b">
                      Organizers will send details about their event and what requirements they have. After creating an event, the most qualified djs that meet the requirements of the event will be found and asked to give an offer. 

                    </p>
                  </div>
                </div>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">2</div>
                      <h2>Qualified DJs return offer</h2>
                    </div>
                    <p key="b">
The DJs will either decline the event or specify their offer for the event. If necessary they can contact the organizer and discuss the requirements further. As soon as an offer is made, the organizer will be notified.                       </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">3</div>
                      <h2>Organizer confirms an offer</h2>
                    </div>
                    <p key="b">
When the organizer receives an offer, they can confirm the offer by paying the specified amount using Cueup's build in payment system. If necessary the organizer can contact the DJ to clear up uncertainties. The offer contains information about the DJ and their cancelation policy.                      </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">4</div>
                      <h2>DJ plays at event</h2>
                    </div>
                    <p key="b">
The next step is for the DJ to play the gig. If for any reason the DJ has to cancel, the full amount will be refunded instantly. If for any reason the organizer has to cancel, the amount specified by the DJ’s cancelation policy will be refunded.                       </p>
              </section>
              <section>

                    <div key="a" className="how-to-title">
                      <div className="circle">5</div>
                      <h2>Payout is released</h2>
                    </div>
                    <p key="b">
                      A day after the event is finished the money are transferred to the DJ’s bank account.  
                      </p>

              </section>
          </div>
        </div>
      </div>
      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or become a DJ."
        />
      </div>

    )
  }
})
