import React, { PropTypes } from 'react'
import checkmark from '../../../assets/checkmark.svg'
import SubmitButton from '../../../components/common/SubmitButton'
import dot from '../../../assets/dot.svg'
import ErrorMessage from '../../../components/common/ErrorMessage'
export default React.createClass({

   propTypes: {
      step1Done: PropTypes.bool,
      step2Done: PropTypes.bool,
      step3Done: PropTypes.bool,
      onSubmit: PropTypes.func
    },

    contextTypes:{
      color: PropTypes.string,
      isFormValid: PropTypes.func
    },

    getInitialState(){
      return{
        msg: null
      }
    },

    onSubmit(form, callback){
      if(this.context.isFormValid(true)){
        
        this.props.onSubmit(form, (err,res)=>{
                if (!err) {
                  this.setState({msg: "Thank you for using our service. We will send you an email with confirmation of the event."})
                }
                callback(err,res)
         })
      }else{
       callback("Please fill out all required fields") 
      }
    },

  render() {
    const finished = this.props.step1Done && this.props.step2Done && this.props.step3Done
    // var className = finished ? "done progrezz" : "progrezz"
    var className = "progrezz"

    var dotBg = "url(" + dot + ")"
    return (
      <div className="event-submit-wrapper"> 
      <div className="progrezz-wrapper">
        <div
          style={{
            backgroundImage: dotBg,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "50%"
          }}
          className={className}>

          <div style={{backgroundColor: "#FFFFFF"}} className="circle">
            <div style={{backgroundColor:this.context.color}}className={this.props.step1Done ? "circle ztep done" : "circle ztep" }>
              {this.props.step1Done ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 1}
            </div>
          </div>

          <div style={{backgroundColor: "#FFFFFF"}} className="circle">
            <div style={{backgroundColor:this.context.color}}className={this.props.step2Done ? "done circle ztep" : "circle ztep"}>
              {this.props.step2Done ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 2}
            </div>
          </div>

          <div style={{backgroundColor: "#FFFFFF"}} className="circle">
            <div style={{backgroundColor:this.context.color}}className={this.props.step3Done ? "circle ztep done" : "circle ztep"}>
              {this.props.step3Done ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 3}
            </div>
          </div>

        </div>
        
       </div>
        
        <div >
          <SubmitButton
            active
            name="request_djs_button"
            onClick={this.onSubmit}
            glow
          >
            <div style={{width:"150px"}}>Send event</div>
          </SubmitButton>
        </div>
        <ErrorMessage/>
        {this.state.msg ? <div style={{textAlign:"center", margin: "10px 0"}}><p style={{fontSize:"20px"}}>{this.state.msg}</p></div> : null}
       </div>
    )
  }
})
