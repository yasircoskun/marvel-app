import { Link } from "react-router-dom";
import basil from "./basil-icons/basil";

const BottomBar = (props) => {
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
          <Link to="/favorites"><basil.Solid category="Status" name="Heart" />Favorites</Link>
        </li>
        <li>
          <Link to="/about"><basil.Solid category="Interface" name="At-sign" />Developer</Link>
        </li>
      </ul>
    </nav>
  );
} 


export default BottomBar;
