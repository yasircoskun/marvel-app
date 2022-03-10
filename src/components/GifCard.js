import React from 'react';
import TabLoader from './TabLoader';

class GifCard extends React.Component {
  async componentDidMount() {
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
  }

  ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  render() {
    return (
      <div className="CharacterCard" style={{height: '84vh', margin: '0.4rem 0vw', padding: '2rem 0rem',   width: '100vw', background: "#000000"}}>
        <video autoplay="true" loop="true" src={this.props.gifUrl} alt="." style={{width: '100%'}}></video>
      </div>
    );
  }
}

export default GifCard;
