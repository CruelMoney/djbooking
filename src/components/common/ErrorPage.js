import React, {Component} from 'react'
import EmptyPage from './EmptyPage'
import Footer from './Footer';

export default class ErrorPage extends Component{
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render(){
    if (this.state.hasError) {
    return <div className="not-found-screen">
        <EmptyPage 
          title={`Something went wrong`}
          message={
            <div>Sorry, something went wrong.<br/>
              Try reloading the page or go back.<br/>
              <a style={{marginTop: '20px'}} className="button" href="/">GO BACK</a> 
            </div>
          }
        />
        <Footer
          color={"#31DAFF"}
          noSkew={true}
          firstTo="/"
          secondTo="/signup"
          firstLabel="Arrange event"
          secondLabel="Become DJ"
          title="Ready to get started?"
          subTitle="Arrange an event, or apply to become a DJ."
        />
    </div>
    }else{
      return this.props.children
    }
  }
}