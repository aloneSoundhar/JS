import React, { Component } from 'react';
import { createMeme } from '../actions';
import { connect } from 'react-redux';

class MemeItem extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false
    };
  }

  postMemeItem() {
    const { text0, text1 } = this.props;
    const memObj = {
      template_id: this.props.meme.id,
      text0,
      text1 
    }
    this.props.createMeme(memObj);
  }

  render() {
    return (
      <div 
        className="meme-item"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onClick={() => this.postMemeItem()}  
      >
        <img 
          src={this.props.meme.url}
          alt={this.props.meme.name} 
          className={this.state.hovered ? "meme-img darken-img" : "meme-img"}
        />
        <p className={ this.state.hovered ? "meme-txt" : "no-txt" }>{this.props.meme.name}</p>
      </div>
    )
  }
}


export default connect(null, { createMeme })(MemeItem);
