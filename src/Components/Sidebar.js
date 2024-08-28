import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Sidebar() {
    const { popularAnime } = useGlobalContext();

    // Sort and memoize the sorted anime list to optimize performance
    const sortedAnime = useMemo(() => {
        return popularAnime?.sort((a, b) => b.score - a.score);
    }, [popularAnime]);

    return (
        <SidebarStyled>
            <h3>Top 5 Popular</h3>
            <div className="anime">
                {sortedAnime?.slice(0, 5).map((anime) => (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                        <h5>{anime.title}</h5>
                    </Link>
                )) || <p>No popular anime available.</p>}
            </div>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.div`
    margin-top: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    padding: 2rem 5rem 2rem 2rem;

    h3 {
        margin-bottom: 1rem;
        color: #333;
    }

    .anime {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 150px;

        img {
            width: 100%;
            border-radius: 5px;
            border: 5px solid #e5e7eb;
            object-fit: cover;
        }

        a {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color: #27AE60;
            text-decoration: none;

            h5 {
                font-size: 1rem;
                font-weight: 600;
                color: #333;
            }

            &:hover h5 {
                color: #27AE60;
            }
        }
    }

    // Responsive design for smaller screens
    @media screen and (max-width: 768px) {
        padding-right: 2rem;
        width: 100%;

        .anime {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
        }
    }
`;

export default Sidebar;
