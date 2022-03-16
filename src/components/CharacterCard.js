import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, del, selectFavs } from '../redux/reducers/favsReducer';
import Thumbnail from './Thumbnail';
import { Link } from 'react-router-dom';

const CharacterCard = (props) => {
  var favs = useSelector(selectFavs);
  const dispatch = useDispatch()
  // faved as default is if favs has a property
  const [faved, setFaved] = useState(favs.hasOwnProperty(props.name));
  const delProp = props
  const addProp = props

  useEffect(() => {
    if (Object.keys(favs).indexOf(props.name) >= 0) {
      setFaved(true);
    }
  }, [favs, props, faved]);

  return (
    <div key={props.characterID + "_CharacterCard"} className="CharacterCard">
      <Link key={props.characterID + "_Link_" + Number(new Date())} to={"/comics/" + props.characterID}>
        <Thumbnail imageURL={props.data.thumbnail.path + "/portrait_incredible." + props.data.thumbnail.extension}></Thumbnail>
        <div className='CardTitle'><h4>{props.name}</h4></div>
      </Link>
      <div className='HearthIcon' onClick={() => {
          if(faved){
            dispatch(del(delProp));
            setFaved(false)
          }else{
            dispatch(add(addProp)); 
            setFaved(true)
          }
        }}>
        <span className={faved ? "faved" : ""}>{faved ? "❤️" : "🤍"}</span>
      </div>
    </div>
  );
}

export default CharacterCard;
