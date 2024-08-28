import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function Upcoming({ rendered }) {
    const { upcomingAnime, isSearch, searchResults, getUpcomingAnime } = useGlobalContext();

    // Fetch upcoming anime data when the component mounts
    useEffect(() => {
        if (rendered === 'upcoming') {
            getUpcomingAnime();
        }
    }, [rendered, getUpcomingAnime]);

    // Memoize the list to prevent unnecessary re-renders
    const animeList = useMemo(() => {
        const list = isSearch ? searchResults : upcomingAnime;
        return list?.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            </Link>
        ));
    }, [isSearch, upcomingAnime, searchResults]);

    return (
        <UpcomingStyled>
            <div className="upcoming-anime">
                {animeList}
            </div>
            <Sidebar />
        </UpcomingStyled>
    );
}

const UpcomingStyled = styled.div`
    display: flex;
    .upcoming-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 0;
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

export default Upcoming;
