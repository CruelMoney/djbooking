import React from 'react';
import Footer from '../../../components/common/Footer'
import { Link } from 'react-router';
import chrisPic from '../../../assets/chris.jpg'
import martinPic from '../../../assets/martin.jpg'

export default React.createClass({
  themeColor:"#25F4D2",

  render() {
    return (
      <div className="">
        <div className="about-content container">
          <div style={{marginBottom:"100px"}} className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <h1>About Cueup</h1>
              <p style={{marginBottom:"30px"}}>
                Cueup is the easiest way to book a DJ for your event. <br/>
                We are all about making sure both DJs and organizers are satisfied.
              </p>
              <p className="terms_link">Have questions? Read the <a target="_blank" href="/faq/dj">FAQ</a></p>
              <p className="terms_link">By using Cueup, you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a></p>

            </div>
          </div>
          <div style={{marginBottom:"100px"}} className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
             <h2 style={{marginBottom:"10px"}}>PEOPLE</h2>
             <div className="people">
              <div className="person">
               <a href="https://twitter.com/ChrisDengso">
                 <div className="person-img" style={{backgroundImage: "url(" + chrisPic +")"}}></div>
               </a>
               <a href="https://twitter.com/ChrisDengso">@ChrisDengso</a>
               <div className="person-info">Founder & Developer</div>
             </div> 
             <div className="person">
               <a href="https://www.mdadigital.dk/">
                 <div className="person-img" style={{backgroundImage: "url(" + martinPic +")"}}></div>
               </a>
               <a href="https://www.instagram.com/moremartindahl/">@MoreMartinDahl</a>
               <div className="person-info">Marketing & Media</div>
             </div>
             </div>
             
        </div>

            <div className="col-md-4">
             <h2 style={{marginBottom:"10px"}}>COMPANY</h2>
                <p>CPH SOUND IVS</p>
                <p>CVR: 37237515</p>
                <p>PHONE: +45 24 65 80 61</p>
                <p>EMAIL: chris@cueup.io</p>
            </div>

          </div>
        </div>      
        <Footer
        noSkew
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or apply to become DJ."
        />
      </div>

    )
  }
})
