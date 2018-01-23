import React, {Component} from 'react';
import HowItWorks from './components/HowItWorks'; 
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    const title = "How it works | Cueup"
    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <HowItWorks />
    </div>
  )}
}
