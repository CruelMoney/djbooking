import React, {PropTypes} from 'react'
import DatePicker from '../../../components/common/Datepicker.js'
import Footer from '../../../components/common/Footer'
import RequestForm from './RequestForm'
import moment from 'moment'
import scrollIntoView from 'smoothscroll-polyfill'
import Button from '../../../components/common/Button-v2'
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'

/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

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
 scroll({
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
            <span></span>
            <span className="white"></span>
            <span></span>
            <span></span>
          </div>
          <div className="container">

            <div className="row">
              <div className="col-md-6">
                <QueueAnim key="1">
                  <h1 key="title">The perfect dj for the perfect event</h1>
                  <p key="paragraph">
                    Cueup offers connection to hundreds of available djs and helps you find the most qualified for your event - at the best price.
                    Select the date of your event in the calendar and fill in the remaining information below.
                    Soon you will find offers from the most qualified djs for your event. Nothing is binding.
                  </p>
                </QueueAnim>
              </div>

              <div className="col-md-5 col-md-offset-1">
                <TweenOne className="tween-one" key="0" style={{opacity: 0}} animation={{ opacity: 1 }}>
                  <div className="card glass">
                    <DatePicker
                      handleChange={this.handleDateChange}
                    />
                    <Button
                      className="white"
                      onClick={this.handleButtonClick}>
                      <div style={{width:"100px"}}>GO</div>
                    </Button>
                  </div>
                </TweenOne>
              </div>
            </div>

          </div>

        </header>



          <div   className="container">
            <div ref={(f) => this.requestForm = f}></div>
            <RequestForm
              date={this.state.eventDate}
              onSubmit={this.props.onSubmit}
              isLoggedIn={this.props.isLoggedIn}
              form={this.props.form}
              checkEmail={this.props.checkEmail}
              emailExists={this.props.emailExists}
            />
          </div>

          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                    <div key="cardA">
                      <div  className="col-md-6">
                        <div className="card">
                          <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
                <div key="cardB">
                <div  className="col-md-6">
                  <div className="card">
                    <img src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>The most qualified DJs</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
                    </p>
                  </div>
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

import { connect } from 'react-redux'
import * as eventActions from '../../../actions/EventActions'
import * as userActions from '../../../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.status.signedIn,
    form:   Object.assign(
        {},
        state.forms["requestForm-step-1"] ? state.forms["requestForm-step-1"].values : {} ,
        state.forms["requestForm-step-2"] ? state.forms["requestForm-step-2"].values : {} ,
        state.forms["requestForm-step-3"] ? state.forms["requestForm-step-3"].values : {} ,
      ),
    emailExists: state.user.status.emailExists
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form, callback)    => {dispatch(eventActions.postEvent(form, callback))},
    checkEmail: (email, callback) => {dispatch(userActions.checkEmail(email, callback))}
}}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps)(Home)

export default props => (
    <SmartProfile {...props}/>
)
