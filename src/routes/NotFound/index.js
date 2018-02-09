import React, {Component} from 'react'
import EmptyPage from '../../components/common/EmptyPage';
import Footer from '../../components/common/Footer';

export default class NotFound extends Component{
  componentDidMount(){
    document.body.classList.add('not-found')
  }

  componentWillUnmount(){
    document.body.classList.remove('not-found')
  }

  render(){return (
    <div className="not-found-screen">
        <EmptyPage 
          title={`404 Not Found`}
          message={
            <span>Sorry, the page you visited could not be found.<br/>
           Try to spin up another page.</span>
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
  )}
}