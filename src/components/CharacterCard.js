import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, del, selectFavs } from '../redux/reducers/favsReducer';
import Thumbnail from './Thumbnail';
import { Link } from 'react-router-dom';

const CharacterCard = (props) => {
  var favs = useSelector(selectFavs);
  const dispatch = useDispatch()
  // faved as default is if favs has a property
  const [faved, setFaved] = useState(favs.hasOwnProperty(props.name));

  /* Warning: CharacterCard: `key` is not a prop. Trying to access it will 
  result in `undefined` being returned. If you need to access the same value 
  within the child component, you should pass it as a different prop. 
  (https://reactjs.org/link/special-props) */
  // props variable without key handler functions etc.
  const clean_props = {
    name: props.name, 
    characterID: props.characterID,
    data: props.data
  }

  //console.log(props)
  return (
    <div id={props.characterID} className="CharacterCard">
      <Link key={props.characterID + "_Link_"} to={"/comics/" + props.characterID}>
        <Thumbnail imageURL={props.data.thumbnail.path + "/portrait_incredible." + props.data.thumbnail.extension}></Thumbnail>
        <div className='CardTitle'><h4>{props.name}</h4></div>
      </Link>
      <div className='HearthIcon' onClick={() => {
        dispatch(faved ? del(clean_props) : add(clean_props))
        setFaved(!faved)
      }}>
        <span className={faved ? "faved" : ""}>{faved ? "❤️" : "🤍"}</span>
      </div>
    </div>
  );
}

export default CharacterCard;
