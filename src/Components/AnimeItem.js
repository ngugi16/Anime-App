import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem() {
    const { id } = useParams();

    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const {
        title, synopsis, trailer, duration, aired,
        season, images, rank, score, scored_by, popularity,
        status, rating, source
    } = anime;

    // Function to fetch anime details
    const getAnime = async (animeId) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
            const data = await response.json();
            setAnime(data.data);
        } catch (error) {
            console.error("Error fetching anime details:", error);
        }
    };

    // Function to fetch characters of the anime
    const getCharacters = async (animeId) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
            const data = await response.json();
            setCharacters(data.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [id]);

    // Memoize characters list to avoid unnecessary re-renders
    const characterList = useMemo(() => {
        return characters?.map((character) => (
            <Link to={`/character/${character.mal_id}`} key={character.mal_id}>
                <img src={character.character.images.jpg.image_url} alt={character.character.name} />
                <p>{character.character.name}</p>
            </Link>
        ));
    }, [characters]);

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt={title} />
                    </div>
                    <div className="anime-details">
                        <p><strong>Duration:</strong> {duration}</p>
                        <p><strong>Aired:</strong> {aired?.string}</p>
                        <p><strong>Season:</strong> {season}</p>
                        <p><strong>Rank:</strong> {rank}</p>
                        <p><strong>Score:</strong> {score} (by {scored_by} users)</p>
                        <p><strong>Popularity:</strong> {popularity}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Rating:</strong> {rating}</p>
                        <p><strong>Source:</strong> {source}</p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : `${synopsis?.slice(0, 300)}...`}
                    <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Read Less' : 'Read More'}
                    </button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? (
                    <iframe 
                        src={trailer.embed_url} 
                        title="Anime Trailer" 
                        width="100%" 
                        height="400px" 
                        frameBorder="0" 
                        allowFullScreen 
                    />
                ) : (
                    <p>No trailer available</p>
                )}
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characterList}
            </div>
        </AnimeItemStyled>
    );
}

// Styling for the AnimeItem component
const AnimeItemStyled = styled.div`
    padding: 2rem;
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    .details {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .detail {
        display: flex;
        gap: 2rem;
        .image img {
            max-width: 300px;
            border-radius: 10px;
        }
        .anime-details {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            p {
                font-size: 1rem;
                line-height: 1.5;
                strong {
                    font-weight: bold;
                }
            }
        }
    }
    .description {
        font-size: 1rem;
        line-height: 1.6;
        button {
            display: inline-block;
            margin-left: 1rem;
            background: none;
            border: none;
            color: #007bff;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .title {
        font-size: 1.8rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .trailer-con {
        margin-bottom: 2rem;
        iframe {
            width: 100%;
            border-radius: 10px;
        }
    }
    .characters {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        a {
            text-align: center;
            width: 150px;
            img {
                width: 100%;
                border-radius: 10px;
                margin-bottom: 0.5rem;
            }
            p {
                font-size: 0.9rem;
                font-weight: 600;
            }
        }
    }
`;

export default AnimeItem;
