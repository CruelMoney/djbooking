import React, {PropTypes} from 'react'
import DatePicker from '../../../components/common/Datepicker.js'
import Footer from '../../../components/common/Footer'
import RequestForm from './RequestForm'
import moment from 'moment'
import scrollIntoView from 'smoothscroll-polyfill'
import Button from '../../../components/common/Button-v2'
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'
import DJCards from './djCards'
/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import { connect } from 'react-redux'
import * as eventActions from '../../../actions/EventActions'
import * as userActions from '../../../actions/UserActions'

const ScrollOverPack = ScrollAnim.OverPack;

scrollIntoView.polyfill()

const Home = React.createClass({
  themeColor: "#25F4D2",
  secondColor: "#31DAFF",

  propTypes: {
    checkEmail: PropTypes.func,
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    form: PropTypes.object,
    emailExists: PropTypes.bool
  },

  childContextTypes: {
    color: PropTypes.string,
  },
  getChildContext() {
    return {
      color: this.themeColor
    }
  },


getInitialState(){
  return {
    eventDate: moment()
  }
},

handleDateChange(date){
  //is a moment object
  this.setState({
    eventDate: date
  })
},

requestForm : null,

handleButtonClick(){
 window.scroll({
  top: this.requestForm.offsetTop-20,
  left: 0,
  behavior: 'smooth'
});
},

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

              <div className=" col-md-8">
                  <DJCards />
              </div>
            </div>

          </div>

        </header>



          <div className="container request-form-wrapper">
            <div ref={(f) => this.requestForm = f}></div>
            <RequestForm
              date={this.state.eventDate}
              onSubmit={this.props.onSubmit}
              isLoggedIn={this.props.isLoggedIn}
              form={this.props.form}
              checkEmail={this.props.checkEmail}
              emailExists={this.props.emailExists}
              initialCity={this.props.geoCity}
              checkDjAvailability={this.props.checkDjAvailability}
            />
          </div>

          <div className="info-boxes grey">
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
                bgColor="#FFFFFF"
                color={this.secondColor}
                firstTo="/signup"
                secondTo="/howitworks"
                firstLabel="Become DJ"
                secondLabel="How it works"
                title="Are you a DJ?"
                subTitle="Become a member, or see how it works."
                />

            </div>



    )
  }
})



//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.login.status.signedIn,
    form:   Object.assign(
        {},
        state.forms["requestForm-step-1"] ? state.forms["requestForm-step-1"].values : {} ,
        state.forms["requestForm-step-2"] ? state.forms["requestForm-step-2"].values : {} ,
        state.forms["requestForm-step-3"] ? state.forms["requestForm-step-3"].values : {} ,
        state.forms["requestForm-step-4"] ? state.forms["requestForm-step-4"].values : {} ,
      ),
    geoCity: state.session.city,
    emailExists: state.login.status.emailExists
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form, callback)    => {dispatch(eventActions.postEvent(form, callback))},
    checkDjAvailability: (form, callback)    => {dispatch(eventActions.checkDjAvailability(form, callback))},
    checkEmail: (email, callback) => {dispatch(userActions.checkEmail(email, callback))}
}}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps)(Home)

export default props => (
    <SmartProfile {...props}/>
)
