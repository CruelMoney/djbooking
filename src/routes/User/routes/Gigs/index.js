import React, {Component} from 'react';
import  Gigs  from "./components/Gigs";
import Helmet from 'react-helmet-async'

export default class Index extends Component{
  render(){
    const djName = this.props.profile.firstName;
    const title = djName + " | Gigs"

    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Gigs {...this.props} />
    </div>
  )}
}