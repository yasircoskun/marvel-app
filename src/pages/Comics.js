import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import Thumbnail from "../components/Thumbnail";
import marvel from '../services/marvel'
import './../styles/pages/Comics.scss';

const Comics = (props) => {
  const { characterID } = useParams()
  const [character, setCharacter] = useState({})
  const [comics, setComics] = useState([])

  useEffect(()=>{
    async function getCharacter(characterID) {
      const response = await marvel.getCharacterById(characterID);
      setCharacter(response.data.data.results[0]);
    }
    async function getComics(characterID) {
      const response = await marvel.getComicsByCharacterId(characterID)
      setComics(response.data.data.results);
    }
    getCharacter(characterID)
    getComics(characterID)
  }, [characterID])

  if(character === {} || typeof character === "undefined" || typeof character.thumbnail === "undefined" || typeof comics === "undefined" || typeof comics.map !== "function") return (<></>)
  return (
    <div className="Comics">
      <Thumbnail imageURL={character.thumbnail.path + "/portrait_incredible." + character.thumbnail.extension}></Thumbnail>
      <h1>{character.name}</h1>
      <p>{character.description}</p>
      <h3>Comics featuring the character "{character.name}":</h3>
      <ul>
        {comics.map(comic => {
          return (
            <li key={comic.id}>
              {comic.title}
            </li>
          )
        })}
      </ul>
      <button onClick={() => {window.history.back();}}>Back</button>
    </div>
  )
}

export default Comics;
