import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import EditProfile from "./EditProfile";


function Customeroutes(){
    return(
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/Editprofile" element={<EditProfile></EditProfile>}></Route>
        </Routes>
    )
}

export default Customeroutes;