import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Message from "./Message";
import Search from "./Search";
import OtherProfile from "./otherprofile";  // Ensure this is the correct import path

import CreatePost from "./CreatePost";
import Reels from "./Reels";
import Explore from "./Explore";
import Notification from "./Notification";
import Following from "./Follower";
import Follower from "./Following";
import More from "./More";
import About_us from "./Aboutus";
import RequestReset from "./Resentpasswordrequest";
import ResetPassword from "./Restpassword";
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
            <Route path="/create" element={<CreatePost />} />
            <Route path="/Reels" element={<Reels></Reels>}></Route>
            <Route path="/Explore" element={<Explore></Explore>}></Route>
            <Route path="/Notification" element={<Notification></Notification>}></Route>
            <Route path="/Following/:user_id" element={<Following></Following>}></Route>
            <Route path="/Follower/:user_id" element={<Follower></Follower>}></Route>
            <Route path="/More" element={<More></More>}></Route>
            <Route path="/about_us" element={<About_us></About_us>}></Route>
            <Route path="/RequestReset" element={<RequestReset></RequestReset>}></Route>
            <Route path="/Resetpassword" element={<ResetPassword></ResetPassword>}></Route>
        </Routes>
    );
}

export default Customeroutes;
