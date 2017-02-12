import React, { PropTypes } from 'react'
import TextField from './Textfield'
import TextWrapper from './TextElement'
import PoweredByStripe from '../../assets/powered_by_stripe.png'
import Form from './Form-v2'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import * as actions from '../../actions/EventActions'
import {datePipeCard, cardNumberPipe} from '../../utils/TextPipes'
import Formatter from '../../utils/Formatter'

import assign from 'lodash.assign'

var payForm = React.createClass({
  propTypes: {
    amount: PropTypes.number,
    event: PropTypes.object,
    gigId: PropTypes.number,
    currency: PropTypes.string,
    confirmPayment: PropTypes.func
  },

  confirmPayment(form, callback) {
      const data = assign(form.values, {
        amount: Formatter.money.ToSmallest(this.props.amount, this.props.currency),
        fee: Formatter.money.ToSmallest(this.props.fee, this.props.currency),
        currency: this.props.currency,
        chosenGigID: this.props.gigId
      })
      try {
         this.props.confirmPayment(this.props.event.id, this.props.event.hashKey, data, callback)
      } catch (error) {
        callback("Something went wrong, the payment has not been made")
      }
  },

  notify(form, callback) {
      try {
       this.props.notify(this.props.event.id, this.props.event.hashKey, callback)
      } catch (error) {
        callback("Something went wrong")
      }
  },

getInitialState(){
  return{
    valid:false
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
      <div>


    <Form

            formValidCallback={()=>this.setState({valid:true})}
            formInvalidCallback={()=>this.setState({valid:false})}
            name="pay-form">

        <div className="pay-form">
          
          <div className="row">
            <div className="col-md-12">

            <TextWrapper
              label="Pay"
              showLock={true}
              text={this.props.paymentPossible ? "All information is encrypted." : "The offer can be confirmed and paid up to 28 days before the event. To get notified by email click notify."}>
            </TextWrapper>
            </div>

          </div>
          
          <div className="row mobileColumn">


        <div className="col-md-push-7 col-md-5">
             <div className="pay-info">
            <div className="pay-fact">
              <div>
                <p style={{float:"left"}}>DJ price</p>
                <div className="info-popup">
                  <svg style={{height: "1em"}} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M9,0 C4.582,0 1,3.581 1,8 C1,12.419 4.582,16 9,16 C13.418,16 17,12.419 17,8 C17,3.581 13.418,0 9,0 L9,0 Z M9,14 C8.44769231,14 8,13.5523077 8,13 C8,12.4469231 8.44769231,12 9,12 C9.55230769,12 10,12.4469231 10,13 C10,13.5523077 9.55230769,14 9,14 L9,14 Z M10.647,8.243 C10.174,8.608 9.913,8.809 9.913,9.39 L9.913,10.204 C9.913,10.663 9.507,11.038 9.006,11.038 C8.504,11.038 8.097,10.663 8.097,10.204 L8.097,9.39 C8.097,8.033 8.928,7.392 9.477,6.968 C9.951,6.602 10.211,6.402 10.211,5.822 C10.211,5.168 9.67,4.634 9.006,4.634 C8.341,4.634 7.801,5.167 7.801,5.822 C7.801,6.283 7.393,6.655 6.892,6.655 C6.392,6.655 5.983,6.283 5.983,5.822 C5.983,4.248 7.34,2.968 9.006,2.968 C10.671,2.968 12.027,4.247 12.027,5.822 C12.027,7.178 11.197,7.818 10.647,8.243 L10.647,8.243 Z" fill="#434343" class="si-glyph-fill"></path>
                    </g>

                  </svg>
                  <div className="info">
                    The price the DJ has offered.
                  </div>
                </div>
              </div>
              {Formatter.money.FormatNumberToString(this.props.amount, this.props.currency)}
            </div>
            <div className="pay-fact">
              <div>
                <p style={{float:"left"}}>Service fee</p>
                <div className="info-popup">
                  <svg style={{height: "1em"}} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M9,0 C4.582,0 1,3.581 1,8 C1,12.419 4.582,16 9,16 C13.418,16 17,12.419 17,8 C17,3.581 13.418,0 9,0 L9,0 Z M9,14 C8.44769231,14 8,13.5523077 8,13 C8,12.4469231 8.44769231,12 9,12 C9.55230769,12 10,12.4469231 10,13 C10,13.5523077 9.55230769,14 9,14 L9,14 Z M10.647,8.243 C10.174,8.608 9.913,8.809 9.913,9.39 L9.913,10.204 C9.913,10.663 9.507,11.038 9.006,11.038 C8.504,11.038 8.097,10.663 8.097,10.204 L8.097,9.39 C8.097,8.033 8.928,7.392 9.477,6.968 C9.951,6.602 10.211,6.402 10.211,5.822 C10.211,5.168 9.67,4.634 9.006,4.634 C8.341,4.634 7.801,5.167 7.801,5.822 C7.801,6.283 7.393,6.655 6.892,6.655 C6.392,6.655 5.983,6.283 5.983,5.822 C5.983,4.248 7.34,2.968 9.006,2.968 C10.671,2.968 12.027,4.247 12.027,5.822 C12.027,7.178 11.197,7.818 10.647,8.243 L10.647,8.243 Z" fill="#434343" class="si-glyph-fill"></path>
                    </g>

                  </svg>
                  <div className="info">
                    The fee is calculated per offer, <br/>
                    and helps us run the platform. <br/>
                    It includes VAT.
                  </div>
                </div>
              </div>
              {Formatter.money.FormatNumberToString(this.props.fee, this.props.currency)}

            </div>
            <div className="pay-fact">
              <p>Total</p>
              {Formatter.money.FormatNumberToString(this.props.fee+this.props.amount, this.props.currency)}
              </div>
            </div>
          </div>

       <div className="col-md-pull-5 col-md-7">
              {this.props.paymentPossible
                ?
                  <div>
                    <div className="row ">
                      <div className="col-xs-12">
                        <TextField
                          name="card_name"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          inputStyle={styles.medium.input}
                          type="text"
                          validate={['required', 'lastName']}
                          onUpdatePipeFunc={cardNumberPipe}
                          fullWidth={false}
                          placeholder="Cardholder name"
                          underlineDisabledStyle={styles.plainBorder}
                          underlineStyle={styles.dottedBorderStyle}
                        />

                      </div>
                      </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <TextField
                          name="card_number"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          inputStyle={styles.medium.input}
                          type="text"
                          maxLength="19"
                          validate={['required', 'validateCardNumber']}
                          onUpdatePipeFunc={cardNumberPipe}
                          fullWidth={false}
                          placeholder="1234 1234 1234 1234"
                          underlineDisabledStyle={styles.plainBorder}
                          underlineStyle={styles.dottedBorderStyle}
                        />

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <TextField
                          name="card_expiry"
                          onUpdatePipeFunc={datePipeCard}
                          maxLength="5"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          inputStyle={styles.medium.input}
                          validate={['required', 'validateCardExpiry']}
                          type="text"
                          fullWidth={true}
                          placeholder="mm/yy"
                          underlineDisabledStyle={styles.plainBorder}
                          underlineStyle={styles.dottedBorderStyle}
                        />
                      </div>
                      <div className="col-xs-6">
                        <TextField
                          name="card_cvc"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          inputStyle={styles.medium.input}
                          validate={['required', 'validateCardCVC']}
                          type="number"
                          fullWidth={false}
                          placeholder="CVC"
                          underlineDisabledStyle={styles.plainBorder}
                          underlineStyle={styles.dottedBorderStyle}

                        />
                      </div>
                    </div>
                  </div>
                :
                null
              }
          </div>
          
         

          </div>
           <div style={{marginTop:"20px"}} className="row">
            <div className="col-md-7">
              <p className="terms_link">By clicking confirm you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
               <div className="row">
                 <div className="col-xs-6">
                    <SubmitButton
                      glow
                      active={this.state.valid}
                      rounded={true}
                      name={this.props.paymentPossible ? "confirm_payment" : "notify_payment"}
                      onClick={this.props.paymentPossible ? this.confirmPayment : this.notify}
                    >{this.props.paymentPossible ? "Confirm & Pay" : "Notify"}</SubmitButton>
                 </div>
                 <div className="col-xs-6">
              <a  href="https://stripe.com/" target="_blank">
                              <img role="presentation" src={PoweredByStripe}/>
              </a>
                 </div>
               </div>
             
              
            </div>
          </div>

       </div>

        </Form>

      </div>)

  }
})

function mapStateToProps(state, ownprops){
  return{
    event: state.events.values[0]
}
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
      confirmPayment: (id,hash,data, callback) => dispatch(actions.payEvent(id,hash,data,callback)),
      notify: (id, hash, callback) => dispatch(actions.notifyPayment(id, hash,callback)),
  }
}

const SmartPay = connect(mapStateToProps, mapDispatchToProps)(payForm)


export default props => (
    <SmartPay {...props}/>
)
