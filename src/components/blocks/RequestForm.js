import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import LocationSelector from '../common/LocationSelectorSimple'
import ToggleOptions from '../common/ToggleOptions'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import Form from '../../containers/Form'
import Slider from '../common/Slider'
import TimeSlider from '../common/TimeSlider'

import TextBox from '../common/TextBox'
import Popup from '../common/Popup'
import Signup from '../../containers/Signup'
import Login from '../../containers/Login'

import wNumb from 'wnumb'
import c from '../../constants/constants'
import {Card} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'

var RequestForm = React.createClass({
  propTypes: {
    form: PropTypes.object,
    date: PropTypes.object, //moment object
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    checkEmail: PropTypes.func
  },

  getDefaultProps(){
    return{
      form:{values:{}}
    }
  },

  getInitialState(){
    return{
      showPopup: false,
      emailExists: false,
      guests: 50,
    }
  },

  componentWillMount() {

  },

  componentWillReceiveProps(nextprops){


  },

  componentWillUnmount() {
  },


//TODO implement real api
  onSubmit(){
    if (this.props.isLoggedIn){
      this.props.onSubmit(this.props.form)
    }else{
      const result = this.props.checkEmail(this.props.form)
      this.setState({
        emailExists: result,
        showPopup: true
      })

      }
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

  render() {
    const styles ={
      medium:{
        textarea: {
          height: '40px',
          textAlign: 'center',
        },

        paragraph: {
          fontSize: '30px',
          textAlign: 'center',
        },

        input:{
          fontSize: '30px',
          height: 'initial',
          textAlign: 'center',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          fontSize: '30px',
          height: 'initial',
          fontWeight: '300',
          textAlign: 'center',
          width: '100%'
        },

      },
       dottedBorderStyle: {
          borderTop: 'none rgba(0, 0, 0, 1)',
          borderRight: 'none rgba(0, 0, 0, 1)',
          borderBottom: '2px dotted rgba(0, 0, 0, 1) ',
          borderLeft: 'none rgba(0, 0, 0, 1)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          borderColor: 'rgba(0,0,0, 0.5)'
        },
        plainBorder:{
          borderTop: 'none rgb(224, 224, 224)',
          borderRight: 'none rgb(224, 224, 224)',
          borderBottom: '1px solid rgb(224, 224, 224)',
          borderLeft: 'none rgb(224, 224, 224)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          display: 'none',
        },

    }

    const eventDateString = this.props.date.format("dddd Do, MMMM YYYY")
    return(
      <div>
        <Popup showing={this.state.showPopup && !this.props.isLoggedIn}
          onClickOutside={this.hidePopup}>

          {this.state.emailExists ?
            <div>
              <p>It looks like there's already an account using that email. Please login before continuing.</p>
              <Login/>
            </div>

            :
            <div>
              <p>Please signup before continuing. Then you can always login to see the status of your event.</p>
              <Signup
                profile={this.props.form.values}
              />
            </div>
          }
        </Popup>


        <Form
          name="requestForm"
          onSubmit={this.onSubmit}
          buttonText="Request DJ"
        >
          <div
            style={{
              marginBottom:"20px",
              marginTop:"100px",
              display:"flex",
              flexDirection:'row',
              alignItems:'center',
              alignContent:'center',
              flexWrap: 'wrap'
            }}>

            <div
              className="col-md-5 no-padding request-card first-card"
              style={{
                zIndex:'10'
              }}>

              <Card
                expanded>
                <div style={{padding:'15px'}}>
                  <TextField
                    name="date"
                    disabled
                    controlledValue={eventDateString}
                    underlineDisabledStyle={styles.plainBorder}
                    floatingLabelText="Event date"
                    style={{marginTop:'-20px', height:'70px'}}
                  />
                  <p style={{marginBottom:'30px'}}>Select a new date in the calendar to change it.</p>

                  <TextField
                    name="eventName"
                    style={{marginTop:'-20px', height:'70px'}}
                    floatingLabelText="Event name"

                    validate={['required']}
                  />
                  <p style={{marginBottom:'30px'}}>Write a name reflecting the purpose of your event.</p>


                  <LocationSelector
                    style={{marginTop:'-20px', height:'70px'}}
                    floatingLabelText="Event location"

                    name="location"
                    validate={['required']}
                  />
                  <p style={{marginBottom:'30px'}}>Select the city in which your event will happen.</p>


                  {!this.props.isLoggedIn ?
                    <div>
                      <TextField
                        style={{marginTop:'-20px', height:'70px'}}
                        floatingLabelText="Your name"

                        name="name"
                        validate={['required', 'lastName']}
                      />
                      <p style={{marginBottom:'30px'}}>Your full name.</p>

                      <TextField
                        style={{marginTop:'-20px', height:'70px'}}
                        floatingLabelText="Your email"
                        name="email"
                        validate={['required', 'email']}
                      />
                      <p style={{marginBottom:'30px'}}>We only share your email with DJ's suitable to play at your event.</p>

                      <TextField
                        style={{marginTop:'-20px', height:'70px'}}
                        floatingLabelText="Your phone number"
                        name="phone"
                        type="number"
                        validate={['required']}
                      />
                      <p style={{marginBottom:'30px'}}>We only share your phone number with DJ's candidates.</p>

                    </div>
                  : null}


                </div>
              </Card>
            </div>
            <div
              className="col-md-4 no-padding request-card second-card"
              style={{
                zIndex:'5'
              }}>
              <Card
                expanded>

                <div style={{padding:'15px'}}>
                  <h4 style={{textAlign:'center'}}>Select Genres</h4>
                  <ToggleButtonHandler
                    name="genres"
                    potentialValues={c.GENRES}
                    columns={3} />

                  <h4 style={{textAlign:'center'}}>Do you need speakers?</h4>
                  <ToggleOptions
                    name="speakers"
                    glued={true}
                    validate={['required']}

                  >
                    <Button
                      name="YES"
                      label="Yes"
                    />

                    <Button
                      name="UNCERTAIN"
                      label="Uncertain"
                    />

                    <Button
                      name="NO"
                      label="No"
                    />
                  </ToggleOptions>
                </div>
              </Card>
            </div>
            <div
              className="col-md-3 no-padding request-card third-card"
              style={{

              }}>
              <Card
                expanded>

                <div style={{padding:'15px'}}>
                  <h4 style={{textAlign:'center'}}>Time</h4>
                  <div style={{
                    marginTop:'20px',
                    marginBottom:'20px'
                  }}>
                    <TimeSlider
                      date={this.props.date}
                    />
                  </div>




                  <h4 style={{textAlign:'center'}}>Guests</h4>
                  <div style={{
                    marginTop:'20px',
                    marginBottom:'20px'
                  }}>
                    <Slider
                      name="guests"
                      range={{min:0, max:100}}
                      step={1}
                      connect="lower"
                      initialValues={[50]}
                      handleChange={(values) => this.setState({
                        guests: values[0]
                      })}
                      format={ wNumb({
                        decimals: 0,
                        thousand: ".",
                      })}
                    />
                  </div>
                  <p>{"Around " + this.state.guests + " people attending the event."}</p>
                  <h4 style={{textAlign:'center'}}>Description</h4>
                  <p>{"Please write any additional information."}</p>

                  <TextBox
                    width="100%"
                    height="120px"
                    name="description"
                    validate={['required']}

                  />


                </div>
              </Card>
            </div>

          </div>
        </Form>
      </div>

      )

  }
})

var styledRequestForm = Radium(RequestForm)
export default muiThemeable()(styledRequestForm)
