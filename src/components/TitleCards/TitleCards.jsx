import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

import { Link } from 'react-router-dom'




const TitleCards = ({ title, category }) => {
    const [apiDate, setApiDate] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODkxNmUxYjdkOWIwYjA3YjA5OTA3MTJiZTYyMDhmNCIsIm5iZiI6MTc1MDQ3MjYxMy42MDgsInN1YiI6IjY4NTYxN2E1MGZmZDQ4Y2JkNDRiY2E5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GxYVKDuTwAZGJTxL5Ih0nGEmb4VGxhqLj2sOxS-DFjc'
        }
    };

    const handlewheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }


    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiDate(res.results))
            .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel', handlewheel);
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>

            <div className="card-list" ref={cardsRef}>
                {apiDate.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards