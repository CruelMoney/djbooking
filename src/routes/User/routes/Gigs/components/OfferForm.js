import React, { Component } from 'react'
import Button from '../../../../../components/common/Button-v2'
import TextField from '../../../../../components/common/Textfield'
import Form from '../../../../../components/common/Form-v2'
import SubmitButton from '../../../../../components/common/SubmitButton'
import MoneyTable, {TableItem} from '../../../../../components/common/MoneyTable'
import  * as actions from '../../../../../actions/GigActions'
import {currencyConverter} from '../../../../../utils/CurrencyConverter'
import { connect } from 'react-redux'
import { localize } from 'react-localize-redux';


class OfferForm extends Component{

  componentWillMount(){
    this.setState({
      ...this.props.gig.offer,
      usePointPossible: (this.props.discountPoints > 0 || (this.props.gig.discount)) && !this.props.gig.referred && this.props.gig.status !== "Confirmed",
      currency: this.props.gig.status === "Initial" ?  this.props.profileCurrency : this.props.gig.offer.currency
   })
  }
        
  updateOffer = (form, callback) => {
    if (this.props.payoutInfoValid) {
      this.props.updateGig(this.state, callback)
    }
  }

  init = true

  getFees = () => {
    //Dont fire first time
    if (this.init) {
      this.init = false
      return
    }

    this.setState({
      loading: true,
      currency: this.props.profileCurrency
    },()=>
    actions.getFee({
        ...this.state, 
        currency:this.props.profileCurrency
      }, (err,res)=>{
        if(err){
          this.setState({
            loading: false
          })
        }else{
          this.setState({
            ...res,
            loading:false
          })
        }
        
      })
    )
    
  }

  toggleDiscount=()=>{
    this.setState({
      discount: !this.state.discount
    },this.getFees)
  }

