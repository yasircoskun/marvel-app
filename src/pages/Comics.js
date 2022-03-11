import { useParams } from "react-router-dom";
import React from 'react';

import Thumbnail from "../components/Thumbnail";
import marvel from '../services/marvel'
import './../styles/pages/Comics.scss';

class ComicsComponent extends React.Component {
  state={
    comics: [],
    character: {}
  }

  async getCharacter(characterID) {
    this.setState({ loading: true })
    const response = await marvel.getCharacterById(characterID);
    this.setState({
      character: response.data.data.results[0],
    });
  }

  async getComics(characterID) {
    this.setState({ loading: true })
    const response = await marvel.getComicsByCharacterId(characterID)
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
      <h3>Comics featuring the character "{this.state.character.name}":</h3>
      <ul>
      
        {this.state.comics.map(comic => {
          return (
            <li>
              {comic.title}
            </li>
          )
        })}
      </ul>

      <button onClick={() => {window.history.back();}}>Back</button>
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
