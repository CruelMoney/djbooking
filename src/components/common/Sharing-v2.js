import React, { Component } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon
} from 'react-share';
import {Environment} from '../../constants/constants';

class Sharing extends Component {
  render() {
    let { shareUrl, title } = this.props;
    shareUrl = String(Environment.CALLBACK_DOMAIN) + String(shareUrl);

    return (
      <div className="share-buttons">

        <FacebookShareButton
          url={shareUrl}
          className="share-button"
          quote={title}
          >
          <FacebookIcon
            size={32}
            round />
            <span class="st-label">Share</span>
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          className="share-button"
          title={title}
          >
          <TwitterIcon
            size={32}
            round />
            <span class="st-label">Tweet</span>
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          className="share-button"
          title={title}
          windowWidth={750}
          windowHeight={600}
          >
          <LinkedinIcon
            size={32}
            round />
            <span class="st-label">Share</span>
        </LinkedinShareButton>
        <EmailShareButton
            url={shareUrl}
            className="share-button"
            subject={title}
            body={shareUrl}
            >
            <EmailIcon
              size={32}
              round />
              <span class="st-label">Email</span>
          </EmailShareButton>
      </div>
    );
  }
}

export default Sharing;