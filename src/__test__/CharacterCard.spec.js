/* Dependencies  */
import React from 'react'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from "react-router-dom";
import { add, del } from '../redux/reducers/favsReducer';
import store from '../redux/store';

/* Components */
import CharacterCard from '../components/CharacterCard'

const CharacterData = {
  "name": "Apocalypse",
  "characterID": 1009156,
  "data": {
    "id": 1009156,
    "name": "Apocalypse",
    "description": "",
    "modified": "2014-05-28T12:41:41-0400",
    "thumbnail": {
      "path": "http://i.annihil.us/u/prod/marvel/i/mg/f/e0/526166076a1d0",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009156",
    "comics": {
      "available": 123,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009156/comics",
      "items": ["..."],
      "returned": 20
    },
    "series": {
      "available": 56,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009156/series",
      "items": ["..."],
      "returned": 20
    },
    "stories": {
      "available": 124,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009156/stories",
      "items": ["..."],
      "returned": 20
    },
    "events": {
      "available": 6,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009156/events",
      "items": ["..."],
      "returned": 6
    },
    "urls": ["..."]
  }
}

describe('CharacterCard', () => {
  it('Case 1: if props is empty', () => {
    const renderedValue =  renderer.create(<Provider store={store}><CharacterCard /></Provider>).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })

  it('Case 2: if props contain only valid name', () => {
    const renderedValue =  renderer.create(
      <Provider store={store}>
        <CharacterCard name="Michael Carleone"/>
      </Provider>
    ).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })

  it('Case 3: if props contain valid name and characterID', () => {
    const renderedValue =  renderer.create(
      <Provider store={store}>
        <CharacterCard name="Michael Carleone" characterID={1}/>
      </Provider>
    ).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })

  it('Case 4: if props contain valid name, characterID and data', () => {
    const renderedValue =  renderer.create(
      <Provider store={store}>
        <Router>
          <CharacterCard name="Michael Carleone" characterID={1} data={{thumbnail: {extension: "", path: "1"}}}/>
        </Router>
      </Provider>
    ).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })

  it('Case 5: if props contain valid props and in the favorites list (store)', () => {
    store.dispatch(add(CharacterData))
    const renderedValue = renderer.create(
      <Provider store={store}>
        <Router>
          <CharacterCard {...CharacterData}/>
        </Router>
      </Provider>
    ).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })

  it('Case 6: if props contain valid props and not in the favorites list (store)', () => {
    store.dispatch(add(CharacterData))
    store.dispatch(del(CharacterData))
    const renderedValue = renderer.create(
      <Provider store={store}>
        <Router>
          <CharacterCard {...CharacterData}/>
        </Router>
      </Provider>
    ).toJSON()
    expect(renderedValue).toMatchSnapshot();
  })
})