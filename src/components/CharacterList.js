import React from 'react';
import BasicCharacterCard from './BasicCharacterCard';
import { Link } from 'react-router-dom';
import marvel from '../services/marvel'

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { charaters: [], offset: 0, loading: false };
  }

  async getCharacters() {
    if (!this.state.loading) {
      this.setState({ loading: true })
      const response = await marvel.getCharacters(this.state.offset);

      let that = this;
      setTimeout(() => {
        that.setState({
          charaters: [...this.state.charaters, ...response.data.data.results],
          offset: this.state.offset += 30,
          loading: false
        });
        console.log(this.state.charaters)
      }, 1500);
    }
  }

  async componentWillUnmount(){
    window.onscroll = null;
  }

  async componentDidMount() {
    this.getCharacters()
    let that = this;
    // Scroll Bottom Detection
    window.onscroll = async function (ev) {
      if (!that.state.loading) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          that.getCharacters();
          //window.scrollTo(0, 0);
        }
      }
    };
  }

  render() {
    return (<>
      <div className='BasicCharacterList'>
        {this.state.charaters.map(charater => {
          return (
            <Link to={"/comics/" + charater.id}>
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
      {this.state.loading && <h1 className='Loading'>Loading..<br /><img src='/red_search.gif' alt='' /></h1>}
    </>);
  }
}

export default CharacterList;