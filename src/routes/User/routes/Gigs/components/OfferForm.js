import React, { PropTypes, Component } from 'react'
import Button from '../../../../../components/common/Button-v2'
import TextField from '../../../../../components/common/Textfield'
import Formatter from '../../../../../utils/Formatter'
import Form from '../../../../../components/common/Form-v2'
import SubmitButton from '../../../../../components/common/SubmitButton'
import assign from 'lodash.assign'
import PayoutForm from '../../../../../components/common/PayoutForm'
import Popup from '../../../../../components/common/Popup'
import {moneyPipe} from '../../../../../utils/TextPipes'
import MoneyTable, {TableItem} from '../../../../../components/common/MoneyTable'
import  * as actions from '../../../../../actions/GigActions'


class OfferForm extends Component{

  componentWillMount(){
    this.setState({
      ...this.props.gig.offer,
      showPopup: false,
      usePointPossible: this.props.discountPoints > 0 && !this.props.gig.referred && this.props.gig.status !== "Confirmed"
    })
  }
        
  updateOffer = (form, callback) => {
    if (this.props.payoutInfoValid) {
      this.props.updateGig(this.state, callback)
    }
  }

  getFees = () => {
    this.setState({
      loading: true
    },()=>
    actions.getFee({
        ...this.state, 
        currency:this.props.currency
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

  hidePopup=()=>{
    this.setState({
      showPopup: false
    })
  }

  render() {
      return (
          <div>
          <Popup showing={this.state.showPopup}
            onClickOutside={this.hidePopup}>
            <PayoutForm/>
          </Popup>  


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
                          <p>Enter your price to play this gig.
                          You can always update the offer until it has been paid.</p>
                          {this.state.usePointPossible ?
                           <p>Use a Cueup point to discard the DJ fee. 
                             You can update whether to use or not use the point, until the offer has been paid.
                             If the gig gets cancelled, the point will be restored.</p>
                          : null}
                          {this.props.gig.referred ?
                           <p>This gig is a direct booking of you, therefore the DJ fee is discarded.</p>
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
                                onChange={(val)=>this.setState({amount:parseInt(val)})}
                                value={this.state.amount}
                              />
                              </div>
                    
                              <div className="col-sm-6">
                                  {this.state.usePointPossible
                                ?
                                  <Button
                                    active={this.state.discount}
                                    onClick={this.toggleDiscount}
                                  >Use Cueup point
                                  </Button>

                              : null} 
                              </div>
                              </div>
                            </div>

                           :null}

                          <div 
                            className="row card offer-table"
                            style={{ padding: "20px", marginBottom:"30px", marginTop:"20px"}}
                          >
                          <div className="col-sm-6"> 
                            <h4 style={{textAlign: "center"}}>Organizer pays</h4>
                            <MoneyTable>
                             <TableItem
                                  label="Your price"
                                    >
                                  {Formatter.money.FormatNumberToString(this.state.amount, this.props.currency)}
                              </TableItem>
                              <TableItem
                                  label="Service Fee"
                                  info={ 
                                      <div>
                                      This fee is calculated based <br/>
                                      on the offer. <br/>
                                      The organizer has to pay this. <br/>
                                      </div>
                                      }
                                  >
                                  {this.state.loading ? 
                                   "loading..." 
                                   :
                                  Formatter.money.FormatNumberToString(this.state.serviceFeeAmount, this.props.currency)}
                              </TableItem>
                              <TableItem
                                label="Total"
                               
                                >
                                {this.state.loading ? 
                                   "loading..." 
                                   :
                                Formatter.money.FormatNumberToString(this.state.serviceFeeAmount+this.state.amount, this.props.currency)}
                              </TableItem>
                            </MoneyTable>
                           </div>
                             <div className="col-sm-6"> 
                            <h4 style={{textAlign: "center"}}>You earn</h4>
                            <MoneyTable>
                              <TableItem
                                  label="Your price"
                                    >
                                  {Formatter.money.FormatNumberToString(this.state.amount, this.props.currency)}
                              </TableItem>
                                <TableItem
                                  label="DJ Fee"
                                  info={ 
                                      <div>
                                      A fee on 3% is subtracted <br/>
                                      from your price. Using a Cueup <br/>
                                      point will discard this fee. <br/>
                                      </div>
                                      }
                                    >
                                   {this.state.loading ? 
                                   "loading..." 
                                   :
                                    "-"+Formatter.money.FormatNumberToString(this.state.djFeeAmount, this.props.currency)
                                   } 
                                 
                              </TableItem>
                              <TableItem
                                  label="Total"
                                  
                                  >
                                  {this.state.loading ? 
                                   "loading..." 
                                   :
                                  Formatter.money.FormatNumberToString(this.state.amount-this.state.djFeeAmount, this.props.currency)
                                  }
                              </TableItem>
                            </MoneyTable>
                           </div>
                      </div>
            



                    { this.props.gig.status === "Lost" ?
                      <p>
                        Sorry you have lost this gig to another DJ. <br/>
                        Next time try to set another price or be faster at responding. <br/>
                        Adding info to your profile also helps the organizer being comfortable in choosing you.
                      </p>
                    :  null}


                    {!this.props.payoutInfoValid ?
                        <p>Please update your payout information before making an offer.</p>
          
                    : null }

                    {
                      (((this.props.gig.startTime.getTime() - Date.now()) > 0)) ? 
                     
                   
                    <div className="offer-buttons">
                      <Form
                        resetStatusOnSucces
                        name={"gig-cancel-" + this.props.gig.id}
                      >

                        {  (this.props.gig.status === "Requested" || this.props.gig.status  === "Accepted")
                          ?
                            <SubmitButton
                              rounded={true}
                              dangerous
                              warning="Are you sure you want to decline the gig?"
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.declineGig(this.props.gig.id, callback)}
                            >Decline gig</SubmitButton>
                        : null}


                        { 
                          this.props.gig.status  === "Confirmed" 
                          ?

                            <SubmitButton
                              rounded={true}
                              dangerous
                              warning="Are you sure you want to cancel the gig? All money will be refunded to the organizer."
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.cancelGig(this.props.gig.id, callback)}
                            >Cancel gig</SubmitButton>

                        : null}

                      </Form>


                      { this.props.gig.status === "Requested" && this.props.payoutInfoValid ? 
                        <SubmitButton
                          rounded={true}
                          name="send_offer"
                          onClick={this.updateOffer}
                        >Send offer</SubmitButton>
                      : null}

                      { this.props.gig.status === "Accepted" && this.props.payoutInfoValid ?
                        <SubmitButton
                          rounded={true}
                          name="update_offer"
                          onClick={this.updateOffer}
                        >Update price offer</SubmitButton>
                      :null}

                      {!this.props.payoutInfoValid ?
                        <Button
                          rounded={true}
                          onClick={()=>this.setState({showPopup:true})}
                          name="show-payout-popup"
                        >Update payout information</Button>
                    : null }
                    
                    </div>

                  : null
                  }
                   
                  </Form>
                </div>
)

  }
}

import { connect } from 'react-redux'

function mapStateToProps(state, ownProps){
  return {
    discountPoints: state.login.profile.discountPoints,
    payoutInfoValid:  state.login.profile.stripeID ? true : false,  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelGig:  (id, callback) => dispatch(actions.cancelGig(id,callback)),
    declineGig: (id, callback) => dispatch(actions.declineGig(id,callback)),
    updateGig:  (offer, callback)  => dispatch(actions.makeOffer(offer,callback)),
}}


const SmartGig = connect(mapStateToProps, mapDispatchToProps)(OfferForm)

export default props => (
    <SmartGig {...props}/>
)
