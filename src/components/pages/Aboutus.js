import React from 'react';
import '../css/Aboutus.css';
import logo from "../assets/logo/logo.png"



function about_us() {
  
  return (
    <div className="about-us-container">
     
      <div className="about-us-header">
      <img src={logo} className="logo" alt="logo" />
        <h1 className='welcome'>Welcome to Connectify</h1>
      </div>
      <div>
        <h2 className='mission'>Our Mission</h2>
        <p className='mission-script'>
          Connectify is a dedicated platform for college students, staff, and administrators. 
          Our mission is to foster a secure and vibrant online community where users can share their experiences, 
          stay connected, and make the most of their college life.
        </p>
      </div>

      <div>
        <h2 className='choose'>Why Choose Us?</h2>
        <p className='choose-us-script'>
          Unlike other platforms, Connectify caters exclusively to the unique needs of college communities. 
          With a focus on safety, engagement, and collaboration, we aim to create a space where you can thrive both 
          socially and academically.
        </p>
      </div>
      <h2 className='contact'>Contact Us</h2>
      <p className='ct-script'>Have questions or feedback? Connect with the people behind Connectify!</p>
      <div className='contact-us-container'>
        <div className='profile-card-1'>
            <img className='profile-card' src="https://via.placeholder.com/100" alt="Preethi" />
            <h3 className='profile-name'>Preethi NR </h3>
            <span className="profile-description">Reach out at</span>
            <a className='profile-email' href="mailto:preethi@connectify.com"> preethi@connectify.com</a>
        </div>   
        <div className='profile-card-2'>
            <img className='profile-card' src="https://via.placeholder.com/100" alt="Puneeth" />
            <h3 className='profile-name'>Puneeth:  </h3>
            <span className="profile-description">Contact at</span>
            <a  className='profile-email' href="mailto:puneeth@connectify.com"> puneeth@connectify.com</a>.
        </div> 
        <div className='profile-card-3'>
            <img className='profile-card' src="https://via.placeholder.com/100" alt="Rakshitha" />
            <h3 className='profile-name'> Rakshitha:  </h3>
            <span className="profile-description" > Email at</span>
            <a  className='profile-email' href="mailto:rakshitha@connectify.com"> rakshitha@connectify.com</a>.
         <div className='profile-card-4'>
            <img className='profile-card' src="https://via.placeholder.com/100" alt="Suhani" />
            <h3 className='profile-name'>Suhani: </h3>
            <span className="profile-description">Drop an email at </span>
            <a  className='profile-email' href="mailto:suhani@connectify.com"> suhani@connectify.com</a>.
        
        </div>
      </div>
        <p className='email'>
          General inquiries? Email us at 
          <a href="mailto:support@connectify.com"> support@connectify.com</a>. 
          We’d love to hear from you!
        </p>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Connectify. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default about_us;
