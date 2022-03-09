import axios from 'axios';
import React from 'react';
import md5 from 'js-md5/src/md5';

class StringResolver extends React.Component {

  state={
    resource: null
  }

  async getResource(apiUrl) {
    let ts = 1337
    const response = await axios.get(apiUrl, {
      params: {
        ts: ts,
        apikey: window.apikey,
        hash: md5(ts + window.apisecret + window.apikey)
      }
    });

    this.setState({ resource: [...response.data.data.results], offset: this.state.offset += 30 });
    console.log(this.state.resource)
  }

  render() {
    if(typeof this.props.object['resourceURI'] !== "undefined"){
      console.log(this.props.object['resourceURI'])
      //this.getResource(this.props.object['resourceURI'])
    }
    if (this.props.object == null) {
      return (<></>)
    }
    return (
      Object.keys(this.props.object).map((key) => {
        if (typeof this.props.object[key] == "string" && this.props.object[key] !== "") {
          return (
            <div>
              <div className='data'>
                <b>{key} : </b>
                <span className=''>{this.props.object[key]}</span>
              </div>
            </div>)
        } else {
          return (<></>)
        }
      })
    )
  }
}

export default StringResolver;
