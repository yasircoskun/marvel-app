import React from 'react';
import axios from "axios";
import './../styles/pages/About.scss';
import { marked } from 'marked';

class About extends React.Component {
  author = "Yasir Coşkun"

  state = {
    tweets: [],
    OSINT: "",
    profile_image: ""
  }

  async getTweets() {
    const response = await axios.get('https://cdn.feedcontrol.net/5188/5099-VHlr7YvZajgsB.json');
    this.setState({
      tweets: response.data.rss.channel.item,
    });
  }

  async getOSINT() {
    const response = await axios.get('https://raw.githubusercontent.com/yasircoskun/yasircoskun.github.io/master/contents/OSINT.md');
    this.setState({
      OSINT: response.data,
    });
  }

  async componentDidMount() {
    await this.getTweets()
    let contentHTML = this.state.tweets[0].content_encoded;
    let profile_image = contentHTML.substring(contentHTML.indexOf('https://pbs'), contentHTML.indexOf('.jpg') + 4)
    profile_image = profile_image.replace('normal', '400x400');
    this.setState({
      profile_image: profile_image
    })
    this.getOSINT()
  }

  render() {
    return (<div className="About">
      <div className='profilePhoto'>
        <img src={this.state.profile_image} alt="profile" />
      </div>
      <h1>{this.author}</h1>

      <a href="https://yasircoskun.github.io" className='BlogButton'>yasircoskun.github.io</a>
   
      <h3>Last Tweets:</h3>
      <ul className='TweetList'>
        {this.state.tweets.map(tweet => {
          return (
            <li key={tweet.pubDate} dangerouslySetInnerHTML={{ __html: tweet.content_encoded }}>
            </li>
          )
        })}
      </ul>
      <h3>OSINT:</h3>
      <p className='OSINT' dangerouslySetInnerHTML={{ __html: marked(this.state.OSINT) }} >
      </p>
    </div>)
  }
}

export default About;
