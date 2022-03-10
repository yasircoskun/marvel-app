import React from 'react';
import basil from './layoutComponents/basil-icons/basil';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.TwitterBtnRef = React.createRef();
    this.TwitterBtnRefClicked = this.TwitterBtnRefClicked.bind(this);
  }

  TwitterBtnRefClicked(){
    alert('this')
  }

  render() {
    return (
      <>
        <h1>Sign In</h1>
        <div className='ButtonWrapper'>
          <button className='TwitterBtn' ref={this.TwitterBtnRef} onClick={this.TwitterBtnRefClicked}>
            <basil.Solid category="Brands" name="Twitter"></basil.Solid>
            <span>Sign In with Twitter</span>
          </button>
        </div>
      </>
    )
  }
}

export default SignIn;