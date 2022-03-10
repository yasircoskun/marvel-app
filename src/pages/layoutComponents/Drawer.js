import React from "react";
import { Link } from "react-router-dom";
import basil from "./basil-icons/basil";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.crossRef = React.createRef();
    this.drawerButtonRef = React.createRef();
    this.drawerRef = React.createRef();
    this.crossRefClicked = this.crossRefClicked.bind(this);
    this.drawerButtonRefClicked = this.drawerButtonRefClicked.bind(this);
  }

  state={
    signedIn: false
  }

  crossRefClicked() {
    this.drawerRef.current.className = this.drawerRef.current.className.replaceAll(' open', '').replaceAll(' close', '');
    this.drawerRef.current.className += ' close';
    this.drawerButtonRef.current.className = this.drawerButtonRef.current.className.replace(' invisible', '');
    this.drawerButtonRef.current.className += ' visible';
  }

  drawerButtonRefClicked() {
    this.drawerRef.current.className = this.drawerRef.current.className.replace(' close', '');
    this.drawerRef.current.className += ' open';
    this.drawerButtonRef.current.className = this.drawerButtonRef.current.className.replace(' visible', '');
    this.drawerButtonRef.current.className += ' invisible';
  }

  render() {
    return (<>
      <span className="drawerButton" ref={this.drawerButtonRef} onClick={this.drawerButtonRefClicked}><basil.Outline category="Interface" name="Menu" /></span>
      <aside className="drawer close" ref={this.drawerRef}>
        <div className="drawerWrapper">
          <span className="cross" ref={this.crossRef} onClick={this.crossRefClicked}><basil.Outline category="Interface" name="Cross" /></span>
          <ul>
            <li>
              <Link to="/"><basil.Solid category="General" name="Home" /><span>Home</span></Link>
            </li>
            <li>
              <Link to="/search"><basil.Solid category="Interface" name="Search" /><span>Search</span></Link>
            </li>
            <li>
              <Link to="/share"><basil.Solid category="Communication" name="Share" /><span>Share</span></Link>
            </li>
            <li>
              <Link to="/favorites"><basil.Solid category="Status" name="Heart" /><span>Favorites</span></Link>
            </li>
            <li>
            <Link
              to={this.state.signedIn ? "/profile" : "/signin" }>
                {
                  this.state.signedIn ? 
                    <><basil.Solid category="Communication" name="User" /><span>Profile</span></> 
                  : 
                    <><basil.Solid category="Interface" name="Login" /><span>Sign In</span></> 
                }
            </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>);
  }
}

export default Drawer;
