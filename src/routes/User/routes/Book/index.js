import React, {Component} from 'react';
import  Book  from "./components/Book";
import Helmet from 'react-helmet-async'

export default class Index extends Component{
  render(){
    const djName = this.props.profile.firstName;
    const title = djName + " | Book"

    return(
      <div>
        <Helmet>
          <title>{title}</title>
          <meta property="og:title"           content={title} />
          <meta name="twitter:title"      content={title} />
        </Helmet>
        <Book {...this.props} />
      </div>

  )}
}