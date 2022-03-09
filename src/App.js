
import React from 'react';
import CharacterList from './components/CharacterList';
import './App.scss'
import config from './apikey';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    window.apikey = config.apikey;
    window.apisecret = config.apisecret;
  }

  render() {
    return (
      <div className='Center'>
        <CharacterList />
      </div>
    );
  }
}

export default App;