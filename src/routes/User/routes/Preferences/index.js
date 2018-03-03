import React, {Component} from 'react';
import  Preferences  from "./components/Preferences";
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    const djName = this.props.profile.firstName;
    const title = djName + " | Preferences"

    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Preferences {...this.props} />
    </div>
  )}
}