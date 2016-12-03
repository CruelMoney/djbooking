import React, {PropTypes} from 'react'
import c from '../../constants/constants'
import {datePipe} from '../../utils/TextPipes'
import NumberedList from '../common/NumberedList'
import Button from '../common/Button-v2'

import Form, {
              Textfield,
              RegistrationElement,
              ToggleButtonHandler,
              LocationSelectorSimple,
              ToggleOptions} from '../../containers/Form'




var signupForm = React.createClass({
  propTypes:{
    handleSubmit: PropTypes.func,
    form: PropTypes.object,
    isloading: PropTypes.bool
  },

  childContextTypes: {
    color: PropTypes.string
  },
  getChildContext() {
    return {
      color: "#31DAFF"
    }
  },



  render() {

  return (
    <Form
      name="signupForm"
      onSubmit={this.props.handleSubmit}
      buttonText="Join"
      isloading={this.props.isloading}
    >
      <NumberedList>
        <RegistrationElement
          isFilter={true}
          name='signup'
          label="Sign Up"
          active={true}
          text="Do you want to sign up using soundcloud, facebook or your email"
        >

          <ToggleOptions
            name="signup"
            glued={false}
            value="FACEBOOK"
          >
            <Button
              name="FACEBOOK"
            >Facebook</Button>

            <Button
              name="SOUNDCLOUD"
            >Soundcloud</Button>

          <Button name="EMAIL">Email & Password</Button>

          </ToggleOptions>

        </RegistrationElement>

        <RegistrationElement
          name="email"
          label="E-mail"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK']}
        >
          <Textfield
            name="email"
            validate={['required', 'email']}
            label="Your Email"/>

        </RegistrationElement>
        <RegistrationElement
          name="phone"
          label="Phone"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >
          <Textfield
            name="phone"
            type="number"
            validate={['required']}
            label="Your phone number"/>

        </RegistrationElement>
        <RegistrationElement
          name="password"
          label="Password"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK','SOUNDCLOUD']}
        >
          <Textfield
            type="password"
            name="password"
            validate={['required']}
            label="Your password"/>
        </RegistrationElement>


        <RegistrationElement
          name="name"
          label="Name"
          active={true}
          text="Please enter your first and last name. It is important that the given information is correct. Otherwise you can't receive your payment."
          hideOn={['FACEBOOK']}
        >
          <Textfield
            name="name"
            placeholder="First Last"
            validate={['required', 'lastName']}
            label="Your name"/>
        </RegistrationElement>


        <RegistrationElement
          name="bday"
          label="Birthday"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK']}

        >

          <Textfield
            onUpdatePipeFunc={datePipe}
            maxLength="10"
            type="text"
            name="birthday"
            validate={['required', 'date']}
            placeholder="dd/mm/yyyy"
            label="Birthday"/>

        </RegistrationElement>

        <RegistrationElement
          name="location"
          label="Location"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >

          <LocationSelectorSimple
            autocomplete="off"
            name="location"
            validate={['required']}
            label="Location"/>

        </RegistrationElement>


        <RegistrationElement
          name="genres"
          label="Genres"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >

          <ToggleButtonHandler
            name="genres"
            potentialValues={c.GENRES}
            columns={4} />

        </RegistrationElement>
      </NumberedList>
    </Form>

    )
  }
})

export default signupForm
