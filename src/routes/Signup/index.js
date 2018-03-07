import React, {Component} from 'react';
import Signup from './components/Signup'; 
import Helmet from 'react-helmet-async';
import {localize} from 'react-localize-redux';

class Index extends Component{
  render(){
    const {translate} = this.props;
    const title = translate("apply-to-become-dj") + " | Cueup"
    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Signup />
    </div>
  )}
}

export default localize(Index, 'locale');