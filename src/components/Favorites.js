import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavs } from './../redux/reducers/favsReducer';
import CharacterCard from './CharacterCard';
import './../styles/components/Favorites.scss'

const Favorites = (props) => {
  var favs = useSelector(selectFavs);

  if(Object.keys(favs).length !== 0){
    return (<div className='Favorites'>
      <h1 style={{textAlign: 'center'}}><Link to="/favorites">Your Favorites</Link></h1>
        <div className='CharacterList' style={{padding: 0, overflowY: 'auto', height: 'calc(100% - 24rem)'}}>
          {Object.keys(favs).reverse().map(key => 
            <CharacterCard
              key={favs[key].characterID + "_favorites_" + Number(new Date())}
              name={favs[key].name}
              characterID={favs[key].characterID}
              data={favs[key].data}
            ></CharacterCard>
          )}
        </div>
    </div>)
  }else{
    return (<>
    <h1 style={{textAlign: 'center'}}><Link to="/favorites">Your Favorites</Link></h1>
    <div style={{textAlign: 'center'}}>Your Favorite List is Empty</div>
    </>)
  }

  
}

export default Favorites