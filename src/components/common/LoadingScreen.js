import React, {Component} from 'react'
import EmptyPage from './EmptyPage'
import Button from './Button-v2';
import Logo from './Logo';

export default ({isLoading, error, pastDelay}) => {
  // Handle the loading state
  if (isLoading) {
    return <LoadingScreen />;
  }
  // Handle the error state
  else if (error) {
    return <EmptyPage 
      title='Sorry, there was an error loading the page.'
      message={'Try refreshing the page.'}
    />;
  }
  else {
    return null;
  }
};

export class LoadingScreen extends Component{
  render(){return (
    <div className="loading-screen">
      <Logo />
      <Button
        color="#03d1ff"
        isLoading />
    </div>
  )}
}
