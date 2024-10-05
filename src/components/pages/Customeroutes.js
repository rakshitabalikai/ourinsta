import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Message from "./Message";
import Search from "./Search";
import OtherProfile from "./otherprofile";  // Ensure this is the correct import path

function Customeroutes(){
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/search" element={<Search />} />
            <Route path="/otherprofile/:userId" element={<OtherProfile />} />
        </Routes>
    );
}

export default Customeroutes;
