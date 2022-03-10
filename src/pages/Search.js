import axios from 'axios';
import React from 'react';
import GifCard from '../components/GifCard';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchBtnRef = React.createRef();
    this.queryRef = React.createRef();
    //this.searchBtnRefClicked = this.searchBtnRefClicked.bind(this);
    this.state = {
      query: null,
      gifs: null,
      offset: 0
    }
  }



  async search(){

    await this.setState({ query: this.queryRef.current.value });

    await this.getGifs()

  }

  async getGifs() {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search?sort=recent&q='+this.state.query+'&api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&pingback_id=17f717d860f3f3f0', {
      params: {
        offset: this.state.offset,
        // limit: 30,
        // apikey: window.apikey
      }
    });

    this.setState({ gifs: response.data.data, offset: this.state.offset += 25 });
  }


  async componentDidMount() {
    var that = this;
    // Scroll Bottom Detection
    window.onscroll = async function (ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        that.getGifs();
        window.scrollTo(0, 0);
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
      if(this.state.gifs != null){
        return (
          <div className='CharacterList'>
            {this.state.gifs.map(gif => {
              return (
                <GifCard gifUrl={gif.images.original.mp4}></GifCard>
              );
            })}
          </div>
        );
      }else{
        return (<h1>Loading...</h1>)
      }

    }

  }
}

export default Search;