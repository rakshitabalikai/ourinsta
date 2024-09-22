import '../css/Login.css'

function Login(){
    
    return(
        <div> 
            <div className="main-container-login">
                <div className="box1">
                    <div className="heading">
                        
                    </div>
                    <form className="login-form">
                        <div className="field">
                            <input id="username" type="name" placeholder="Phone number or username or email"/>
                            <label for="username">Phone number or username or email</label>
                        </div>
                        <div className="field">
                            <input id="password" type="password" placeholder="Password"/>
                            <label for="password">Password</label>
                        </div>
                        <button class="login-button" title="login">Log In</button>
                        <div class="separator">
                            <div class="line"></div>
                                <p>OR</p>
                            <div class="line"></div>
                        </div>
                        <div class="other">
                            <button class="fb-login-btn" type="button">
                             <i class="fa fa-facebook-official fb-icon"></i>
                                <span class="">Log in with Facebook</span>
                            </button>
                             <a class="forgot-password" href="#">Forgot password?</a>
                         </div>
                    </form>
                </div>
                <div class="box2">
                    <p>Don't have an account? <a class="signup" href="#">Sign Up</a></p>
                </div>
            </div>
        </div>

    );
}
export default Login;