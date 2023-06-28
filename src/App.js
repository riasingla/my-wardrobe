import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Outfits from './Components/Outfits';
import Items from './Components/Items';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import ViewItems from './Components/view-items';

function App() {
  return (
    <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Items" element={<Items/>} />
            <Route path="/view-items" element={<ViewItems/>}/>
            <Route path="/Outfits" element={<Outfits />} />  
          </Routes>
          <Footer />
        </div>
    </Router>
  );
  }


export default App;
