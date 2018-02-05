import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from '../../../components/common/Footer'
import MediaQuery from 'react-responsive';
//import scrollIntoView from 'smoothscroll-polyfill'
import Button from '../../../components/common/Button-v2'
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'
import DJCards from './djCards'
import Loadable from 'react-loadable';
import LoadingRequestForm from '../../../components/common/RequestForm/LoadingRequestForm';

const AsyncRequestForm = Loadable({
  loader: () => import('../../../components/common/RequestForm/RequestForm'),
  loading: LoadingRequestForm
});



class Home extends Component{
  themeColor = "#25F4D2"
  secondColor = "#31DAFF"

  getChildContext() {
    return {
      color: this.themeColor
    }
  }

  componentDidMount(){
   // scrollIntoView.polyfill()
  }

requestForm = null

handleButtonClick = () => {
 window.scroll({
  top: this.requestForm.offsetTop-20,
  left: 0,
  behavior: 'smooth'
});
}

  render() {
    return (
      <div>
        <header>
          <div id="stripes" className="v1">
            <span></span>

          </div>
          <div className="container">

            <div className="row">
              <div className="col-md-5">
                  <h1 key="title">Book qualified DJs with ease.</h1>
                  <p key="paragraph">
                    Cueup is the easiest way for you to get a great DJ for your event. Just fill out the form below, and soon you will receive non-binding offers from qualified DJs.
                  </p>

                  <div style={{float:"left", marginTop:"20px"}}>
                    <Button
                      color="white"
                      className="white elevated"
                      onClick={this.handleButtonClick}>
                      <div style={{width:"150px", color:this.themeColor}}>GET OFFERS</div>
                    </Button>
                  </div>
               
              </div>
              <MediaQuery query="(min-width: 992px)">
                <div className=" col-md-8">
                    <DJCards />
                </div>
              </MediaQuery>
            </div>

          </div>

        </header>


          <div className="container request-form-wrapper">
            <div ref={(f) => this.requestForm = f}></div>
            <AsyncRequestForm />
          </div>

          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-6 col-md-5 col-md-push-1">
                        <div className="card">
                          <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
At Cueup the process of booking ensures that both the organizer and the DJ are protected from fraud. In case of a cancelation from either side, the money is instantly refunded. Otherwise the money is disbursed when the DJ has played at the event. In case of a cancelation by the DJ, we will try to find a new DJ as quickly as possible.</p>
                  </div>
                </div>
                <div  className="col-sm-6 col-md-5 col-md-push-1">
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
                bgColor="#FFFFFF"
                color={this.secondColor}
                firstTo="/signup"
                secondTo="/howitworks"
                firstLabel="Become DJ"
                secondLabel="How it works"
                title="Are you a DJ?"
                subTitle="Apply to become DJ, or see how it works."
                />

            </div>

    )
  }
}

Home.childContextTypes = {
  color: PropTypes.string,
}

export default Home
