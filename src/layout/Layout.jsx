import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Layout = () => {
    return (
        <div className="flex flex-col w-full">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;
