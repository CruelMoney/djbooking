import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
              ToggleOptions} from '../../containers/Form';

const theme = getMuiTheme();

const GENRES = [
  {name: 'R&B'},
  {name: 'Latin'},
  {name: 'Hip Hop'},
  {name: 'Pop'},
  {name: 'Techno'},
  {name: 'Lounge'},
  {name: 'House'},
  {name: 'Mix'},
  {name: 'Extreme'}
];


export default React.createClass({

  render() {


  return (
    <Form>
      <RegistrationElement
        isFilter={true}
        name='signup'
        label ="Sign Up"
        active ={true}
        text = "Do you want to sign up using soundcloud, facebook or your email"
      >

      <ToggleOptions
        name = "signupButtons"
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
          onUpdatePipeFunc = {function(lastValue, value)
            {
            switch (value.length) {
            case 2:
              //The case that we deleted something, return
              if (lastValue.length === 3) {
                return value.substring(0, value.length-1);
              }

              return (value + "/")
              break;
            case 5:
              //The case that we deleted something
              if (lastValue.length === 6) {
                return value.substring(0, value.length-1);
              }

              return (value + "/")
              break;

            default:
              //If trying to type anything else than numbers
              if (isNaN(value.substring(value.length -1)) && (value.substring(value.length -1) !== "/") ) {
                return lastValue
              }
              return value}

          }}
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
         name="genres"
         genres={GENRES}
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

    );
  }
});
