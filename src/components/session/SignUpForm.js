import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import c from '../../constants/constants'
import TextFieldM from 'material-ui/TextField'
import {datePipe} from '../../utils/textPipes'
import { reduxForm } from 'redux-form'
export const fields = [ 'signup',
                        'name',
                        'password',
                        'email',
                        'birthday',
                        'genres',
                        'bankInfo',
                        'acoountNumber',
                        'bankNumber',
                        'location' ]


import Form, {Text,
              Button,
              Textfield,
              RegistrationElement,
              SubmitButton,
              LocationSelector,
              ToggleButton,
              ToggleButtonHandler,
              LocationSelectorSimple,
              EmailPassword,
              ToggleOptions} from '../../containers/Form'

const theme = getMuiTheme()



var signupForm = React.createClass({

  render() {
    const {
          fields: {
            signup,
            name,
            password,
            email,
            birthday,
            genres,
            bankInfo,
            acoountNumber,
            bankNumber,
            location
           },
          handleSubmit,
          resetForm,
          submitting
        } = this.props
  return (
    <Form
      onSubmit={handleSubmit}
      reset={resetForm}
      submitting={submitting}
    >
      <RegistrationElement
        isFilter={true}
        name='signup'
        label ="Sign Up"
        active ={true}
        text = "Do you want to sign up using soundcloud, facebook or your email"
      >

        <ToggleOptions
          name = "signup"
          {...signup}
        >
          <Button
            large={true}
            leftAlign={true}
            name = "FACEBOOK"
            rounded= {true}
            label =  "Facebook"
          />

          <Button
            large={true}
            leftAlign={true}
            name = "SOUNDCLOUD"
            rounded= {true}
            label =  "Soundcloud"
          />

          <Button
            large={true}
            leftAlign={true}
            name = "EMAIL"
            rounded= {true}
            label =  "Email & Password"
          />

        </ToggleOptions>

      </RegistrationElement>

      <RegistrationElement
        name="email"
        label ="E-mail"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        hideOn = {['FACEBOOK']}
      >
        <Textfield
          {...email}
          name="email"
          validate={['required', 'email']}
          label="Your Email"/>

      </RegistrationElement>
      <RegistrationElement
        name="password"
        label ="Password"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        hideOn = {['FACEBOOK','SOUNDCLOUD']}
      >
        <Textfield
          {...password}
          type ="password"
          name="password"
          validate={['required']}
          label="Your password"/>
      </RegistrationElement>


      <RegistrationElement
        name="name"
        label ="Name"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        hideOn = {['FACEBOOK']}
      >
        <Textfield
          {...name}
          name="name"
          placeholder="First Last"
          validate={['required']}
          label="Your name"/>
      </RegistrationElement>


      <RegistrationElement
        name="bday"
        label ="Birthday"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        hideOn = {['FACEBOOK']}

      >

        <Textfield
          {...birthday}
          onUpdatePipeFunc = {datePipe}
          maxLength="10"
          type = "text"
          name="birthday"
          validate={['required', 'date']}
          placeholder="dd/mm/yyyy"
          label="Birthday"/>

      </RegistrationElement>

      <RegistrationElement
        name="location"
        label ="Location"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
      >

        <LocationSelectorSimple
          {...location}
          autocomplete="off"
          name="location"
          validate={['required']}
          label="Location"/>

      </RegistrationElement>


      <RegistrationElement
        name="genres"
        label ="Genres"
        active ={true}
        text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
      >

        <ToggleButtonHandler
          {...genres}
          name="genres"
          genres={c.GENRES}
          columns = {4} />

      </RegistrationElement>

      <RegistrationElement
        isFilter ={true}
        name="bankInfo"
        label ="Account information"
        active ={true}
        text = "Do you want to enter your bank acount now or wait until you get your first gig? "
      >

        <ToggleOptions
          {...bankInfo}
          name = "bankInfoButtons"
        >
          <Button
         name = "BANK_TRUE"
         rounded= {true}
         label =  "Now"
       />

       <Button
         name = "BANK_FALSE"
         rounded= {true}
         label =  "Wait"
         />

       </ToggleOptions>

     </RegistrationElement>

    </Form>

    )
  }
})

export default reduxForm({
  form: 'signupForm',
  fields
})(signupForm)
