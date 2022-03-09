import { Outlet } from "react-router-dom";
import BottomBar from './layoutComponents/BottomBar';

const Layout = () => {
  return (
    <>
      <div className='AppContainer'>
        <Outlet />
      </div>
      <BottomBar />
    </>
  )
};

export default Layout;
