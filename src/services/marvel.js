import axios from 'axios';
import config from '../apikey'
import md5 from 'js-md5/src/md5';

const marvel_api_base = 'https://gateway.marvel.com:443/v1/public/'

const marvel_api_headers = {
  Referer: 'http://localhost:1998/'
}
const ts = 1337;

async function getCharacters(offset) {
  return await axios.get(marvel_api_base + 'characters', {
    params: {
      offset: offset,
      limit: 30,
      apikey: config.apikey,
      hash: md5(ts + config.apisecret + config.apikey)
    },
    headers: marvel_api_headers
  });
}

async function getCharacterById(characterID) {
  return await axios.get(marvel_api_base + 'characters/' + characterID, {
    params: {
      apikey: config.apikey,
      hash: md5(ts + config.apisecret + config.apikey)
    },
    headers: marvel_api_headers
  });
}

async function getComicsByCharacterId(characterID) {
  return await axios.get(marvel_api_base + 'characters/' + characterID + '/comics', {
    params: {
      limit: 10,
      orderBy: 'focDate',
      apikey: config.apikey,
      hash: md5(ts + config.apisecret + config.apikey)
    },
    headers: marvel_api_headers
  });
}

async function getCharacterByNameStartWith(query, offset) {
  return await axios.get(marvel_api_base + 'characters', {
    params: {
      offset: offset,
      nameStartsWith: query,
      apikey: config.apikey,
      limit: 30,
      hash: md5(ts + config.apisecret + config.apikey)
    },
    headers: marvel_api_headers
  });
}

const marvel_api = {
  getCharacters: getCharacters,
  getCharacterById: getCharacterById,
  getComicsByCharacterId: getComicsByCharacterId,
  getCharacterByNameStartWith: getCharacterByNameStartWith
}

export default marvel_api