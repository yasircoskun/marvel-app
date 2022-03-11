import { Outlet } from "react-router-dom";
import BottomBar from './layoutComponents/BottomBar';
import Header from './layoutComponents/Header';
import Drawer from './layoutComponents/Drawer';

const Layout = () => {
  return (
    <>
      <Header />
      <Drawer />
      <div className='AppContainer'>
        <Outlet />
      </div>
      {/* <BottomBar /> */}
    </>
  )
};

export default Layout;
