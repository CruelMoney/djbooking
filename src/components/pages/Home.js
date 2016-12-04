import React, {PropTypes} from 'react'
import DatePicker from '../common/Datepicker.js'
import Footer from '../blocks/Footer'
import RequestForm from '../blocks/RequestForm'
import moment from 'moment'
import scrollIntoView from 'smoothscroll-polyfill'
import bgVideo from '../../assets/blurry-night.mp4'
import Button from '../common/Button-v2'
import padlock from '../../assets/padlock.svg'
import note from '../../assets/note.svg'

/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

const ScrollOverPack = ScrollAnim.OverPack;

scrollIntoView.polyfill()

export default React.createClass({
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
        <div style={{margin:"-10px"}}
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

            <div className="info-boxes grey">
              <div className="container">
                <div className="row">
                  <ScrollOverPack id="page1" className="page1" hideProps={{ 0: { reverse: true } }}>
                <QueueAnim key="a" type="top">
                  <div key="cardA">
                  <div  className="col-md-6">
                    <div className="card">
                      <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
                        Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s
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
                      Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s
                    </p>
                  </div>
                </div>
                </div>
              </QueueAnim>
            </ScrollOverPack>
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



      </div>
    )
  }
})
