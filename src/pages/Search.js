import React, { useEffect, useState } from 'react';
import marvel from '../services/marvel';
import CharacterCard from './../components/CharacterCard';

const Search = (props) => {
  const searchBtnRef = React.createRef();
  const queryRef = React.createRef();
  const [query, setQuery] = useState(null);
  // const [result, setResult] = useState([]);
  // const [offset, setOffset] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [state, setState] = useState({
    loading: false,
    offset: 0,
    result: []
  })

  async function search(){
    setQuery(queryRef.current.value)
  }

  useEffect(()=>{
    async function getSearchResult() {
      if(!state.loading){
        setState({
          loading: true,
          offset: state.offset,
          result: state.result
        })
        const response = await marvel.getCharacterByNameStartWith(query, state.offset)
        setState({
          loading: false,
          offset: state.offset + 30,
          result: [...state.result, ...response.data.data.results]
        })
        
        if(response.data.data.results.length === 0){
          setEndOfPage(true);
          window.onscroll = null;
        }
      }
    }

    window.onscroll = () => {
      if (!state.loading) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {      
          getSearchResult();
        }
      }
    }

    if(query != null && state.result.length === 0 && !endOfPage){
      getSearchResult()
    }
  },[query, state, endOfPage])


  if(query == null){
    return (<>
      <h1>Search Page</h1>
      <input ref={queryRef} type="text" placeholder='Search Term'></input>
      <button ref={searchBtnRef} onClick={()=>{search()}}>Search</button>
    </>)
  }else{
    return (<>
      {(query != null) &&
        <div className='CharacterList'>
          {state.result.map(charater => {
            return (
              <CharacterCard key={charater.id + "_search_" + Number(new Date())}
                name={charater.name}
                characterID={charater.id}
                data={charater}
              ></CharacterCard>
            );
          })}
        </div>
      }
      {state.loading && <h1 className='Loading'>Loading..<br /><img src='/red_search.gif' alt=''/></h1>}
      {endOfPage && <>
        <h1>End of The Universe</h1>
        <button onClick={()=>{window.location.reload()}}>New Search</button>
      </>}
    </>);
  }
}

export default Search;