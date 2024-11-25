import React from 'react';
// import './about_us.css';
import logo from "../assets/logo/logo.png"



function about_us() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
      <img src={logo} className="logo" alt="logo" />
        <h1>Welcome to Connectify</h1>
      </div>

      <div>
        <h2>Our Mission</h2>
        <p>
          Connectify is a dedicated platform for college students, staff, and administrators. 
          Our mission is to foster a secure and vibrant online community where users can share their experiences, 
          stay connected, and make the most of their college life.
        </p>
      </div>

      <div>
        <h2>Why Choose Us?</h2>
        <p>
          Unlike other platforms, Connectify caters exclusively to the unique needs of college communities. 
          With a focus on safety, engagement, and collaboration, we aim to create a space where you can thrive both 
          socially and academically.
        </p>
      </div>

      <div>
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Connect with the people behind Connectify!</p>
        <ul>
          <li>
            <img src="https://via.placeholder.com/100" alt="Preethi" />
            Preethi: Reach out at 
            <a href="mailto:preethi@connectify.com"> preethi@connectify.com</a>.
          </li>
          <li>
            <img src="https://via.placeholder.com/100" alt="Puneeth" />
            Puneeth: Contact at 
            <a href="mailto:puneeth@connectify.com"> puneeth@connectify.com</a>.
          </li>
          <li>
            <img src="https://via.placeholder.com/100" alt="Rakshitha" />
            Rakshitha: Manages design and user experience to keep Connectify visually appealing and user-friendly. Email at 
            <a href="mailto:rakshitha@connectify.com"> rakshitha@connectify.com</a>.
          </li>
          <li>
            <img src="https://via.placeholder.com/100" alt="Suhani" />
            Suhani: Drop an email at 
            <a href="mailto:suhani@connectify.com"> suhani@connectify.com</a>.
          </li>
        </ul>
        <p>
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
