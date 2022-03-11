import { useParams } from "react-router-dom";
import React from 'react';
import config from "../apikey";
import axios from "axios";
import md5 from 'js-md5/src/md5';
import Thumbnail from "../components/Thumbnail";

class ComicsComponent extends React.Component {
  state={
    comics: [],
    character: {}
  }

  async getCharacter(characterID) {
    this.setState({ loading: true })
    let ts = 1337;
    const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters/' + characterID, {
      params: {
        apikey: config.apikey,
        hash: md5(ts + config.apisecret + config.apikey)
      },
      headers: {
        Referer: 'http://localhost:1998/'
      }
    });
    this.setState({
      character: response.data.data.results[0],
    });
  }

  async getComics(characterID) {
    this.setState({ loading: true })
    let ts = 1337;
    const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters/' + characterID + '/comics', {
      params: {
        offset: this.state.offset,
        limit: 10,
        orderBy: 'focDate',
        apikey: config.apikey,
        hash: md5(ts + config.apisecret + config.apikey)
      },
      headers: {
        Referer: 'http://localhost:1998/'
      } 
    });
    this.setState({
      comics: [...response.data.data.results],
    });
  }

  async componentDidMount() {
    this.getComics(this.props.params.charaterID)
    this.getCharacter(this.props.params.charaterID)
    
  }

  render() {
    return (<div className="Comics">
      <Thumbnail data={this.state.character.thumbnail}></Thumbnail>
    <h1>{this.state.character.name}</h1>
    <p>{this.state.character.description}</p>
    
    {this.state.comics.map(comic => {
      return (
        <li>
          {comic.title}
        </li>
      )
    })}
    </div>)
  }
}

const Comics = (props) => (
  <ComicsComponent
      {...props}
      params={useParams()}
  />
);

export default Comics;
