import React, { Component } from 'react';
import { posts } from "../posts.json";

class Blog extends Component {
  render() {


    return (
      <div className="blog-overview">
        <header>
          <h1>
            Blog
          </h1>
          <p>
            Follow the Cueup blog for user stories, product announcements, feature updates, and technical posts.
          </p>
        </header>
        <main>
          <div className="post-feed">
            {
              posts.map(post => (
              <artictle className="post-preview">
                <img src={post.thumbnail_src} alt={post.thumbnail_alt} />
                <section>
                  <header>
                    <h2>{post.title}</h2>
                  </header>
                  <p className="post-card-excerpt">
                    {post.excerpt}
                  </p>
                </section>
                <footer>
                  <p className="author">
                    {post.author}
                  </p>
                </footer>
              </artictle>
              ))
            }
          </div>
        </main>
      </div>
    );
  }
}

export default Blog;