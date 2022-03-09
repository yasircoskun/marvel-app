import { Link } from "react-router-dom";
import basil from "./basil-icons/basil";

function BottomBar() {
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
          <Link to="/profile"><basil.Solid category="Communication" name="User" />Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default BottomBar;
