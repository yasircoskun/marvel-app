import axios from 'axios';

const feed_control_url = 'https://cdn.feedcontrol.net/5188/5099-VHlr7YvZajgsB.json'
const github_page_osint_file = 'https://raw.githubusercontent.com/yasircoskun/yasircoskun.github.io/master/contents/OSINT.md'

async function getTweets() {
  return await axios.get(feed_control_url);
}

async function getOSINT() {
  return await axios.get(github_page_osint_file)
}

const about_services = {
  getTweets: getTweets,
  getOSINT: getOSINT,
}

export default about_services