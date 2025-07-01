import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Overview from '../HomePage/Components/Overview/Overview.jsx'
import Footer from '../Footer/Footer.jsx';

const HomePage = () => {
  return (
    <div className="home">
        <Navbar />
        <Overview />
        <Footer />
    </div>
  )
}

export default HomePage
