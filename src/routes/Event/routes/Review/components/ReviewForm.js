import React, { Component } from 'react'
import SubmitButton from '../../../../../components/common/SubmitButton'
import TextBox from '../../../../../components/common/TextBox'
import TextWrapper from '../../../../../components/common/TextElement'
import Button from '../../../../../components/common/Button-v2'
import Rating from '../../../../../components/common/Rating'
import Form from '../../../../../components/common/Form-v2'
import {requestFeatures} from '../../../../../actions/Common'
import {connect} from 'react-redux';
import * as actions from '../../../../../actions/EventActions'
import { Helmet } from 'react-helmet';
import {getTranslate} from 'react-localize-redux';


class Review extends Component {

  componentWillMount() {

    this.setState({
      editable : this.props.review ? false : true
    })
  }

  state={
      formValid: true
    }


  submitReview = (form, callback) => {
    this.props.submitReview(this.props.eventId, this.props.hashKey, form.values, callback)
  }

  render() {
    const { translate}  = this.props;
    const title = this.props.event.name + " | " + translate("Review");

    return (
      <div className="row event-information">
          <Helmet>
            <title>{title}</title>
            <meta property="og:title"           content={title} />
            <meta name="twitter:title"      content={title} />
          </Helmet>
        <Form
          resetStatusOnSucces
          formInvalidCallback={()=>this.setState({formValid:false})}
          formValidCallback={()=>this.setState({formValid:true})}
          name="event-review">
          <div className="context-actions" key="profile_actions">

            <SubmitButton
              active={this.state.formValid}
              name="submit_review"
              onClick={this.submitReview}
            >{translate("Submit review")}</SubmitButton>

            <Button
              onClick={()=>requestFeatures()}
              name="request_features">
            {translate("Request features")}</Button>
          </div>
          <div className="event-card-wrapper">
            <div className="card profile col-md-7">

              <TextWrapper
                label={translate("Rating")}
                text={translate("event.review.rating")}
              >
                <div style={{width: "100%"}}>
                  <Rating
                    rating={this.props.review.rating ? this.props.review.rating : 0}
                    editable={true}
                    name="rating"
                    validate={['required']}
                  />
                </div>
              </TextWrapper>

              <div
                style={{
                  width:'100%',
                  paddingTop: '0px',
                  paddingBottom: '20px',

                }}
              >

                <TextBox
                  width="100%"
                  height="100px"
                  name="description"
                  value={this.props.review.description ? this.props.review.description : ""}
                  placeholder={translate("event.review.description")}
                />

              </div>
              </div>
            </div>
          </Form>
        </div>
    )}
  }

  export const mapStateToProps = (state) => {
    let event = state.events.values[0]
    let offer = event.offers.filter(o=>o.gigID === event.chosenOfferId)[0]
    return {
      eventName: event.name,
      dj: offer.dj,
      eventId: event.id,
      hashKey: event.hashKey,
      review: event.review ? event.review : {},
      translate: getTranslate(state.locale)
    }
  }

  export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      submitReview: (id, hash, review, callback) => dispatch(actions.reviewEvent(id, hash, review,callback)),
  }}

  export default connect(mapStateToProps, mapDispatchToProps)(Review);
