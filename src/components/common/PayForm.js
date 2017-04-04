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
import MoneyTable, {TableItem} from './MoneyTable'
import CurrencyConverter from '../../utils/CurrencyConverter'
const curConverter = new CurrencyConverter()

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
      var amount = curConverter.getConvertedFormatted(this.props.amount, this.props.offerCurrency, this.props.currency, true)
      var fee = curConverter.getConvertedFormatted(this.props.fee, this.props.offerCurrency, this.props.currency, true)
      const data = assign(form.values, {
        amount: Formatter.money.ToSmallest(amount, this.props.currency),
        fee: Formatter.money.ToSmallest(fee, this.props.currency),
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
              text={this.props.paymentPossible ?
               "Please enter payment information below. In case of cancelation by the DJ, all money will be refunded. All information is encrypted. " 
               : 
               "The offer can be confirmed and paid up to 60 days before the event. To get notified by email click notify."}>
            </TextWrapper>
            </div>

          </div>
          
          <div className="row mobileColumn">


        <div className="col-md-push-7 col-md-5">
           <MoneyTable>
             <TableItem
                label="DJ price"
                info="The price the DJ has offered."
                >
                {curConverter.getConvertedFormatted(this.props.amount, this.props.offerCurrency, this.props.currency, true)}
            </TableItem>
             <TableItem
                label="Service fee"
                info={ 
                    <div>
                    The fee is calculated per offer, <br/>
                    and helps us run the platform. <br/>
                    It includes VAT.
                    </div>
                    }
                >
                {curConverter.getConvertedFormatted(this.props.fee, this.props.offerCurrency, this.props.currency, true)}
            </TableItem>
            <TableItem
              label="Total"
              >
              {curConverter.getConvertedFormatted(this.props.fee+this.props.amount, this.props.offerCurrency, this.props.currency, true)}
            </TableItem>
        </MoneyTable>
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
            <div className="col-md-12">
              <p className="terms_link">By clicking confirm you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>, and the cancelation policy specified by the DJ.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
              <a  
              style={{float:"right"}}
              href="https://stripe.com/" target="_blank">
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
