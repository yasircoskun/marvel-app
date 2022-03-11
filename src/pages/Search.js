import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import GifCard from '../components/GifCard';
import BasicCharacterCard from './../components/BasicCharacterCard';
import config from '../apikey';
import md5 from 'js-md5/src/md5';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchBtnRef = React.createRef();
    this.queryRef = React.createRef();
    //this.searchBtnRefClicked = this.searchBtnRefClicked.bind(this);
    this.state = {
      query: null,
      result: [],
      offset: 0,
      loading: false
    }
  }

  async search(){
    await this.setState({ query: this.queryRef.current.value });
    await this.getSearchResult()
  }

  async getSearchResult() {
    if(!this.state.loading){
      this.setState({loading: true})
      let ts = 1337;
      const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters', {
        params: {
          offset: this.state.offset,
          nameStartsWith: this.state.query,
          apikey: config.apikey,
          limit: 30,
          hash: md5(ts + config.apisecret + config.apikey)
        },
        headers: {
          Referer: 'http://localhost:1998/'
        }
      });
      let that = this;
      setTimeout(()=>{
        that.setState({ result: [...that.state.result, ...response.data.data.results], offset: this.state.offset += 30, loading: false });
      }, 1500);
    }
  }


  async componentDidMount() {
    var that = this;
    // Scroll Bottom Detection
    window.onscroll = async function (ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if(that.state.query != null)
        that.getSearchResult();
        //window.scrollTo(0, 0);
      }
    };
  }

  render() {
    if(this.state.query == null){
      return (
        <>
          <h1>Search Page</h1>
          <input ref={this.queryRef} type="text" placeholder='Search Term'></input>
          <button ref={this.searchBtnRef} onClick={this.search.bind(this)}>Search</button>
        </>
      )
    }else{
        console.log(this.state.result)
        return (<>
          <div className='BasicCharacterList'>
            {this.state.result.map(charater => {
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
}

export default Search;