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

  componentWillMount(){
     this.setState({
          reference: this.props.location.query.referredBy
      })
  },

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
      <div className="container">
      <div className="row center-xs"> 
        <div className="col-xs-12">
            <h1 className="Header-title common-PageTitle">
              Become DJ at Cueup.
               <span className="Header-subTitle common-PageSubtitle">
               Get the gigs you want.
               </span>
              </h1>
             
        </div>
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
              <h2 style={{color:"rgb(176, 49, 255)"}}>Membership FREE of charge, you set your own prices</h2>
              <p style={{color:"#32325D"}}>
                At Cueup you don't have to pay anything to start getting gigs. 
                In fact you don't have to pay anything at anytime. 
                For each gig you play, a fee of 3% will be subtracted from the price you have offered. That's how we keep the platform running. When the gig is finished, the money is transferred to your bank account.
                To get started - just sign up below.
              </p>
            </div>
          </div>
        </div>
        <div key="cardB">
        <div  className="col-sm-6 col-md-5 col-md-push-1">
          <div className="card">
            <img src={vinyl} alt="vinyl icon"/>
            <h2 style={{color:"rgb(176, 49, 255)"}}>We handle the payment, you enjoy the benefits</h2>
            <p style={{color:"#32325D"}}>
            Cueup is build for the DJs! We will find the gigs that suites your style. At the same time you have the freedom to decline any gig that you are offered. You'll never have to worry about collecting money again, as the organizers will pay up front using Cueup. In case of a cancelation, you define your own cancelation policy and will still get paid according to your policy. 
           
            {/* Cueup is build for the DJs! By specifying what genres you like to play and telling about yourself, we will find the gigs that suites your style. At the same time you have the freedom to decline any gig that you are offered. The gig will simply be offered to the next DJ in line. We also strive to make sure, that all DJs get an equal amount of gigs.  */}
              
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
        <SignUpForm
          reference={this.state.reference}
        />
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
