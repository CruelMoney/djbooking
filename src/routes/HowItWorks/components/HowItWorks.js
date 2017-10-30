import React, {Component} from 'react';
import Footer from '../../../components/common/Footer'
import Particles from 'react-particles-js';
import PConfig from '../../../assets/particlesjs-config.json';
import PConfig1 from '../../../assets/particlesjs-config-1.json';
import PConfig2 from '../../../assets/particlesjs-config-2.json';
import PConfig3 from '../../../assets/particlesjs-config-3.json';
import PConfig4 from '../../../assets/particlesjs-config-4.json';
import PConfig5 from '../../../assets/particlesjs-config-5.json';
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'



export default class Index extends Component{
  themeColor = "#31DAFF"

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
            <div className="col-sm-5 col-md-4 col-md-push-6 col-sm-push-5">
                <h1 key="title">How it works</h1>
                <p key="paragraph">The booking process at Cueup is designed to be secure and easy to use for both DJs and bookers. Learn more about the booking process below. If you have additional questions check out the faq or write us a message. 
                </p>
            </div>
              <div className="col-md-4 col-md-pull-3 col-sm-4 col-sm-pull-4 particles">
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
                      Organizers choose a date and fill out the form with details about their event and what requirements they have on the arrange event page.
After creating an event, the best qualified DJs that meet the requirements of the event will be asked to give an offer.
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
The DJs will then either decline the event or send their offer for the event. If necessary they can contact the organizer and discuss the requirements further. As soon as an offer is made, the organizer will be notified.    </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">3</div>
                      <h2>Organizer confirms an offer</h2>
                    </div>
                    <p key="b">
When the organizer receives an offer, they can either confirm the offer by paying the specified amount using Cueup's build in payment system, or decline the offer if no longer needed. If necessary the organizer can contact the DJ to clear up any uncertainties. </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">4</div>
                      <h2>DJ plays at event</h2>
                    </div>
                    <p key="b">
The next step is for the DJ to play at the event. 
If for any reason the DJ has to cancel, the full amount will be refunded instantly to the organizer. If the organizer has to cancel, the amount specified by the DJ’s cancellation policy will be refunded. Read more about cancellation process <a href="/faq/organizer" >here</a>.</p>              </section>
              <section>

                    <div key="a" className="how-to-title">
                      <div className="circle">5</div>
                      <h2>Payout is released</h2>
                    </div>
                    <p key="b">
                      The money will be withhold by us, until the day after the event has taken place. This is in order to assure that the job was completed. The money will then be transferred to the DJ’s bank account.
                      </p>

              </section>
          </div>
        </div>
      </div>
      <div className="info-boxes">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-5 col-sm-push-1">
                        <div className="card">
                          <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
At Cueup the process of booking ensures that both the organizer and the DJ are protected from fraud. In case of a cancelation from either side, the money are instantly refunded. Otherwise the money are disbursed when the DJ has played at the event. In case of a cancelation by the DJ, we will try to find a new DJ as quickly as possible.</p>
                  </div>
                </div>
                <div  className="col-sm-5 col-sm-push-1">
                  <div className="card">
                    <img src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>The most qualified DJs</h2>
                    <p>
At Cueup we focus on finding the most qualified DJs for your event - so you don’t have to. Don’t waste time searching for DJs when you can have offers from great DJs send directly to you.  Each offer shows the DJ, their reviews and rating so you can confidently choose a DJ you can trust.                     </p>
                  </div>
                </div>
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
        subTitle="Arrange an event, or apply to become a DJ."
        />
      </div>

    )
  }
}
