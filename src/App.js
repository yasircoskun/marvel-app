
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Search from './pages/Search';
import Share from './pages/Share';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Comics from './pages/Comics';
import './styles/main.scss'
import config from './apikey';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="comics/:charaterID" element={<Comics />} />
            <Route path="search" element={<Search />} />
            <Route path="share" element={<Share />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;