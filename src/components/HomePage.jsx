import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1 style={{ textAlign: 'center', color: '#8c8c8c' }}>Team Text</h1>
        <h1>About the Website</h1>
      </header>
      <main>
        <p><b>Welcome to Team Text.</b> 
        This website is made to message anyone that registers to it. Click on Register on the top right to get started. Fill in the information there. 
          Once you have done that, you will be sent back to the home page with a new option on the navbar called Chat. This leads to our messaging dashboard where you can see everyone that has logged into our website.
          Our messaging system allows attachments such as images and GIFs. You can also customize your profile with a profile picture for more personalization.   </p>
        
      </main>
      <footer>
        <p>Developed by: Dominic Kesto, Muhammad Khan, Abdullah Ashraf, Chris Habre, Muhammad Abubakar</p>
      </footer>
    </div>
  );
}

export default HomePage;
