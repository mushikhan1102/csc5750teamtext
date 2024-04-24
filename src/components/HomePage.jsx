import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '48px', color: '#333', fontWeight: 'bold' }}>TEAM</h1>
        <h2 style={{ fontSize: '24px', color: '#8c8c8c', marginBottom: '20px' }}>About the Website</h2>
      </header>
      <main style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.5' }}>
          Welcome to Team Text. This website is made to message anyone that registers to it. Click on Register on the top right to get started. Fill in the information there. 
          Once you have done that, you will be sent back to the home page with a new option on the navbar called Chat. This leads to our messaging dashboard where you can see everyone that has logged into our website.
          Our messaging system allows attachments such as images and GIFs or even full files. You can also customize your profile with a profile picture for more personalization.
        </p>
      </main>
      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '16px', color: '#555' }}>
        Developed by Dominic, Muhammed, Abdullah, Chris, and Muhammed Abubakar
      </footer>
    </div>
  );
}

export default HomePage;

