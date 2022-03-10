import React from 'react';
import CharacterCard from './CharacterCard';
import axios from 'axios';
import GifCard from './GifCard';


class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.setApiKey = this.setApiKey.bind(this);
    this.state = { reRender: 0, charaters: [], offset: 0};
  }

  setApiKey(){
    window.apikey = document.getElementById('apikeyInput').value
    window.apisecret = document.getElementById('apisecretInput').value
    this.setState({reRender: this.state.reRender + 1});
    this.getCharacters()
  }

  async getCharacters() {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search?sort=recent&q=marvel&api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&pingback_id=17f717d860f3f3f0', {
      params: {
        offset: this.state.offset,
        // limit: 30,
        // apikey: window.apikey
      }
    });

    this.setState({ charaters: response.data.data, offset: this.state.offset += 25 });
    console.log(this.state.charaters)
  }


  async componentDidMount() {
    this.getCharacters()
    var that = this;
    // Scroll Bottom Detection
    window.onscroll = async function (ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        that.getCharacters();
        window.scrollTo(0, 0);
      }
    };
  }

  render() {
    console.log(this.state.charaters);
    if (this.state.charaters.length > 0) {
      return (
        <div renderNum={this.state.reRender} className='CharacterList'>
          {this.state.charaters.map(charater => {

            return (
              <GifCard gifUrl={charater.images.original.mp4}></GifCard>
              // <CharacterCard
              //   key={charater.id}
              //   name={charater.name}
              //   characterID={charater.id}
              //   image_path={charater.thumbnail.path + "/portrait_incredible." + charater.thumbnail.extension}
              //   data={charater}
              // ></CharacterCard>
            );
          })}
        </div>
      );
    }
    return (
    <div>
      Probably we exceeded marvel api key limit.
      <br></br>
      <a href="https://developer.marvel.com">Create a API Key</a>
      <br></br>
      <input id="apikeyInput" type="text" placeholder='My API Key'></input>
      <br></br>
      <input id="apisecretInput" type="text" placeholder='My API Secret Key'></input>
      <br></br>
      <button onClick={this.setApiKey.bind(this)}>Use My API Key</button>
    </div>);
  }
}

export default CharacterList;