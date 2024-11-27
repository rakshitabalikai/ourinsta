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

      <div className='contact-us-container'>
        <h2 className='contact'>Contact Us</h2>
        <p className='ct-script'>Have questions or feedback? Connect with the people behind Connectify!</p>
        <ul className='images'>
          
            <img className='img-1' src="https://via.placeholder.com/100" alt="Preethi" />
            <h1 className='n1'>Preethi:Reach out at </h1>
            <a className='e1' href="mailto:preethi@connectify.com"> preethi@connectify.com</a>
            
         
            <img className='img-2' src="https://via.placeholder.com/100" alt="Puneeth" />
            <h1 className='n2'>Puneeth: Contact at </h1>
            <a  className='e2' href="mailto:puneeth@connectify.com"> puneeth@connectify.com</a>.
         
            <img className='img-3' src="https://via.placeholder.com/100" alt="Rakshitha" />
            <h1 className='n3'> Rakshitha: Manages design and user experience to keep Connectify visually appealing and user-friendly. Email at </h1>
            <a  className='e3' href="mailto:rakshitha@connectify.com"> rakshitha@connectify.com</a>.
         
            <img className='img-4' src="https://via.placeholder.com/100" alt="Suhani" />
            <h1 className='n4'>Suhani: Drop an email at </h1>
            <a  className='e4' href="mailto:suhani@connectify.com"> suhani@connectify.com</a>.
        
        </ul>
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
