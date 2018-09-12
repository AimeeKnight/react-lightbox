import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import './lightboxContainer.css';
import Lightbox from '../lightbox/Lightbox'; // eslint-disable-line no-unused-vars

class LightboxContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      isOpen: false,
      post: {}
    };
    this.toggleLightbox = this.toggleLightbox.bind(this);
  }

  componentDidMount() {
    this.fetchPost('1');
  }

  async fetchPost(id) {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    try {
      const response = await fetch(url);
      const post = await response.json();
      this.setState({
        isLoaded: true,
        post
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  toggleLightbox() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { error, isLoaded, post } = this.state;
    if (error) {
      return (
        <p
          className="lightbox-container error">Error: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      return (
        <p className="lightbox-container">Loading...</p>
      );
    } else {
      return (
        <div
          className="lightbox-container">
          <Lightbox
            onClose={this.toggleLightbox}
            show={this.state.isOpen}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </Lightbox>
          <button
            onClick={this.toggleLightbox}
            className="open-button"
          >
            Show Post &#10095;
          </button>
        </div>
      );
    }
  }
}

export default LightboxContainer;
