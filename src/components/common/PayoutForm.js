import React, { PropTypes } from 'react'
import TextField from './Textfield'
import TextWrapper from './TextElement'
import PoweredByStripe from '../../assets/powered_by_stripe.png'
import Form from './Form-v2'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import * as actions from '../../actions/UserActions'


var payoutForm = React.createClass({
  propTypes: {
    user: PropTypes.object,
    updatePayoutInfo: PropTypes.func
  },

  updatePayoutInfo(form, callback) {
      const info = form.values

      info.account_holder_name = this.props.user.name

      this.props.updatePayoutInfo(info, callback)
  },


    getInitialState() {
      return {
        valid: false
      }
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
    return(
      <div className="payout-form" >

        <Form
          formValidCallback={
            ()=>{this.setState({valid:true})
            }
          }
          formInvalidCallback={()=>{
            this.setState({valid:false})
          }}
          name="payout-form">

          <TextWrapper
            label="Payout"
            showLock={true}
            text="
            All information is encrypted. We are using IBAN numbers to <br>
            allow deals between countries. That way you can play gigs <br>
            in foreign contries if your traveling.">
            <div className="row">
              <div className="col-xs-12">
                <TextField
                  name="bank_address"
                  hintStyle={styles.medium.hint}
                  style={styles.medium.textarea}
                  inputStyle={styles.medium.input}
                  type="text"
                  validate={['required']}

                  fullWidth={false}
                  placeholder="Address"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}
                />

              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <TextField
                  name="bank_city"
                  hintStyle={styles.medium.hint}
                  style={styles.medium.textarea}
                  inputStyle={styles.medium.input}
                  type="text"
                  fullWidth={false}
                  validate={['required']}
                  placeholder="City"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}
                />
              </div>
              <div className="col-xs-6">
                <TextField
                  name="bank_zip"
                  hintStyle={styles.medium.hint}
                  style={styles.medium.textarea}
                  inputStyle={styles.medium.input}
                  type="number"
                  validate={['required']}

                  fullWidth={false}
                  placeholder="Zip code"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}

                />
              </div>
            </div>
            <div className="row">
             
              <div className="col-xs-12">
                <TextField
                  name="account_number"
                  hintStyle={styles.medium.hint}
                  style={styles.medium.textarea}
                  inputStyle={styles.medium.input}
                  validate={['required', 'validateAccountNumberDKK']}
                  type="text"
                  fullWidth={false}
                  placeholder="IBAN-number"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}

                />

              </div>
               
            </div>

          </TextWrapper>
          <div className="row">
            <div className="col-xs-6">
              <SubmitButton
                glow
                active={this.state.valid}
                name="save_payout_info"
                onClick={this.updatePayoutInfo}
              >Save</SubmitButton>
            </div>
            <div className="col-xs-6">
              <a style={{float: "right"}} href="https://stripe.com/" target="_blank">
                <img role="presentation" src={PoweredByStripe}/>
              </a>
            </div>
          </div>
          </Form>

      </div>)

  }
})



function mapStateToProps(state, ownprops){
  return{user:  state.user.profile}
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
      updatePayoutInfo: (data, callback) => dispatch(actions.updatePayoutInfo(data,callback)),
  }
}

const SmartPayout = connect(mapStateToProps, mapDispatchToProps)(payoutForm)


export default props => (
    <SmartPayout {...props}/>
)
