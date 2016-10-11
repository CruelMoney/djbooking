import React, {PropTypes} from 'react'
import DatePicker from '../common/Datepicker.js'
import Footer from '../blocks/Footer'
import RequestForm from '../blocks/RequestForm'
import moment from 'moment'
import scrollIntoView from 'smoothscroll-polyfill'
import bgVideo from '../../assets/blurry-night.mp4'


scrollIntoView.polyfill()

export default React.createClass({
  propTypes: {
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    form: PropTypes.object
  },


getInitialState(){
  return {
    eventDate: null,
    showForm: false
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
  this.setState({
    showForm: true
  })
  if (!this.state.eventDate) {
    this.setState({
      eventDate: moment(),
    }, ()=>setTimeout(()=>this.requestForm.scrollIntoView({block: "end", behavior: "smooth"}), 100))
  }else{
 this.requestForm.scrollIntoView({block: "end", behavior: "smooth"})}
},

  render() {
    return (
      <div>
        <div className="home-bg"
          style={{overflow: 'hidden', position:'relative'}}
        >
          <div className="container"
            style={{
              display:'flex',
              alignItems:'center'
            }}>
            <div className="col-md-5 col-md-offset-1">
              <DatePicker
                handleChange={this.handleDateChange}
                handleButtonClick={this.handleButtonClick}
              />
            </div>
            <div className="col-md-5"
              style={{
                display:'flex',
                alignItems:'center'
              }}
            >
              <div className="hero-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing <span>elit</span>. <span>Consectetur</span> ipsam ut eum nihil consectetur, dignissimos <span>dolor</span> reiciendis repellendus dolore repellat quasi adipisci quidem, id accusamus <span>ducimus</span> autem ratione, obcaecati aut.
              </div>
            </div>

          </div>
          <video autoPlay loop muted preload="auto">
            <source src={bgVideo} type="video/mp4"/>
          </video>
        </div>
        <div
          ref={(f) => this.requestForm = f}/>

        {

          this.state.showForm ?
            <div>
              <div   className="container">
                <RequestForm
                  date={this.state.eventDate}
                  onSubmit={this.props.onSubmit}
                  isLoggedIn={this.props.isLoggedIn}
                  form={this.props.form}
                />
              </div>
              <Footer/>
            </div>
          : null
        }


      </div>
    )
  }
})
