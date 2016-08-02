import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import LocationSelector from '../common/LocationSelectorSimple'
import ToggleOptions from '../common/ToggleOptions'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import Form from '../common/Form'

import c from '../../constants/constants'
import {Card} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'


var RequestForm = React.createClass({
  propTypes: {
    date: PropTypes.string,
  },




  componentWillMount() {

  },

  componentWillReceiveProps(nextprops){

  },

  componentWillUnmount() {
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



    return(

        <Form
          onSubmit={()=>null}
          updateValue={()=> null}
        >
        <div
          style={{
            marginBottom:"100px",
            marginTop:"100px",
            display:"flex",
            flexDirection:'row',
            alignItems:'center',
            alignContent:'center'
          }}>
          <div
            className="col-md-5 no-padding"
            style={{
              zIndex:'10'
            }}>
            <Card
              expanded>
              <div style={{padding:'15px'}}>
              <TextField
                name="date"
                floatingLabelText="Event date"

                style={{marginTop:'-20px', height:'70px'}}
                />
                <p style={{marginBottom:'30px'}}>Select a new date in the calendar to change it.</p>

              <TextField
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Event name"

                validate={['required']}
              />
              <p style={{marginBottom:'30px'}}>Write a name reflecting the purpose of your event.</p>


              <LocationSelector
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Event location"

                name="email"
                validate={['required']}
              />
              <p style={{marginBottom:'30px'}}>Select the city in which your event will happen.</p>

              <TextField
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Your name"

                name="email"
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

              </div>
            </Card>
          </div>
          <div
            className="col-md-4 no-padding"
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
                columns = {3} />

              <h4 style={{textAlign:'center'}}>Do you need speakers?</h4>
              <ToggleOptions
              glued={true}
              >
                <Button
                  name = "SPEAKERS_TRUE"
                  label =  "Yes"
                />

                <Button
                  name = "SPEAKERS_UNCERTAIN"
                  label =  "Uncertain"
                />

                <Button
                  name = "SPEAKERS_NO"
                  label =  "No"
                />
              </ToggleOptions>
</div>
            </Card>
          </div>
          <div
            className="col-md-3 no-padding"
            style={{

            }}>
            <Card
              expanded>

<div style={{padding:'15px'}}>
              <h4 style={{textAlign:'center'}}>Time</h4>
              <h4 style={{textAlign:'center'}}>Guests</h4>
              <h4 style={{textAlign:'center'}}>DJ experience</h4>


</div>
            </Card>
          </div>
          </div>
        </Form>

      )

  }
})

var styledRequestForm = Radium(RequestForm)
export default muiThemeable()(styledRequestForm)
