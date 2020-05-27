import React, {useState} from "react"
import {Link} from "react-router-dom"

export default function Movie(props){

    const poster = `https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`,
        [isBig, setIsBig] = useState(false)
    // style = {width: '600px', border: "solid"}
    
    return(
        <div className="col" onMouseEnter={()=>setIsBig(true)} onMouseLeave={()=> setIsBig(false)} style={{backgroundImage: `url(${poster})`}}>
            {/* {isBig ? 
            <img src={poster} width="220" alt={props.movie.title} onClick={() => props.action(props.movie)}/>: 
            <img src={poster} alt={props.movie.title} onClick={() => props.action(props.movie)}/>} */}
            {/* <div style={{width: "200px", height:"300px"}} onClick={() => props.action(props.movie)}></div> */}
            {/* {props.movie.title} */}
            {!isBig ?
            <Link to={`/movies/${props.movie.id}`}><div style={{width: "200px", height:"300px"}}></div></Link>:
            
                <div><Link to={`/movies/${props.movie.id}`}>
                <div style={{width: "200px", height:"275px"}}>
                   
                </div></Link>
                <div style={{marginTop: -5}}>
                <button onClick={() => props.handleFavorite(props.movie)}>
                {props.favs.find(movie => movie.id === props.movie.id) ? 
                <div>Remove Fav</div>:
                <div>Add Fav</div>
                }
                </button>
                </div>
                </div>
            }
            {/* <br/>
            {props.title === "profile" ? 
            <button onClick={() => props.removeFavorite(props.movie)} >remove</button> :
            null
            } */}
        </div>
    )
}