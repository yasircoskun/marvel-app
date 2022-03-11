import React from 'react';
import CharacterCard from './CharacterCard';
import BasicCharacterCard from './BasicCharacterCard';
import axios from 'axios';
import config from '../apikey';
import { Link } from 'react-router-dom';


class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reRender: 0, charaters: [], offset: 0, loading: false };
  }

  async getCharacters() {
    this.setState({loading: true})
    const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters', {
      params: {
        offset: this.state.offset,
        limit: 30,
        apikey: config.apikey
      }
    });

    let that = this;
    setTimeout(()=>{
      that.setState({
        charaters: [...this.state.charaters, ...response.data.data.results],
        offset: this.state.offset += 30,
        loading: false
      });
      console.log(this.state.charaters)
    }, 1500);
  }


  async componentDidMount() {
    this.getCharacters()
    let that = this;
    // Scroll Bottom Detection
    window.onscroll = async function (ev) {
      if (!that.state.loading) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          that.getCharacters();
          //window.scrollTo(0, 0);
        }
      }
    };
  }

  render() {
      return (<>
        <div renderNum={this.state.reRender} className='BasicCharacterList'>
          {this.state.charaters.map(charater => {
            return (
              <Link to={"/comics/"+charater.id}>
                <BasicCharacterCard
                  key={charater.id}
                  name={charater.name}
                  characterID={charater.id}
                  data={charater}
                ></BasicCharacterCard>
              </Link>
            );
          })}
        </div>
        {this.state.loading && <h1 className='Loading'>Loading..<br /><img src='/search.gif' alt=''/></h1>}
      </>);
    // } return (
    //   <div>
    //     Probably we exceeded marvel api key limit.
    //     <br></br>
    //     <a href="https://developer.marvel.com">Create a API Key</a>
    //     <br></br>
    //     <input id="apikeyInput" type="text" placeholder='My API Key'></input>
    //     <br></br>
    //     <input id="apisecretInput" type="text" placeholder='My API Secret Key'></input>
    //     <br></br>
    //     <button onClick={this.setApiKey.bind(this)}>Use My API Key</button>
    //   </div>);
  }
}

export default CharacterList;