
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Search from './pages/Search';
import Share from './pages/Share';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="share" element={<Share />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;