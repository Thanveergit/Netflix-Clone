import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {

  const [apiData,setApiData] = useState([])
  const cardsRef = useRef()

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzU4YTJjYmI4ZjBkZTk2YjBiMzAxZjY4ZDQ2NGJlNiIsIm5iZiI6MTc0NzY0MTkxOS4wOTc5OTk4LCJzdWIiOiI2ODJhZTYzZjg5YWJkMTEyNDE5ZTM3ZjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yq7tCgSJKwK7NicfK4uV5HG-Gr0U_0LF0q5KlOLDgNk'
  }
};

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  const cardsEl = cardsRef.current
  cardsEl?.addEventListener('wheel',handleWheel)

  return ()=>{
    cardsEl.removeEventListener('wheel',handleWheel)
  }
    // cardsRef.current.addEventListener('wheel',handleWheel)
  },[category])
  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards