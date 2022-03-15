import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import about_services from '../services/about';
import './../styles/pages/About.scss';
import { use } from 'marked';

const About = () => {
  const author = "Yasir Coşkun"
  const [state, setState] = useState({
    tweets: [],
    OSINT: "",
    profile_image: ""
  })

  useEffect(() => {
    async function getTweets() {
      const response = await about_services.getTweets();
      let contentHTML =  response.data.rss.channel.item[0].content_encoded;
      let profile_image = contentHTML.substring(contentHTML.indexOf('https://pbs'), contentHTML.indexOf('.jpg') + 4)
      profile_image = profile_image.replace('normal', '400x400');
      setState({
        profile_image: profile_image,
        OSINT: state.OSINT,
        tweets: response.data.rss.channel.item
      })
    }

    async function getOSINT() {
      const response = await about_services.getOSINT();
      setState({
        tweets: state.tweets,
        OSINT: response.data,
        profile_image: state.profile_image
      });
    }

    if(state.tweets.length === 0) getTweets()  
    if(state.OSINT === "") getOSINT()

  }, [state])

  return (<div className="About">
    <div className='profilePhoto'>
      <img src={state.profile_image} alt="profile" />
    </div>
    <h1>{author}</h1>

    <a href="https://yasircoskun.github.io" className='BlogButton'>yasircoskun.github.io</a>
  
    <h3>Last Tweets:</h3>
    <ul className='TweetList'>
      {state.tweets.map(tweet => {
        return (
          <li key={tweet.pubDate} dangerouslySetInnerHTML={{ __html: tweet.content_encoded }}>
          </li>
        )
      })}
    </ul>
    <h3>OSINT:</h3>
    <p className='OSINT' dangerouslySetInnerHTML={{ __html: marked(state.OSINT) }} >
    </p>
  </div>)
}

export default About;
