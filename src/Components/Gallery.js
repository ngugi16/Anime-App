import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Gallery() {
    const { getAnimePictures, pictures } = useGlobalContext();
    const { id } = useParams();

    // State
    const [index, setIndex] = useState(0);

    // Handle image click
    const handleImageClick = (i) => {
        setIndex(i);
    };

    // Fetch pictures when component mounts or id changes
    useEffect(() => {
        if (id) {
            getAnimePictures(id);
        }
    }, [id, getAnimePictures]);

    // Defensive check for index bounds
    const currentPicture = pictures[index] || { jpg: { image_url: '' } };

    return (
        <GalleryStyled>
            <div className="back">
                <Link to="/">
                    <i className="fas fa-arrow-left"></i>
                    Back to Home
                </Link>
            </div>
            <div className="big-image">
                <img src={currentPicture.jpg.image_url} alt="Big view" />
            </div>
            <div className="small-images">
                {pictures.map((picture, i) => (
                    <div
                        className="image-con"
                        onClick={() => handleImageClick(i)}
                        key={i}
                    >
                        <img
                            src={picture?.jpg.image_url}
                            alt={`Thumbnail ${i}`}
                            style={{
                                border: i === index ? '3px solid #27AE60' : '3px solid #e5e7eb',
                                filter: i === index ? 'grayscale(0)' : 'grayscale(60%)',
                                transform: i === index ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all .3s ease-in-out',
                            }}
                        />
                    </div>
                ))}
            </div>
        </GalleryStyled>
    );
}

const GalleryStyled = styled.div`
    background-color: #EDEDED;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .back {
        position: absolute;
        top: 2rem;
        left: 2rem;
        a {
            font-weight: 600;
            text-decoration: none;
            color: #EB5757;
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }

    .big-image {
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: #fff;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
        position: relative;
        img {
            width: 350px;
        }
    }

    .small-images {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 80%;
        padding: 2rem;
        border-radius: 7px;
        background-color: #fff;
        border: 5px solid #e5e7eb;

        .image-con img {
            width: 6rem;
            height: 6rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
        }
    }
`;

export default Gallery;
