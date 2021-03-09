import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieList from './components/movieLists/MovieList'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);


  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
        setMovieList(list);

        //pegando o featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random () * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      console.log(chosenInfo)
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, [])

  return(
    <div className="page">

      { featuredData && <FeaturedMovie item={featuredData}/>}




         <section className="lists">
        {movieList.map((item, key) =>(
          <MovieList key={key} title={item.title} item={item.items}></MovieList>
        ))
        }
      </section>
    </div>
  )
}