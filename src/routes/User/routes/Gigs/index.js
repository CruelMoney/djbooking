import React, {Component} from 'react';
import  Gigs  from "./components/Gigs";
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    const djName = this.props.match.params.permalink;
    const title = djName + " | Gigs"

    return(
      <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Gigs {...this.props} />
    </React.Fragment>
  )}
}