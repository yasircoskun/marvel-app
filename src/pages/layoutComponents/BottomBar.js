import React from "react";
import { Link } from "react-router-dom";
import basil from "./basil-icons/basil";

class BottomBar extends React.Component {

  state={
    signedIn: false
  }

  render(){
    return (
      <nav className="bottombar">
        <ul>
          <li>
            <Link to="/"><basil.Solid category="General" name="Home" />Home</Link>
          </li>
          <li>
            <Link to="/search"><basil.Solid category="Interface" name="Search" />Search</Link>
          </li>
          <li>
            <Link to="/share"><basil.Solid category="Communication" name="Share" />Share</Link>
          </li>
          <li>
            <Link to="/favorites"><basil.Solid category="Status" name="Heart" />Favorites</Link>
          </li>
          <li>
            <Link
              to={this.state.signedIn ? "/profile" : "/signin" }>
                {
                  this.state.signedIn ? 
                    <><basil.Solid category="Communication" name="User" />Profile</> 
                  : 
                    <><basil.Solid category="Interface" name="Login" />Sign In</> 
                }
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BottomBar;
