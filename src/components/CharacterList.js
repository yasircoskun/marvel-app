import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CharacterCard from './CharacterCard';
import marvel from '../services/marvel'
import { selectCharacterList, concat} from '../redux/reducers/characterListReducer';

const CharacterList = (props) => {
  var characterList = useSelector(selectCharacterList);
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component Did Mount
    setOffset(Number(window.localStorage.getItem('offset')) || 0);
    return () => {
      // Component Will Unmount
      window.onscroll = null;
    }
  }, [])

  useEffect(() => {
    async function getCharacters() {
      if (!loading) {
        setLoading(true);
        marvel.getCharacters(offset).then(response => {
          dispatch(concat(response.data.data.results))
          window.localStorage.setItem('offset', JSON.stringify(offset + 30));
          setOffset((Number(offset) + Number(30)))
          setLoading(false)
        });
      }
    }

    if(characterList.length === 0){
      getCharacters()
    }

    window.onscroll = () => {
      if (!loading) {
        if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight) {
          getCharacters();
        }
      }
    }
  }, [loading, offset, characterList, dispatch])

  if(typeof characterList.map !== "function" ) return (<></>)
  return (
    <>
      <div className='CharacterList'>
        {characterList.map(charater => {
          return (
            <CharacterCard
              key={charater.id + "_mainList_" + Number(new Date())}
              name={charater.name}
              characterID={charater.id}
              data={charater}
            ></CharacterCard>
          );
        })}
      </div>
      {loading && <h1 className='Loading'>Loading..<br /><img src='/red_search.gif' alt='' /></h1>}
    </>
  );
}

export default CharacterList;