import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function Airing({ rendered }) {
    const { airingAnime, isSearch, searchResults, getAiringAnime } = useGlobalContext();
    const [loading, setLoading] = useState(true); // State to manage loading

    // Fetch airing anime data when the component mounts
    useEffect(() => {
        if (rendered === 'airing') {
            const fetchAnime = async () => {
                setLoading(true); // Start loading
                try {
                    await getAiringAnime(); // Fetch the data
                } catch (error) {
                    console.error('Error fetching airing anime:', error);
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            fetchAnime();
        }
    }, [rendered, getAiringAnime]);

    // Memoize the anime list to avoid unnecessary recalculations
    const animeList = useMemo(() => {
        const list = isSearch ? searchResults : airingAnime;
        return list?.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            </Link>
        ));
    }, [isSearch, airingAnime, searchResults]);

    return (
        <AiringStyled>
            {loading ? (
                <div className="loading">Loading airing anime...</div>
            ) : (
                <div className="airing-anime">
                    {animeList}
                </div>
            )}
            <Sidebar />
        </AiringStyled>
    );
}

const AiringStyled = styled.div`
    display: flex;

    .loading {
        margin-top: 2rem;
        padding: 2rem;
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
        color: #27AE60;
    }

    .airing-anime {
        margin-top: 2rem;
        padding: 2rem 0 2rem 5rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;

        a {
            height: 500px;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
            overflow: hidden;
            display: block;
        }

        a img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
`;

export default Airing;
