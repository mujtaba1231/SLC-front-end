import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import CreateCommunity from "./pages/CreateCommunity";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/Contact";
import ResourcesPage from "./pages/Resources";
import Communities from "./pages/Communities";
import CommunityDetails from "./pages/CommunitiesDetails";
import EditCommunity from "./pages/EditCommunity";
import Blogs from "./pages/Blogs";
import WriteBlog from "./pages/Write";
import BlogDetail from "./pages/BlogDetail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/community" element={<CreateCommunity />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />

          <Route path="/communities" element={<Communities/>} />
          <Route path="/communities/:id" element={<CommunityDetails/>} />
          <Route path="/communities/edit/:id" element={<EditCommunity/>} />

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
