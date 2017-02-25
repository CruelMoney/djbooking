import React from 'react'
import SignUpForm from './SignUpForm'
import vinyl from '../../../assets/Vinyl.svg'
import krIcon from '../../../assets/money.svg'
import Footer from '../../../components/common/Footer'
/*animation stuff*/
import QueueAnim from 'rc-queue-anim';

export default React.createClass({
  themeColor:"#B031FF",
  secondColor:"#31DAFF",


  render() {
    return  <div >
      <header className=""

      >
      <div id="stripes">
        <span/>
        <span/>
        <span className="white"/>
        <span/>
      </div>
      <div className="row center-xs"> 
        <div className="col-xs-12">
            <h1 className="Header-title common-PageTitle">
              Become DJ at Cueup.
               <span className="Header-subTitle common-PageSubtitle">
               Be your own boss.
               </span>
              </h1>
             
        </div>
        </div>
      <div className="container">
        <div className="info-boxes">

 
        <div className="row">
        <QueueAnim type="top">
          <div key="cardA">
          <div  className="col-sm-6 col-md-5 col-md-push-1">
            <div className="card">
              <img src={krIcon} alt="Money icon"/>
              <h2 style={{color:"rgb(176, 49, 255)"}}>Membership free of charge</h2>
              <p style={{color:"#32325D"}}>
                At Cueup you don't have to pay anything to start getting gigs. 
                In fact you don't have to pay anything at anytime. 
                For each gig you play a service fee will be added to the price you have offered, and in that way the event organizers pay to keep the platform running.
                To get started - just sign up below.
              </p>
            </div>
          </div>
        </div>
        <div key="cardB">
        <div  className="col-sm-6 col-md-5 col-md-push-1">
          <div className="card">
            <img src={vinyl} alt="vinyl icon"/>
            <h2 style={{color:"rgb(176, 49, 255)"}}>Get the kind of gigs you want</h2>
            <p style={{color:"#32325D"}}>
              Cueup is build for the DJs! 
              By specifying what genres you like to play and telling us about yourself, we can do our best to get you the gigs that suites your style. 
              At the same time you have the freedom to decline any gig. 
              We also try to make sure that all DJs get the chance to play an equal amount of gigs. 
              
            </p>
          </div>
        </div>
        </div>
      </QueueAnim>
        </div>
      </div>
   </div>

    </header>
    <div className="container"  style={{marginTop: "80px", marginBottom: "80px"}}>
      <div className="signup">
        <SignUpForm/>
      </div>
    </div>
      <Footer
        color={this.themeColor}
        firstTo="/howitworks"
        secondTo="/"
        firstLabel="HOW IT WORKS"
        secondLabel="ARRANGE EVENT"
        title="Wonder how it works?"
        subTitle="See how it works, or arrange an event."
        />
    </div>
  }
})
