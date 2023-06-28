import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/sectionimage(2).jpg';
import image2 from '../images/sectionimage(4).jpg';
import image3 from '../images/sectionimage(5).jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="dashboard-text">
          <h1>Create for yourself, a virtual wardrobe!</h1>
          <button className="register-button" onClick={handleRegisterClick}>Click Here to Register</button>
        </div>
      </div>
      <main className="dashboard-content">
  <section className="dashboard-section">
    <img src={image1} alt="img1" />
    <h2>System</h2>
    <p>
      Welcome to our Virtual Wardrobe Management System! We provide a comprehensive solution for managing
      your wardrobe digitally. Say goodbye to the hassle of organizing and keeping track of your clothes.
      With our system, you can easily manage and plan your outfits, keep track of your clothing inventory,
      and discover new styling options effortlessly.
    </p>
  </section>
  <section className="dashboard-section">
    <img src={image2} alt="img2" />
    <h2>Features and Services</h2>
    <p>
      Our Virtual Wardrobe Management System offers a range of features and services to enhance your wardrobe experience.
      From cataloging your clothes with detailed descriptions and images to creating outfits for different occasions,
      our system provides a seamless and user-friendly interface. Experience a new level of convenience with our services.
    </p>
  </section>
  <section className="dashboard-section">
    <img src={image3} alt="img3" />
    <h2>User Testimonials</h2>
    <p>
      Don't just take our word for it! Here are some testimonials from our satisfied users:
      "I love how the Virtual Wardrobe Management System has simplified my daily outfit decisions.<br/>
      "Managing my wardrobe has never been easier. This system has saved me time and helped me
      discover new outfit combinations I never thought of before." - Mark
    </p>
  </section>
</main>
    </div>
  );
};
export default Dashboard;
