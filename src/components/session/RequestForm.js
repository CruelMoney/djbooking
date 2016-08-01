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
        }
    }



    return(
      <div
        style={{
          marginBottom:"100px",
          marginTop:"100px"
        }}>
        <Form
          onSubmit={()=>null}
          updateValue={()=> null}
        >

          <div
            className="col-md-5"
            style={{

            }}>
            <Card
              expanded>
              <TextField
                placeholder="today"
                label="Event date"/>
              <TextField
                validate={['required']}
                label="Event title"
                placeholder="My crazy party"
              />
              <LocationSelector
                name="email"
                validate={['required']}
                label="Event location"
                placeholder="Copenhagen"
              />
              <TextField
                name="email"
                validate={['required', 'lastName']}
                label="Your name"
              />
              <TextField
                name="email"
                validate={['required', 'email']}
                label="Your Email"
              />
            </Card>
          </div>
          <div
            className="col-md-4"
            style={{

            }}>
            <Card
              expanded>

              <ToggleButtonHandler
                name="genres"
                potentialValues={c.GENRES}
                columns = {3} />

              <ToggleOptions>
                <Button
                  large={true}
                  leftAlign={true}
                  name = "SPEAKERS_TRUE"
                  rounded= {true}
                  label =  "Yes"
                />

                <Button
                  large={true}
                  leftAlign={true}
                  name = "SPEAKERS_UNCERTAIN"
                  rounded= {true}
                  label =  "Uncertain"
                />

                <Button
                  large={true}
                  leftAlign={true}
                  name = "SPEAKERS_NO"
                  rounded= {true}
                  label =  "No"
                />
              </ToggleOptions>

            </Card>
          </div>
          <div
            className="col-md-3"
            style={{

            }}>
            <Card
              expanded>

            </Card>
          </div>
        </Form>

      </div>
      )

  }
})

var styledRequestForm = Radium(RequestForm)
export default muiThemeable()(styledRequestForm)
