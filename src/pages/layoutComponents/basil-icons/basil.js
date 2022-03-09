import React from 'react';
import { useState, useEffect } from "react";

const iconStyle = {
  padding: '',
  textAlign: 'center',
  fill: 'white'
}

class Icon extends React.Component {
  type = ""

  state = {
    iconRaw: "",
  }

  componentDidMount() {
    this.load()
  }

  async load(){
    this.Icon = await import('./svg/'+this.type+'/' + this.props.category + "/" + this.props.name + '.svg')
    fetch(this.Icon.default).then(response => {
      response.text().then(text => {
          text = text.replaceAll('fill="black"', '')
          text = text.replaceAll('fill="none"', '')
          this.setState({iconRaw: text});
        }
      );
    })
  }
}

class Outline extends Icon {
  type = "Outline"

  render() {

    if (this.props.category == null) {
      return (<></>)
    }
    return (
      <div style={iconStyle} dangerouslySetInnerHTML={{ __html: this.state.iconRaw }}>
      </div>
    )
  }
}

class Solid extends Icon {
  type = "Solid"

  render() {

    if (this.props.category == null) {
      return (<></>)
    }
    return (
      <div style={iconStyle} dangerouslySetInnerHTML={{ __html: this.state.iconRaw }}>
      </div>
    )
  }
}

const basil = { Outline, Solid }

export default basil;
