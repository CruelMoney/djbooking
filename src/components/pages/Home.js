import React, {PropTypes} from 'react'
import DatePicker from '../common/Datepicker.js'
import Footer from '../blocks/Footer'
import RequestForm from '../blocks/RequestForm'
import moment from 'moment'
import scrollIntoView from 'smoothscroll-polyfill'
import bgVideo from '../../assets/blurry-night.mp4'
import Button from '../common/Button-v2'

/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

scrollIntoView.polyfill()

export default React.createClass({
  themeColor: "#25F4D2",

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
 this.requestForm.scrollIntoView({block: "end", behavior: "smooth"})
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
          <div className="container"
            style={{
              display:'flex',
              alignItems:'center'
            }}>

            <div className="row">
            <div className="col-md-6"
              style={{
                    marginTop: "30px"
              }}
            >
                <QueueAnim key="1">
                <h1 key="title">DJ service for a perfect event</h1>
                <p key="paragraph">Stripe is the best software platform for running an internet
                business. We handle billions of dollars every ythinking businesses around the world. thinking businesses around the world.thinking businesses around the world.ear for forward-
                thinking businesses around the world.
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
        <div
          ref={(f) => this.requestForm = f}/>


            <div>
              <div   className="container">
                <RequestForm
                  date={this.state.eventDate}
                  onSubmit={this.props.onSubmit}
                  isLoggedIn={this.props.isLoggedIn}
                  form={this.props.form}
                  checkEmail={this.props.checkEmail}
                  emailExists={this.props.emailExists}
                />
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



      </div>
    )
  }
})
