import React, { PropTypes } from 'react'
import TextField from './Textfield'
import TextWrapper from './TextElement'
import PoweredByStripe from '../../assets/powered_by_stripe.png'
import Form from './Form-v2'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import * as actions from '../../actions/UserActions'
import Button from './Button-v2'
import ToggleOptions from './ToggleOptions'
import {datePipe} from '../../utils/TextPipes'
import Formatter from '../../utils/Formatter'

import CountryCurrency from '../../utils/CountryCurrency'
const countryCur = new CountryCurrency()
var payoutForm = React.createClass({
  propTypes: {
    user: PropTypes.object,
    updatePayoutInfo: PropTypes.func
  },

  updatePayoutInfo(form, callback) {
      const info = form.values
      info.account_holder_name = this.props.user.name
      const country = this.state.area === "usa" ? "USA" : info.bank_country 
      countryCur.getCurrency(country)
      .then(result=>{
          this.props.updatePayoutInfo({
            ...info, 
            bank_country: country,
            birthday: Formatter.date.FromEUStringToUSDate(info.birthday),
            account_country: result.countryTwoLetter, 
            account_currency: result.currency}, callback)
      }).catch((err)=>callback("Country could not be found"))

  },


    getInitialState() {
      return {
        valid: false,
        area: "europe"
      }
    },


  render() {

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
            All information is encrypted. We are using IBAN numbers to 
            allow deals between countries. That way you can play gigs 
            in foreign contries if you're traveling.">
             <div className="row" style={{marginBottom:"10px"}}>
            <div className="col-md-12">
                <ToggleOptions
                  name="area"
                  glued={true}
                  value={this.state.area}
                  onChange={(val)=>this.setState({area:val})}
                >
                  <Button
                    name="europe"
                >
                Europe
                </Button>

                  <Button
                    name="usa"
                  >USA</Button>


                </ToggleOptions>
            </div>
           </div>
           {this.state.area === "europe" ?
             <div className="row">
              <div className="col-xs-12">
                <TextField
                  name="bank_country"
                  type="text"
                  validate={['required']}
                  value={this.props.country || null}
                  fullWidth={false}
                  placeholder="Country"
                />
              </div>
            </div>
             :null}
            <div className="row">
              <div className="col-sm-6">
                <TextField
                  name="bank_city"
                 
                  type="text"
                  fullWidth={false}
                  validate={['required']}
                  placeholder="City"
                  value={this.props.city || null}

                />
              </div>
              <div className="col-sm-6">
                <TextField
                  name="bank_zip"
                  type="text"
                  validate={['required']}
                  fullWidth={false}
                  placeholder="Postal code"

                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <TextField
                  name="bank_address"
                 
                  type="text"
                  validate={['required']}

                  fullWidth={false}
                  placeholder="Address"
                />

              </div>
            </div>
            
            {/*<TextField
            onUpdatePipeFunc={datePipe}
            maxLength="10"
            type="text"
            name="birthday"
            validate={['required', 'date']}
            placeholder="Birthday dd/mm/yyyy"
            label="Birthday"/>
            */}
             {/*<div className="col-xs-12">
                <TextField
                  name="ssn_number"
                 
                  validate={[]}
                  type="number"
                  fullWidth={false}
                  placeholder="SSN-number"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}
                />
              </div>*/}
              {this.state.area === "europe" ?
              <div className="row">
                <div className="col-xs-12">
                  <TextField
                    name="account_number"
                  
                    validate={['required']}
                    type="text"
                    fullWidth={false}
                    placeholder="IBAN-number"


                  />
                </div>
              </div> 
              :
              <div className="row">
              <div className="col-xs-6">
                <TextField
                  name="account_routing"
                  validate={['required']}
                  type="text"
                  fullWidth={false}
                  placeholder="Routing number"
                />
                   </div>
                <div className="col-xs-6">
                  <TextField
                  name="account_number"
                 
                  validate={['required']}
                  type="text"
                  fullWidth={false}
                  placeholder="Account number"
                />
               </div>
              </div>
                }
               

          </TextWrapper>

          <div className="row">
            <div className="col-xs-12">
              <p className="terms_link">By clicking save, you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>, and stripes <a target="_blank" href="https://stripe.com/dk/connect-account/legal">connect account agreement.</a></p>
            </div>
          </div>

          <div className="row buttons-wrapper">
            <div className="col-xs-6">
              <SubmitButton
                glow
                type="submit"
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
  return{
    user:  state.login.profile,
    country: state.session.country,
    city: state.session.city,
}
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
