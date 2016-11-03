import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import PayoutForm from '../blocks/PayoutForm'
import Popup from '../common/Popup'

import TextWrapper from '../common/TextElement'
import muiThemeable from 'material-ui/styles/muiThemeable'


var Preferences = React.createClass({
  propTypes: {
    user: PropTypes.object,
    provider: PropTypes.string,
    toggleEditMode: PropTypes.func,
    editMode: PropTypes.bool,
    connectFacebook: PropTypes.func,
    connectSoundCloud: PropTypes.func,
    connectDB: PropTypes.func,
    deleteAccount: PropTypes.func
  },


    hidePopup(){
      this.setState({
        showPopup: false
      })
    },

  getActionButtons(props = this.props){
    return (
    <div
      className="action-buttons"
      key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          active={props.editMode}
          rounded={true}
          labelToggled="Save"
          label="Edit preferences"
          onClick={props.toggleEditMode}
          onClickToggled={()=>console.log("not implemented")}
          name="edit_profile"
        />
      </div>
      { props.editMode ?
        <div style={{marginBottom:"4px"}}>
          <Button
            rounded={true}
            label="Cancel"
            active={true}
            onClick={()=>console.log("not implemented")}
            name="cancel_edit_profile"
          />
        </div>  : null }

      { props.editMode ?
        <div style={{marginBottom:"4px"}}>
          <Button
            rounded={true}
            dangerous={true}
            label="Delete account"
            active={true}
            onClick={this.props.deleteAccount}
            name="delete_account"
          />
        </div>  : null }



      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded={true}
          label="Request features"
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {

    const styles ={

      inline:{
        display: 'inline-block'
      },
      flex:{
        display: 'flex',
        alignItems: 'center'
      },
      large:{
        textarea: {
          height: '80px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '24px',
          height: 'initial',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          bottom: '20px',
          fontSize: '30px',
          fontWeight: '300',
        }
      },
      medium:{
        textarea: {
          height: '40px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '14px',
          height: 'initial',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          fontSize: '14px',
          height: 'initial',
          fontWeight: '300',

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
    const isDJ = this.props.user.isDJ
    return(
      <div>
        {this.getActionButtons()}

        <Popup showing={this.state.showPopup}
          onClickOutside={this.hidePopup}>
          <PayoutForm/>

        </Popup>

        <div className="row">
          <div className="col-lg-6">

            {isDJ ?
              <TextWrapper
                label="Payout"
                text="To get paid, you need to set up a payout method.
                Cueup releases payouts about 24 hours after a job is finished.">
                {this.props.user.last4 ?
                  <div className="user-card-info">
                    <div className="user-card-fact">
                      <p>Current account number</p>
                      {"**************" + this.props.user.last4}
                    </div>
                  </div>

                : null}
                <Button
                  rounded={true}
                  label={!this.props.user.last4 ?
                    "Setup payout info"
                  : "Update payout info"}
                  onClick={()=>this.setState({showPopup:true})}
                  name="show-payout-popup"
                />
              </TextWrapper>
            : null }

            {/* {isDJ ?
              <TextWrapper
              label="Availability"
              text="Choose the days you are able to play. You will only receive requests for events happening on the selected days.">
              <ToggleButtonHandler
              name="availability"
              errorAbove={true}
              potentialValues={c.WEEKDAYS}
              columns={7}
              preToggled={this.props.profile.availability}
              disabled={!this.props.editMode} />

              </TextWrapper>
            : null} */}


            {/* <TextWrapper
              label="Notifications"
              text="Choose the kind of notifications you want to receive by e-mail.">
              <ToggleButtonHandler
              name="notifications"
              errorAbove={true}
              required={false}
              potentialValues={isDJ ? c.NOTIFICATIONS : c.CUSTOMER_NOTIFICATIONS}
              columns={2}
              preToggled={this.props.profile.notifications}
              disabled={!this.props.editMode} />

            </TextWrapper> */}

            { this.props.provider === "auth0" ?
              <div style={{marginBottom:"4px"}}>
                <TextWrapper
                  label="Password"
                  text="Change your password here">
                  <div className="row">
                    <div className="col-xs-6">
                      <TextField
                        name="password"
                        hintStyle={styles.medium.hint}
                        style={styles.medium.textarea}
                        inputStyle={styles.medium.input}
                        disabled={!this.props.editMode}
                        type="password"
                        fullWidth={false}
                        placeholder="Password"
                        underlineDisabledStyle={styles.plainBorder}
                        underlineStyle={styles.dottedBorderStyle}
                      />
                    </div>
                    <div className="col-xs-6">
                      <TextField
                        name="password_repeat"
                        hintStyle={styles.medium.hint}
                        style={styles.medium.textarea}
                        inputStyle={styles.medium.input}
                        disabled={!this.props.editMode}
                        type="password"
                        fullWidth={false}
                        placeholder="Repeat password"
                        underlineDisabledStyle={styles.plainBorder}
                        underlineStyle={styles.dottedBorderStyle}
                      />

                    </div>
                  </div>
                </TextWrapper>
              </div>  : null }

            {/* <TextWrapper
              label="Connect social platforms"
              text="If you want to log in using a social platform or connect existing accounts.">
              <div className="row">
              <div className="col-xs-3">
              <Button
              rounded= {true}
              label="Facebook"
              active={true}
              onClick= {this.props.connectFacebook}
              name="connect_facebook"
              />
              </div>
              <div className="col-xs-3">
              <Button
              rounded= {true}
              label="SoundCloud"
              active={true}
              onClick= {this.props.connectSoundCloud}
              name="connect_soundcloud"
              />
              </div>
              <div className="col-xs-3">
              <Button
              rounded= {true}
              label="E-mail & Password"
              active={true}
              onClick= {this.props.connectDB}
              name="connect_db"
              />
              </div>
              </div>
            </TextWrapper> */}


          </div>
        </div>
      </div>)

  }
})

var styledPreferences = Radium(Preferences)
export default muiThemeable()(styledPreferences)
