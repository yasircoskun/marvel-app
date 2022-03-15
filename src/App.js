
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Search from './pages/Search';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Comics from './pages/Comics';
import './styles/main.scss'

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
            <Route path="comics/:characterID" element={<Comics />} />
            <Route path="search" element={<Search />} />
            <Route path="about" element={<About />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;