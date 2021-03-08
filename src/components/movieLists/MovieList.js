import { React } from 'react';
import './MovieList.css'

const MovieList = ({ title, item }) => {
    return (
        <div className="movieRow"> 
            <h1> {title} </h1>
            <div className="movieRow--listarea">
                <div className="movieRow--list">
                {item.results.length > 0 && item.results.map((item, key) =>
                <div key={key} className="movieRow--item"> 
                    <img alt="fdc" src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                    </div>
                )}
                </div>
             
            </div>
        </div>
    );
}

export default MovieList;