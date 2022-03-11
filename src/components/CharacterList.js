import React from 'react';
import CharacterCard from './CharacterCard';
import BasicCharacterCard from './BasicCharacterCard';
import axios from 'axios';
import config from '../apikey';
import { Link } from 'react-router-dom';
import md5 from 'js-md5/src/md5';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { charaters: [], offset: 0, loading: false };
  }

  async getCharacters() {
    if(!this.state.loading){
      this.setState({loading: true})
      let ts = 1337;
      const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters', {
        params: {
          offset: this.state.offset,
          limit: 30,
          apikey: config.apikey,
          hash: md5(ts + config.apisecret + config.apikey)
        },
        headers: {
          Referer: 'http://localhost:1998/'
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
      }, 1500000000);
    }

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
        <div className='BasicCharacterList'>
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
        {this.state.loading && <h1 className='Loading'>Loading..<br /><img src='/red_search.gif' alt=''/></h1>}
      </>);
  }
}

export default CharacterList;