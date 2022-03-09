import React from 'react';

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
    this.load()
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
    this.load()
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
