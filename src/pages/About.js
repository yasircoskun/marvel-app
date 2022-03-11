import React from 'react';
import axios from "axios";
import './../styles/pages/About.scss';
import { marked } from 'marked';

class About extends React.Component {
  author = "Yasir Coşkun"

  state = {
    tweets: [],
    OSINT: ""
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
    this.getTweets()
    this.getOSINT()
  }

  render() {
    return (<div className="About">
      <div className='profilePhoto'>
        <img src="https://pbs.twimg.com/profile_images/1447399572414812168/jxno6RBR_400x400.jpg" alt="profile" />
      </div>
      <h1>{this.author}</h1>

      <a href="https://yasircoskun.github.io" className='BlogButton'>yasircoskun.github.io</a>
   
      <h3>Last Tweets:</h3>
      <ul className='TweetList'>
        {this.state.tweets.map(tweet => {
          return (
            <li dangerouslySetInnerHTML={{ __html: tweet.content_encoded }}>
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
