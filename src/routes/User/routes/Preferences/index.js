import React, {Component} from 'react';
import  Preferences  from "./components/Preferences";
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    const djName = this.props.match.params.permalink;
    const title = djName + " | Preferences"

    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Preferences {...this.props} />
    </div>
  )}
}