import React, {Component} from 'react';
import Signup from './components/Signup'; 
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    const title = "Apply to become DJ | Cueup"
    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Signup />
    </div>
  )}
}
