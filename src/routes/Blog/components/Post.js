import React, { Component } from 'react';
import { posts } from "../posts.json";
import Formatter from '../../../utils/Formatter';
import Sharing from '../../../components/common/Sharing-v2';
import SignUpForm from '../../Signup/components/SignUpForm';
import Disqus from 'disqus-react';
import {Environment} from '../../../constants/constants';
import NewsletterSignup from './NewsletterSignup';

class Post extends Component {
  render() {
    const { match } = this.props;
    const { params, url } = match;
    const { postTitle } = params;

    const post = posts.find(p => p.slug === postTitle);
    const publishedDate = new Date(post.published_date);

    const disqusShortname = 'cueup';
    const disqusConfig = {
        url: String(Environment.CALLBACK_DOMAIN) + String(url),
        identifier: post.id,
        title: post.title,
    };

    return (
      <article className="blog-post">
        <header className="title">
          <p>
            {Formatter.date.ToLocalString(publishedDate)}
          </p>
          <h1>
            { post.title }
          </h1>
        
        </header>
        <main>
          <div className="img-wrapper">
            <img src={post.thumbnail_url} alt={post.thumbnail_alt}/>
          </div>
          <div className="container">
            <div className="post-content" dangerouslySetInnerHTML={{__html:post.content}} />
            <Sharing 
              shareUrl={ url }
              title={ post.title }
            />
            <div className="signup">
              <SignUpForm>
                <h3>Bliv DJ hos Cueup</h3>
                <p>
                Opret en gratis bruger og begynd at blive tilbudt spillejobs.
                Log ind med soundcloud, facebook eller din email. Ved tilmelding accepterer du automatisk vores vilkår og betingelser.
                </p>
              </SignUpForm>
            </div>
            <hr/>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>

        </main>
        <footer className="newsletter-signup">
          <div className="card">
           <NewsletterSignup />
          </div>
        </footer>
      </article>
    );
  }
}

export default Post;