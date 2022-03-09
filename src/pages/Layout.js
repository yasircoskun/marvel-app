import { Outlet } from "react-router-dom";
import BottomBar from './layoutComponents/BottomBar';
import Drawer from './layoutComponents/Drawer';

const Layout = () => {
  return (
    <>
      <Drawer />
      <div className='AppContainer'>
        <Outlet />
      </div>
      <BottomBar />
    </>
  )
};

export default Layout;
