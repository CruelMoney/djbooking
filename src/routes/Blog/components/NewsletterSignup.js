import React, { Component } from 'react';
import Textfield from '../../../components/common/Textfield';
import Button from '../../../components/common/Button-v2';

class NewsletterSignup extends Component {
  state = {
    loading: false
  }
  
  submit = (form) => {
    this.setState({
      loading: true
    });
    var FD = !form ? new FormData(this.form) : new FormData(form);

    fetch('https://cudeup.createsend.com/t/d/s/firdyj/', {
      method: 'POST',
      body: FD,
      headers: {
        'content-type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then(response => {
      this.setState({
        loading: false,
        succes:true
      });
    })
    .catch(error => {
      console.error('Error:', error)
      this.setState({
        loading: false,
        succes:false
      });
    })

  }

  render() {
    const {loading, succes} = this.state;

    return (
      <div className="newsletter-signup">
        <h3>
          Abonner på Cueup blog
        </h3>
        <p>
          Få de nyeste indlæg leveret direkte til din indboks.
        </p>
       <form 
       id="subForm" class="js-cm-form" 
       method="post" 
       data-id=""
       ref={r=>{
        if(!!r){
          this.form = r;
        } 
       }}
       >
              <Textfield
                id="fieldEmail" 
                name="cm-firdyj-firdyj"
                type="email"
                validate={['required', 'email']}
                placeholder="Email"
              />
              <div className="button-wrapper">
                <Button 
                active
                glow
                isLoading={loading}
                succes={succes}
                color="rgb(37, 244, 210)"
                onClick={()=>this.submit(false)}
                type="submit">
                Abonner
                </Button> 
              </div>
      </form>
          
      </div>
    );
  }
}

export default NewsletterSignup;