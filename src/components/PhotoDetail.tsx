import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import unsplashApi from '../api/unsplashApi';

interface PhotoDetail {
    id: string;
    urls: {
        full: string;
    };
    alt_description: string;
    description: string | null;
    user: {
        name: string;
    };
}

const PhotoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get photo ID from URL parameters
    const [photo, setPhoto] = useState<PhotoDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            try {
                const response = await unsplashApi.get(`/photos/${id}`);
                setPhoto(response.data);
            } catch (error) {
                console.error('Error fetching photo details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!photo) {
        return <div className="text-center mt-5">Photo not found</div>;
    }

    return (
        <div className="container mt-4">
            <Link to="/photos" className="btn btn-primary mb-3">Back to Photo List</Link>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{photo.alt_description || 'Untitled Photo'}</h2>
                    <p className="card-text"><strong>Author:</strong> {photo.user.name}</p>
                    <p className="card-text"><strong>Description:</strong> {photo.description || 'No description'}</p>
                </div>
                <img src={photo.urls.full} alt={photo.alt_description} className="card-img-bottom" /> {/* Image at the bottom */}
            </div>
        </div>
    );
};

export default PhotoDetail;
