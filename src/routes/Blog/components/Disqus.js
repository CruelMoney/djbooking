import React, { Component } from 'react';
import Disqus from 'disqus-react';

class DisqusWrapped extends Component {
  render() {
    const {shortname, config} = this.props;
    return (
      <Disqus.DiscussionEmbed shortname={shortname} config={config} />
    );
  }
}

export default DisqusWrapped;