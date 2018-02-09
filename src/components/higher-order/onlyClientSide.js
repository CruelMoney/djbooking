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
      <div>
        {
          onClient
          ? this.props.children
          : null
        }
      </div>
    );
  }
}

export default OnlyClient;