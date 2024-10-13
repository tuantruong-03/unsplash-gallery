import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import unsplashApi from '../api/unsplashApi';

interface Photo {
    id: string;
    urls: {
        thumb: string;
        full: string;
    };
    alt_description: string;
    user: {
        name: string;
    };
}

const PhotoGrid: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchPhotos = async () => {
            try {
                const response = await unsplashApi.get('/photos', { params: { page } });
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
            setLoading(false);
        };
        fetchPhotos();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {photos.map((photo) => (
                    <div key={photo.id} className="col-md-4 col-sm-6 mb-4">
                        <div className="card shadow-sm border-0">
                            <Link to={`/photos/${photo.id}`} className="text-decoration-none text-dark">
                                <div className="position-relative">
                                    <img
                                        src={photo.urls.thumb}
                                        alt={photo.alt_description}
                                        className="card-img-top img-fluid"
                                        style={{ height: '400px', objectFit: 'cover' }} // Fixed height and cover
                                    />
                                    <div className="card-img-overlay d-flex flex-column justify-content-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                                        <h5 className="card-title text-light">{photo.user.name}</h5>
                                        <p className="card-text text-light">{photo.alt_description || 'Untitled'}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
            <div className="text-center mt-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}
        </div>
    );
};

export default PhotoGrid;
