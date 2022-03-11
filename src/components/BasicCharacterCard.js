import React from 'react';
import TabLoader from './TabLoader';
import Thumbnail from './Thumbnail';

class CharacterCard extends React.Component {
  async componentDidMount() {
    document.querySelectorAll('#CharacterCard_' + this.props.characterID + ' .TabHeader li').forEach(elem => {
      elem.onclick = (e) => {
        e.target.className = 'active';
        console.log(this.props.characterID);
        document.querySelector('#CharacterCard_' + this.props.characterID + ' #' + e.target.innerText).style.display = 'flex';
        document.querySelectorAll('#CharacterCard_' + this.props.characterID + ' .TabHeader li').forEach(sibling => {
          if (sibling !== e.target) {
            sibling.className = '';
            document.querySelector('#CharacterCard_' + this.props.characterID + ' #' + sibling.innerText).style.display = 'none';
          }
        })
      }
    })
  }

  ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  render() {
    return (
      <div id={'CharacterCard_' + this.props.characterID} className="BasicCharacterCard">
        <Thumbnail data={this.props.data.thumbnail}></Thumbnail>
        <div className='BasicCardTitle'><h4>{this.props.name}</h4></div>
      </div>
    );
  }
}

export default CharacterCard;
