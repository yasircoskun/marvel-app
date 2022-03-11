import { useParams } from "react-router-dom";
import React from 'react';
import config from "../apikey";
import axios from "axios";

class ComicsComponent extends React.Component {
  state={
    comics: []
  }
  async getComics(characterID) {
    this.setState({ loading: true })
    const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters/' + characterID + '/comics', {
      params: {
        offset: this.state.offset,
        limit: 10,
        orderBy: 'focDate',
        apikey: config.apikey
      }
    });
    this.setState({
      comics: [...response.data.data.results],
    });
  }

  async componentDidMount() {
    this.getComics(this.props.params.charaterID)
  }

  render() {
    return (<div className="Comics">
    <h1>{this.props.params.charaterID}</h1>
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
