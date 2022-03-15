import React from "react";
import { Link } from "react-router-dom";
import basil from "./basil-icons/basil";
import Favorites from "../../components/Favorites";

const Drawer = (props) => {
    const crossRef = React.createRef();
    const drawerButtonRef = React.createRef();
    const drawerRef = React.createRef();
    const crossRefClicked = crossClicked.bind(this);
    const drawerButtonRefClicked = drawerButtonClicked.bind(this);

  function crossClicked() {
    drawerRef.current.className = drawerRef.current.className.replaceAll(' open', '').replaceAll(' close', '');
    drawerRef.current.className += ' close';
    drawerButtonRef.current.className = drawerButtonRef.current.className.replace(' invisible', '');
    drawerButtonRef.current.className += ' visible';
  }

  function drawerButtonClicked() {
    drawerRef.current.className = drawerRef.current.className.replace(' close', '');
    drawerRef.current.className += ' open';
    drawerButtonRef.current.className = drawerButtonRef.current.className.replace(' visible', '');
    drawerButtonRef.current.className += ' invisible';
  }

    return (<>
    <span className="drawerButton" ref={drawerButtonRef} onClick={drawerButtonRefClicked}><basil.Outline category="Interface" name="Menu" /></span>
    <aside className="drawer close" ref={drawerRef}>
      <div className="drawerWrapper">
        <span className="cross" ref={crossRef} onClick={crossRefClicked}><basil.Outline category="Interface" name="Cross" /></span>
        <div className="drawerLogo">
          <img src="/Marvel Studio.png" alt="" />
        </div>
        <ul>
          <li>
            <Link to="/"><basil.Solid category="General" name="Home" /><span>Home</span></Link>
          </li>
          <li>
            <Link to="/search"><basil.Solid category="Interface" name="Search" /><span>Search</span></Link>
          </li>
          <li>
            <Link to="/about"><basil.Solid category="Interface" name="At-sign" /><span>Developer</span></Link>
          </li>
        </ul>
        <Favorites></Favorites>
        <div className="drawerFooter">
          <span className="drawerFooterText">Powered By </span>
          <img className="invertColor" src="/stark.png" alt="" />
        </div>
      </div>
    </aside>
  </>);
}

export default Drawer;
