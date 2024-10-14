import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container mt-5 text-center">
            <h1>Welcome to the Photo Gallery</h1>
            <p>Browse through a collection of beautiful photos from Unsplash!</p>
            <Link to="/photos" className="btn btn-primary btn-lg mt-3">
                View Photos
            </Link>
        </div>
    );
};

export default Home;
