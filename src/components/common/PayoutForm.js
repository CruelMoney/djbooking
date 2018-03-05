import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from './Textfield'
import TextWrapper from './TextElement'
import PoweredByStripe from '../../assets/powered_by_stripe.png'
import Form from './Form-v2'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import * as actions from '../../actions/UserActions'
import Button from './Button-v2'
import ToggleOptions from './ToggleOptions'
import Formatter from '../../utils/Formatter'
import InfoPopup from './InfoPopup'
import { localize } from 'react-localize-redux';

import CountryCurrency from '../../utils/CountryCurrency'
const countryCur = new CountryCurrency()
class payoutForm extends Component {
  propTypes= {
    user: PropTypes.object,
    updatePayoutInfo: PropTypes.func
  }

  updatePayoutInfo = (form, callback) => {
    const {translate} = this.props;

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
      }).catch((err)=>callback(translate("payout.country-not-found")))

  }


    state  = {
        valid: false,
        area: "europe"
      }

  render() {
    const {translate} = this.props;
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
            label={translate("Payout")}
            showLock={true}
            text={translate('payout.description')}>
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
                {translate('europe')}
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
                  placeholder={translate("country")}
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
                  placeholder={translate("city")}
                  value={this.props.city || null}

                />
              </div>
              <div className="col-sm-6">
                <TextField
                  name="bank_zip"
                  type="text"
                  validate={['required']}
                  fullWidth={false}
                  placeholder={translate("postal-code")}

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
                  placeholder={translate("address")}
                >
                <InfoPopup
                      info={translate("payout.address-description")}
                      />
                </TextField>

              </div>
            </div>
            
              {this.state.area === "europe" ?
              <div className="row">
                <div className="col-xs-12">
                  <TextField
                    name="account_number"
                  
                    validate={['required']}
                    type="text"
                    fullWidth={false}
                    placeholder={translate("payout.IBAN-number")}>
                    <InfoPopup
                      info={translate("payout.IBAN-description")}
                      />
                    </TextField>
                  
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
                  placeholder={translate("payout.routing-number")}
                />
                   </div>
                <div className="col-xs-6">
                  <TextField
                  name="account_number"
                  validate={['required']}
                  type="text"
                  fullWidth={false}
                  placeholder={translate("payout.account-number")}
                />
               </div>
              </div>
                }
               

          </TextWrapper>

          <div className="row">
            <div className="col-xs-12">
              <p className="terms_link">
              {translate("payout.terms")}
              </p>
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
              >
              {translate("save")}
              </SubmitButton>
            </div>
            <div className="col-xs-6">
              <a style={{float: "right"}} href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
                <img alt="payment system stripe" src={PoweredByStripe}/>
              </a>
            </div>
          </div>
          </Form>

      </div>)

  }
}



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

export default localize(SmartPayout, 'locale');

