import React, {Component} from 'react';
import LoadingPlaceholder from '../../../components/common/LoadingPlaceholder'

class LoadingForm extends Component {
  render() {
    return (
      <div className="request-form">
        <div className="request-columns">
          <div className="row center">
          <div className="col-md-6">
              <div className="card">
                <LoadingPlaceholder />
                <LoadingPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


export default ({isLoading, error, pastDelay}) => {
  // Handle the loading state
  if (isLoading) {
    return <LoadingForm />;
  }
  else {
    return null;
  }
};