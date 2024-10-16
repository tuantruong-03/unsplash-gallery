import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/photos" element={<PhotoGrid/>} />
        <Route path="/photos/:id" element={<PhotoDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;