  render() {
    const {translate} = this.props;

      return (
          <div>
                  <Form
                    name={"gig-offer-" + this.props.gig.id}
                    formValidCallback={this.getFees}
                  >
                    {this.props.payoutInfoValid 
                      && this.props.gig.status !== "Confirmed" 
                      && this.props.gig.status !== "Finished"  ?
                      <div>
                      <div className="row">
                        <div className="col-xs-12">
                          <p>
                            {translate('gig.offer.intro')}
                          </p>
                          {this.state.usePointPossible ?
                           <p>
                             {translate('gig.offer.point')}
                           </p>
                          : null}
                          {this.props.gig.referred ?
                           <p>
                             {translate('gig.offer.direct')}
                           </p>
                          : null}
                        </div>
                        </div>
                        <div className="row" style={{marginTop:"20px"}}>
                          <div className="col-sm-6">
                            <TextField
                                name="amount"
                                placeholder="00,00"
                                //onUpdatePipeFunc={(oldVal,val)=>moneyPipe(oldVal,val,"DKK")}
                                disabled={this.props.gig.status === "Cancelled"  || this.props.gig.status === "Lost" || this.props.gig.status === "Confirmed" || this.props.gig.status === "Finished" }
                                type="string"
                                fullWidth={true}
                                onChange={(val)=>this.setState({amount:parseInt(val, 10)})}
                                value={this.state.amount}
                              />
                              </div>
                    
                              <div className="col-sm-6">
                                  {this.state.usePointPossible
                                ?
                                  <Button
                                    active={this.state.discount}
                                    onClick={this.toggleDiscount}
                                  >
                                  {translate("gig.offer.use-point")}
                                  </Button>

                              : null} 
                              </div>
                              </div>
                            </div>

                           :null}
                        
                        {this.props.payoutInfoValid ?
                          <div 
                            className="row card offer-table"
                            style={{ padding: "20px", marginBottom:"30px", marginTop:"20px"}}
                          >
                          <div className="col-sm-6"> 
                            <h4 style={{textAlign: "center"}}>{translate("Organizer pays")}</h4>
                            <MoneyTable>
                             <TableItem
                                  label={translate("Your price")}
                                    >
                                  {currencyConverter.getConvertedFormatted(this.state.amount, this.state.currency)}
                              </TableItem>
                              <TableItem
                                  label={translate("Service fee")}
                                  info={ 
                                      <div>
                                      {translate("gig.offer.service-fee-info")}
                                      </div>
                                      }
                                  >
                                  {this.state.loading ? 
                                   "loading..." 
                                   :
                                  currencyConverter.getConvertedFormatted(this.state.serviceFeeAmount, this.state.currency)}
                              </TableItem>
                              <TableItem
                                label="Total"
                               
                                >
                                {this.state.loading ? 
                                   "loading..." 
                                   :
                                currencyConverter.getConvertedFormatted(this.state.serviceFeeAmount+this.state.amount, this.state.currency)}
                              </TableItem>
                            </MoneyTable>
                           </div>
                             <div className="col-sm-6"> 
                            <h4 style={{textAlign: "center"}}>{translate("You earn")}</h4>
                            <MoneyTable>
                              <TableItem
                                  label={translate("Your price")}
                                    >
                                  {currencyConverter.getConvertedFormatted(this.state.amount, this.state.currency)}
                              </TableItem>
                                <TableItem
                                  label={translate("DJ fee")}
                                  info={ 
                                      <div>
                                           {translate("gig.offer.dj-fee-info")}
                                      </div>
                                      }
                                    >
                                   {this.state.loading ? 
                                   "loading..." 
                                   :
                                    currencyConverter.getConvertedFormatted(-this.state.djFeeAmount, this.state.currency)
                                   } 
                                 
                              </TableItem>
                              <TableItem
                                  label="Total"
                                  
                                  >
                                  {this.state.loading ? 
                                   "loading..." 
                                   :
                                  currencyConverter.getConvertedFormatted(this.state.amount-this.state.djFeeAmount, this.state.currency)
                                  }
                              </TableItem>
                            </MoneyTable>
                           </div>
                      </div>
            
                      : null}


                    { this.props.gig.status === "Lost" ?
                      <p>
                        {translate("gig.offer.lost")}
                      </p>
                    :  null}


                    {!this.props.payoutInfoValid ?
                        <p>
                           {translate("gig.offer.update-payout")}
                        </p>
          
                    : null }

                    {
                      (((this.props.gig.startTime.valueOf() - Date.now()) > 0)) ? 
                     
                   
                    <div className="offer-buttons">
                      <Form
                        name={"gig-cancel-" + this.props.gig.id}
                      >

                        {  (this.props.gig.status === "Requested" || this.props.gig.status  === "Accepted")
                          ?
                            <SubmitButton
                              rounded={true}
                              dangerous
                              warning={translate("gig.offer.decline-warning")}
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.declineGig(this.props.gig.id, callback)}
                            >{translate("Decline gig")}</SubmitButton>
                        : null}


                        { 
                          this.props.gig.status  === "Confirmed" 
                          ?

                            <SubmitButton
                              rounded={true}
                              dangerous
                              warning={translate("gig.offer.cancel-warning")}
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.cancelGig(this.props.gig.id, callback)}
                            >
                            {translate("Cancel gig")}
                            </SubmitButton>

                        : null}

                      </Form>


                      { this.props.gig.status === "Requested" && this.props.payoutInfoValid ? 
                        <SubmitButton
                          rounded={true}
                          name="send_offer"
                          onClick={this.updateOffer}
                        >
                         {translate("Send offer")}
                        </SubmitButton>
                      : null}

                      { this.props.gig.status === "Accepted" && this.props.payoutInfoValid ?
                        <SubmitButton
                          rounded={true}
                          name="update_offer"
                          onClick={this.updateOffer}
                        >
                           {translate("Update offer")}
                        </SubmitButton>
                      :null}

                      {!this.props.payoutInfoValid ?
                        <Button
                          rounded={true}
                          onClick={this.props.showPopup}
                          name="show-payout-popup"
                        >
                        {translate("Update payout information")}
                        </Button>
                    : null }
                    
                    </div>

                  : null
                  }
                   
                  </Form>
                </div>
)

  }
}


function mapStateToProps(state, ownProps){
  const {profile} = state.login;
  const payoutInfoValid = profile.stripeID || profile.last4;

  return {
    discountPoints: profile.discountPoints,
    payoutInfoValid: !!payoutInfoValid }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelGig:  (id, callback) => dispatch(actions.cancelGig(id,callback)),
    declineGig: (id, callback) => dispatch(actions.declineGig(id,callback)),
    updateGig:  (offer, callback)  => dispatch(actions.makeOffer(offer,callback)),
}}


const SmartGig = connect(mapStateToProps, mapDispatchToProps)(OfferForm)

export default localize(SmartGig, 'locale');

