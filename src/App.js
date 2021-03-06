import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieList from './components/movieLists/MovieList'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [blackHeader, setblackHeader]= useState(true);

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

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setblackHeader(true);
        }else{
          setblackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  

  return(
    <div className="page">

      <Header black={blackHeader}/>
      { featuredData && <FeaturedMovie item={featuredData}/>}




         <section className="lists">
        {movieList.map((item, key) =>(
          <MovieList key={key} title={item.title} item={item.items}></MovieList>
        ))
        }
      </section>
      <Footer/>
      
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
      </div>
    }

        

    </div>

    
  )
}