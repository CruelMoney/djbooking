import React, {Component} from 'react';
import  Events  from "./components/Events";
import { Helmet } from 'react-helmet';

export default class Index extends Component{


  render(){
    const djName = this.props.profile.firstName;
    const title = djName + " | Events"

    return(
      <div>
        <Helmet>
          <title>{title}</title>
          <meta property="og:title"           content={title} />
          <meta name="twitter:title"      content={title} />
        </Helmet>
        <Events {...this.props} />
      </div>

  )}
}