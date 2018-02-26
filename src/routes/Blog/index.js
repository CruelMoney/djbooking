import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import { Helmet } from 'react-helmet';
import Footer from '../../components/common/Footer'
import Blog from './components/Blog';
import Post from './components/Post';
import './index.css';

export default class Index extends Component{
  themeColor = "#25F4D2"
  secondColor = "#31DAFF"
  
  render(){
    const {match} = this.props
   
    const title = "Blog | Cueup"
    return(
    <div className="blog">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
        <meta property="og:site_name" content="Cueup Blog" />
      </Helmet>
      <Switch>
        <Route 
        exact path={match.path} 
        component={Blog} 
        />
        <Route path={`${match.path}/:postTitle`} component={Post} />
      </Switch>
      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or apply to become a DJ."
        />
    </div>
  )}
}
