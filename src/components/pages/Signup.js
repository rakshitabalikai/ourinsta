import '../css/Signup.css'
import { useState } from 'react';

function Signup(){
    let [name , setname] = useState('');
    let [email , setemail] = useState('');
    let [mobile , setmobile] = useState('');
    let [password , setpassword] = useState('')
    return(
        <div>
           <div className="main-container-sigin">
                <div className="Signin-main-container">

                    <div className="Main-signin-form">

                        <div className="signin-logo">
                            <h2>Instagram</h2>
                        </div>

                        <div className="Signin_form">
                            
                            <div className="Username-container">
                                <label>Username</label>
                                <input type="text" className='signup-input'
                                onChange={(val) => setname(val.target.value)}/>
                            </div>

                            <div className="Username-container">
                                <label>Email</label>
                                <input type="email" className='signup-input' 
                                onChange={(val) => setemail(val.target.value)}/>
                            </div>   

                            <div className="Username-container">
                                <label>Mobile Number</label>
                                <input type="number" className='signup-input'
                                onChange={(val) => setmobile(val.target.value)}/>
                            </div>

                            <div className="Username-container">
                                <label>password </label>
                                <input type="text" className='signup-input'
                                onChange={(val) => setpassword(val.target.value)}/>
                            </div> 
                            
                            <div className="Signin_button_container">
                                <button className="Signin_button" >Sign up</button>
                            </div>

                            <div className="Signup_button_container">
                                Alredy our Customer?
                                
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div> 
                

            

        
    );
}
export default Signup;