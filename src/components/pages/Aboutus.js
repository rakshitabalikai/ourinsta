import React from 'react';
import '../css/Aboutus.css';
import logo from "../assets/logo/logo.png";
import rakshita from "../assets/logo/rakshita.jpeg";
import puneeth from "../assets/logo/puneeth.jpeg";
import preeti from "../assets/logo/preeti.jpeg";
import suhani from "../assets/logo/suhani.jpeg";
function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <img src={logo} className="aboutus-logo" alt="logo" />
        <h1 className="welcome">About Us</h1>
      </header>
    <div className='mission-container'>
      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-description">
          Connectify is a dedicated platform for college students, staff, and administrators.
          Our mission is to foster a secure and vibrant online community where users can share their experiences,
          stay connected, and make the most of their college life.
        </p>
      </section>

      <section className="choose-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-description">
          Unlike other platforms, Connectify caters exclusively to the unique needs of college communities.
          With a focus on safety, engagement, and collaboration, we aim to create a space where you can thrive both
          socially and academically.
        </p>
      </section>
    </div>
      <section className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="profile-cards">
          {[
            { name: 'Preethi NR', email: 'preethi@connectify.com',src:preeti },
            { name: 'Puneeth', email: 'puneeth@connectify.com', src:puneeth },
            { name: 'Rakshitha', email: 'rakshita@connectify.com',src:rakshita },
            { name: 'Suhani', email: 'suhani@connectify.com',src:suhani }
          ].map((profile, index) => (
            <div className="profile-card" key={index}>
              <img src={profile.src} alt={profile.name} className="profile-image" />
              <h3 className="profile-name">{profile.name}</h3>
              <a href={`mailto:${profile.email}`} className="profile-email">{profile.email}</a>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Connectify. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
