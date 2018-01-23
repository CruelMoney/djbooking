import React, { Component } from 'react';

class OnlyClient extends Component {
  state = {
    onClient: false
  }

  componentDidMount(){
    this.setState({
      onClient: true
    })
  }

  render() {
    const {onClient} = this.state;

    return (
      <React.Fragment>
        {
          onClient
          ? this.props.children
          : null
        }
      </React.Fragment>
    );
  }
}

export default OnlyClient;