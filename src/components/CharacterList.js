import React from 'react';
import CharacterCard from './CharacterCard';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.setApiKey = this.setApiKey.bind(this);
  }

  setApiKey(){
    window.apikey = document.getElementById('apikeyInput').value
  }

  render() {
    console.log(this.props.charaters);
    if (this.props.charaters.length > 0) {
      return (
        <div className='CharacterList'>
          {this.props.charaters.map(charater => {
            return (
              <CharacterCard
                key={charater.id}
                name={charater.name}
                characterID={charater.id}
                image_path={charater.thumbnail.path + "/portrait_incredible." + charater.thumbnail.extension}
                data={charater}
              ></CharacterCard>
            );
          })}
        </div>
      );
    }
    return (
    <div>
      Probably we exceeded marvel api key limit
      <input id="apikeyInput" type="text" placeholder='My API Key'></input>
      <button onClick={this.setApiKey}>Use My API Key</button>
    </div>);
  }
}

export default CharacterList;