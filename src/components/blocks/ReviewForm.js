import React, { PropTypes } from 'react'
import SubmitButton from '../common/SubmitButton'
import TextBox from '../common/TextBox'
import TextWrapper from '../common/TextElement'

import Rating from '../common/Rating'
import Form from '../../containers/Form-v2'


export default React.createClass({
  propTypes: {
    name: PropTypes.string,
    dj: PropTypes.object,
    review: PropTypes.object,
    submitReview: PropTypes.func
  },

  componentWillMount() {
    this.setState({
      editable : this.props.review ? false : true
    })
  },

  submitReview(form, callback){
    this.props.submitReview(form, callback)
  },

  render() {
        return (
          <div>

          <Form
           name={this.props.name} >

          <TextWrapper
            label="Rating"
          >
                  <div style={{width: "150px"}}>
                    <Rating
                    rating={!this.state.editable ? this.props.review.rating : 0}
                    editable={this.state.editable}
                    name="rating"
                    />
                  </div>
            </TextWrapper>

            <div
              style={{
                width:'100%',
                paddingTop: '0px',
                paddingBottom: '20px',

              }}
              expandable={true}
            >

              <TextBox
                width="100%"
                height="100px"
                name="description"
                disabled={!this.state.editable}
                value={!this.state.editable ? this.props.review.description : ""}
                placeholder="Optionally tell us how you liked the DJ!"
              />
              {
              this.state.editable ?
              <SubmitButton
              rounded={true}
              onClick={this.submitReview}
              label="Submit review"
              />
              : null
              }

            </div>
          </Form>

        </div>)
    }
  })
