/* Dependencies  */
import React from 'react'
import { shallow } from 'enzyme'

/* Components */
import Thumbnail from '../components/Thumbnail'

const sampleImageURL = "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_incredible.jpg"

describe('Thumbnail', () => {
  it('Case 1: if imageURL is null should return an empty brackets <>', () => {
    const wrapper = shallow(<Thumbnail />)
    expect(wrapper.equals(<></>)).toEqual(true);
  })

  it('Case 2: if imageURL is not null should return a img with src attr equals to imageURL', () => {
    const wrapper = shallow(<Thumbnail imageURL={sampleImageURL}/>)
    const img = wrapper.find('img')
    expect(img.find({src: sampleImageURL})).toHaveLength(1);
  })
})